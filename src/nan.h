#pragma once
// Node-API stand-in for the NAN surface used by node-occ.
// The addon must not include v8.h or nan: pointer compression (node-caged)
// only stays ABI-safe through Node-API.

#include <napi.h>
#include <uv.h>

#include <cstdint>
#include <cstring>
#include <list>
#include <memory>
#include <string>
#include <type_traits>
#include <utility>
#include <vector>

#ifndef V8_MAJOR_VERSION
#define V8_MAJOR_VERSION 11
#endif

namespace node_occ_napi {

inline napi_env& EnvSlot() {
  static thread_local napi_env env = nullptr;
  return env;
}

inline Napi::Env CurrentEnv() {
  return Napi::Env(EnvSlot());
}

inline void SetCurrentEnv(Napi::Env env) {
  EnvSlot() = static_cast<napi_env>(env);
}

inline void SetCurrentEnv(napi_env env) {
  EnvSlot() = env;
}

template <typename T>
inline T napi_as(const Napi::Value& value) {
  return value.As<T>();
}

}  // namespace node_occ_napi

namespace v8 {

template <typename T>
class Local;

class Value {};
class Object : public Value {};
class Array : public Object {
 public:
  static Local<Array> New(int length);
};
class Function : public Object {};
class String : public Value {
 public:
  class Utf8Value {
   public:
    template <typename T>
    explicit Utf8Value(const Local<T>& value);
    const char* operator*() const { return storage_.empty() ? nullptr : storage_.c_str(); }

   private:
    std::string storage_;
  };
};
class Boolean : public Value {};
class Number : public Value {};
class Integer : public Number {};
class Float32Array : public Object {};
class Int32Array : public Object {};
class Uint32Array : public Object {};
class Uint16Array : public Object {};
class Uint8Array : public Object {};

enum PropertyAttribute {
  None = 0,
  ReadOnly = 1 << 0,
  DontEnum = 1 << 1,
  DontDelete = 1 << 2
};

static const PropertyAttribute DEFAULT = None;

class JsHandle {
 public:
  JsHandle() = default;
  explicit JsHandle(const Napi::Value& value) : value_(value) {}

  Napi::Value napi() const { return value_; }
  bool IsEmpty() const { return value_.IsEmpty(); }
  bool IsObject() const { return !value_.IsEmpty() && value_.IsObject(); }
  bool IsArray() const { return !value_.IsEmpty() && value_.IsArray(); }
  bool IsString() const { return !value_.IsEmpty() && value_.IsString(); }
  bool IsNumber() const { return !value_.IsEmpty() && value_.IsNumber(); }
  bool IsBoolean() const { return !value_.IsEmpty() && value_.IsBoolean(); }
  bool IsFunction() const { return !value_.IsEmpty() && value_.IsFunction(); }
  bool IsNull() const { return !value_.IsEmpty() && value_.IsNull(); }
  bool IsUndefined() const { return !value_.IsEmpty() && value_.IsUndefined(); }
  bool IsFloat32Array() const { return IsTyped(napi_float32_array); }
  bool IsInt32Array() const { return IsTyped(napi_int32_array); }
  bool IsUint32Array() const { return IsTyped(napi_uint32_array); }
  bool IsUint16Array() const { return IsTyped(napi_uint16_array); }
  bool IsUint8Array() const { return IsTyped(napi_uint8_array); }

  uint32_t Length() const {
    if (value_.IsEmpty()) return 0;
    if (value_.IsTypedArray()) {
      return static_cast<uint32_t>(value_.As<Napi::TypedArray>().ElementLength());
    }
    if (value_.IsArray()) return value_.As<Napi::Array>().Length();
    return 0;
  }

  size_t ByteOffset() const {
    if (value_.IsEmpty() || !value_.IsTypedArray()) return 0;
    return value_.As<Napi::TypedArray>().ByteOffset();
  }

  int InternalFieldCount() const;

  struct BackingStore {
    void* data;
    void* Data() const { return data; }
  };
  struct ArrayBufferProxy {
    BackingStore store;
    BackingStore* GetBackingStore() { return &store; }
    struct Contents {
      void* data;
      void* Data() const { return data; }
    };
    Contents GetContents() { return Contents{store.data}; }
    ArrayBufferProxy* operator->() { return this; }
  };

  ArrayBufferProxy Buffer() const {
    ArrayBufferProxy proxy;
    proxy.store.data = nullptr;
    if (!value_.IsEmpty() && value_.IsTypedArray()) {
      proxy.store.data = value_.As<Napi::TypedArray>().ArrayBuffer().Data();
    }
    return proxy;
  }

  template <typename ContextT, typename ArgT>
  Local<Object> NewInstance(ContextT, int argc, ArgT* argv) const;

 private:
  Napi::Value value_;
  bool IsTyped(napi_typedarray_type type) const {
    if (value_.IsEmpty() || !value_.IsTypedArray()) return false;
    return value_.As<Napi::TypedArray>().TypedArrayType() == type;
  }
};

template <typename T>
class Local : public JsHandle {
 public:
  Local() = default;
  explicit Local(const Napi::Value& value) : JsHandle(value) {}
  Local(const Local& other) : JsHandle(other) {}
  template <typename U,
            typename std::enable_if<!std::is_same<U, T>::value &&
                                        std::is_base_of<JsHandle, Local<U>>::value,
                                    int>::type = 0>
  Local(const Local<U>& other) : JsHandle(other) {}

  Local& operator=(const Local& other) {
    static_cast<JsHandle&>(*this) = other;
    return *this;
  }

  template <typename U>
  Local<U> As() const {
    return Local<U>(napi());
  }

  static Local<T> Cast(const JsHandle& value) { return Local<T>(value.napi()); }

  Local* operator->() { return this; }
  const Local* operator->() const { return this; }
  Local ToLocalChecked() const { return *this; }
};

}  // namespace v8

namespace Nan {

template <typename T>
class FunctionCallbackInfo;

using Method = void (*)(const FunctionCallbackInfo<v8::Value>&);
using Getter = void (*)(v8::Local<v8::String> property, const FunctionCallbackInfo<v8::Value>&);

struct JavaScriptException : std::exception {
  const char* what() const noexcept override { return "JavaScript exception"; }
};

struct MethodBox {
  Method fn;
};
struct GetterBox {
  Getter fn;
};

struct FtData {
  Method constructor = nullptr;
  std::string className;
  struct Prop {
    std::string name;
    Method method = nullptr;
    Getter getter = nullptr;
    bool accessor = false;
    bool isStatic = false;
  };
  std::vector<Prop> props;
  std::list<MethodBox> methods;
  std::list<GetterBox> getters;
  Napi::FunctionReference ctor;
  bool defined = false;
  int internalFieldCount = 0;

  void AddMethod(const std::string& name, Method method) {
    for (Prop& prop : props) {
      if (prop.name == name) {
        prop.method = method;
        prop.getter = nullptr;
        prop.accessor = false;
        return;
      }
    }
    Prop prop;
    prop.name = name;
    prop.method = method;
    props.push_back(prop);
  }

  void AddAccessor(const std::string& name, Getter getter) {
    for (Prop& prop : props) {
      if (prop.name == name) {
        prop.getter = getter;
        prop.method = nullptr;
        prop.accessor = true;
        return;
      }
    }
    Prop prop;
    prop.name = name;
    prop.getter = getter;
    prop.accessor = true;
    props.push_back(prop);
  }

  void AddStatic(const std::string& name, Method method) {
    Prop prop;
    prop.name = name;
    prop.method = method;
    prop.isStatic = true;
    props.push_back(prop);
  }
};

}  // namespace Nan

namespace v8 {

class ObjectTemplate {
 public:
  ObjectTemplate() = default;
  explicit ObjectTemplate(const std::shared_ptr<Nan::FtData>& data) : data_(data) {}
  bool IsEmpty() const { return !data_; }
  void SetInternalFieldCount(int count) const {
    if (data_) data_->internalFieldCount = count;
  }
  void AddMethod(const char* name, Nan::Method method) const {
    if (data_) data_->AddMethod(name, method);
  }
  void AddAccessor(const std::string& name, Nan::Getter getter) const {
    if (data_) data_->AddAccessor(name, getter);
  }
  std::shared_ptr<Nan::FtData> data() const { return data_; }

 private:
  std::shared_ptr<Nan::FtData> data_;
};

template <>
class Local<ObjectTemplate> : public ObjectTemplate {
 public:
  Local() = default;
  explicit Local(const std::shared_ptr<Nan::FtData>& data) : ObjectTemplate(data) {}
  Local* operator->() { return this; }
  const Local* operator->() const { return this; }
  bool IsEmpty() const { return ObjectTemplate::IsEmpty(); }
};

class FunctionTemplate {
 public:
  FunctionTemplate() = default;
  explicit FunctionTemplate(const std::shared_ptr<Nan::FtData>& data) : data_(data) {}
  bool IsEmpty() const { return !data_; }
  void SetClassName(const Local<String>& name);
  Local<ObjectTemplate> InstanceTemplate() const { return Local<ObjectTemplate>(data_); }
  Local<ObjectTemplate> PrototypeTemplate() const { return Local<ObjectTemplate>(data_); }
  bool HasInstance(const Local<Value>& value) const;
  Local<Function> GetFunction() const;
  void AddStaticMethod(const char* name, Nan::Method method) const {
    if (data_ && name != nullptr) data_->AddStatic(name, method);
  }
  Nan::Method method() const { return data_ ? data_->constructor : nullptr; }
  std::shared_ptr<Nan::FtData> data() const { return data_; }

 private:
  std::shared_ptr<Nan::FtData> data_;
};

template <>
class Local<FunctionTemplate> : public FunctionTemplate {
 public:
  Local() = default;
  explicit Local(const std::shared_ptr<Nan::FtData>& data) : FunctionTemplate(data) {}
  Local* operator->() { return this; }
  const Local* operator->() const { return this; }
  bool IsEmpty() const { return FunctionTemplate::IsEmpty(); }
};

template <typename T>
class MaybeLocal {
 public:
  MaybeLocal() = default;
  MaybeLocal(const Local<T>& value) : empty_(value.IsEmpty()), value_(value) {}
  template <typename U,
            typename std::enable_if<!std::is_same<U, T>::value &&
                                        std::is_base_of<JsHandle, Local<U>>::value,
                                    int>::type = 0>
  MaybeLocal(const Local<U>& value) : empty_(value.IsEmpty()), value_(Local<T>(value)) {}
  bool IsEmpty() const { return empty_ || value_.IsEmpty(); }
  Local<T> ToLocalChecked() const { return value_; }

 private:
  bool empty_ = true;
  Local<T> value_{};
};

}  // namespace v8

namespace Nan {

template <typename T>
using MaybeLocal = v8::MaybeLocal<T>;

template <typename T>
class Maybe {
 public:
  Maybe() = default;
  explicit Maybe(T value) : ok_(true), value_(value) {}
  T FromJust() const { return value_; }
  T ToChecked() const { return value_; }
  T FromMaybe(T fallback) const { return ok_ ? value_ : fallback; }

 private:
  bool ok_ = false;
  T value_{};
};

template <typename T>
class FunctionCallbackInfo {
 public:
  explicit FunctionCallbackInfo(const Napi::CallbackInfo& info) : info_(&info) {}

  Napi::Env Env() const { return info_->Env(); }
  bool IsConstructCall() const { return info_->IsConstructCall(); }
  int Length() const { return static_cast<int>(info_->Length()); }

  v8::Local<v8::Value> operator[](int index) const {
    if (index < 0 || static_cast<size_t>(index) >= info_->Length()) {
      return v8::Local<v8::Value>(Env().Undefined());
    }
    return v8::Local<v8::Value>((*info_)[static_cast<size_t>(index)]);
  }

  v8::Local<v8::Object> This() const {
    Napi::Value self = info_->This();
    if (self.IsEmpty() || !self.IsObject()) return v8::Local<v8::Object>();
    return v8::Local<v8::Object>(self);
  }

  struct ReturnSetter {
    const FunctionCallbackInfo* self;
    template <typename V>
    auto Set(const V& value) const -> decltype(value.napi(), void()) {
      self->hasReturn_ = true;
      self->return_ = value.IsEmpty() ? self->Env().Undefined() : value.napi();
    }
    void Set(bool value) const {
      self->hasReturn_ = true;
      self->return_ = Napi::Boolean::New(self->Env(), value);
    }
    void SetUndefined() const {
      self->hasReturn_ = true;
      self->return_ = self->Env().Undefined();
    }
  };

  ReturnSetter GetReturnValue() const { return ReturnSetter{this}; }
  bool HasReturn() const { return hasReturn_; }
  napi_value RawReturn() const { return static_cast<napi_value>(return_); }

 private:
  const Napi::CallbackInfo* info_;
  mutable Napi::Value return_;
  mutable bool hasReturn_ = false;
};

inline MethodBox* BoxFor(Method method) {
  static std::list<MethodBox> boxes;
  for (MethodBox& box : boxes) {
    if (box.fn == method) return &box;
  }
  boxes.push_back(MethodBox{method});
  return &boxes.back();
}

inline GetterBox* BoxFor(Getter getter) {
  static std::list<GetterBox> boxes;
  for (GetterBox& box : boxes) {
    if (box.fn == getter) return &box;
  }
  boxes.push_back(GetterBox{getter});
  return &boxes.back();
}

inline napi_value InvokeMethod(napi_env env, napi_callback_info info) {
  void* data = nullptr;
  napi_get_cb_info(env, info, nullptr, nullptr, nullptr, &data);
  node_occ_napi::SetCurrentEnv(env);
  Napi::CallbackInfo callback(env, info);
  FunctionCallbackInfo<v8::Value> wrapped(callback);
  auto* box = static_cast<MethodBox*>(data);
  if (box != nullptr && box->fn != nullptr) {
    try {
      box->fn(wrapped);
    } catch (const JavaScriptException&) {
    } catch (const Napi::Error&) {
    } catch (const std::exception& ex) {
      if (!Napi::Env(env).IsExceptionPending()) {
        Napi::Error::New(env, ex.what()).ThrowAsJavaScriptException();
      }
    } catch (...) {
      if (!Napi::Env(env).IsExceptionPending()) {
        Napi::Error::New(env, "native exception").ThrowAsJavaScriptException();
      }
    }
  }
  if (Napi::Env(env).IsExceptionPending()) return Napi::Env(env).Undefined();
  if (wrapped.HasReturn()) return wrapped.RawReturn();
  return Napi::Env(env).Undefined();
}

inline napi_value InvokeConstructor(napi_env env, napi_callback_info info) {
  void* data = nullptr;
  napi_get_cb_info(env, info, nullptr, nullptr, nullptr, &data);
  auto* ft = static_cast<FtData*>(data);
  MethodBox box{ft == nullptr ? nullptr : ft->constructor};
  // Reuse the method trampoline by temporarily passing a stable box.
  MethodBox* stored = BoxFor(box.fn);
  napi_callback_info ignored = info;
  (void)ignored;
  node_occ_napi::SetCurrentEnv(env);
  Napi::CallbackInfo callback(env, info);
  FunctionCallbackInfo<v8::Value> wrapped(callback);
  if (stored->fn != nullptr) {
    try {
      stored->fn(wrapped);
    } catch (const JavaScriptException&) {
    } catch (const Napi::Error&) {
    } catch (const std::exception& ex) {
      if (!Napi::Env(env).IsExceptionPending()) {
        Napi::Error::New(env, ex.what()).ThrowAsJavaScriptException();
      }
    } catch (...) {
      if (!Napi::Env(env).IsExceptionPending()) {
        Napi::Error::New(env, "native exception").ThrowAsJavaScriptException();
      }
    }
  }
  if (Napi::Env(env).IsExceptionPending()) return Napi::Env(env).Undefined();
  if (wrapped.HasReturn()) return wrapped.RawReturn();
  return callback.This();
}

inline napi_value InvokeGetter(napi_env env, napi_callback_info info) {
  void* data = nullptr;
  napi_get_cb_info(env, info, nullptr, nullptr, nullptr, &data);
  node_occ_napi::SetCurrentEnv(env);
  Napi::CallbackInfo callback(env, info);
  FunctionCallbackInfo<v8::Value> wrapped(callback);
  auto* box = static_cast<GetterBox*>(data);
  v8::Local<v8::String> property;
  if (box != nullptr && box->fn != nullptr) {
    try {
      box->fn(property, wrapped);
    } catch (const JavaScriptException&) {
    } catch (const Napi::Error&) {
    } catch (...) {
      if (!Napi::Env(env).IsExceptionPending()) {
        Napi::Error::New(env, "native getter exception").ThrowAsJavaScriptException();
      }
    }
  }
  if (Napi::Env(env).IsExceptionPending()) return Napi::Env(env).Undefined();
  if (wrapped.HasReturn()) return wrapped.RawReturn();
  return Napi::Env(env).Undefined();
}

inline napi_property_attributes MapAttributes(int v8Attributes, bool accessor) {
  const bool readOnly = (v8Attributes & v8::ReadOnly) != 0 || accessor;
  const bool dontEnum = (v8Attributes & v8::DontEnum) != 0;
  const bool dontDelete = (v8Attributes & v8::DontDelete) != 0;
  int attributes = 0;
  if (!readOnly) attributes |= napi_writable;
  if (!dontEnum) attributes |= napi_enumerable;
  if (!dontDelete) attributes |= napi_configurable;
  if (accessor && (v8Attributes & v8::DontEnum) == 0) attributes |= napi_enumerable;
  return static_cast<napi_property_attributes>(attributes);
}

inline void DefineClass(FtData* data) {
  if (data == nullptr || data->defined) return;
  Napi::Env env = node_occ_napi::CurrentEnv();
  std::vector<napi_property_descriptor> descriptors;
  descriptors.reserve(data->props.size());
  for (FtData::Prop& prop : data->props) {
    napi_property_descriptor descriptor{};
    descriptor.utf8name = prop.name.c_str();
    if (prop.accessor) {
      data->getters.push_back(GetterBox{prop.getter});
      descriptor.getter = InvokeGetter;
      descriptor.data = &data->getters.back();
      descriptor.attributes = static_cast<napi_property_attributes>(napi_enumerable);
    } else {
      data->methods.push_back(MethodBox{prop.method});
      descriptor.method = InvokeMethod;
      descriptor.data = &data->methods.back();
      int attributes = napi_enumerable | napi_writable | napi_configurable;
      if (prop.isStatic) attributes |= napi_static;
      descriptor.attributes = static_cast<napi_property_attributes>(attributes);
    }
    descriptors.push_back(descriptor);
  }
  napi_value result = nullptr;
  const std::string& name = data->className.empty() ? std::string("Object") : data->className;
  napi_status status = napi_define_class(
      env,
      name.c_str(),
      NAPI_AUTO_LENGTH,
      InvokeConstructor,
      data,
      descriptors.size(),
      descriptors.empty() ? nullptr : descriptors.data(),
      &result);
  if (status != napi_ok || result == nullptr) return;
  data->ctor = Napi::Persistent(Napi::Function(env, result));
  data->ctor.SuppressDestruct();
  data->defined = true;
}

class ObjectWrap {
 public:
  ObjectWrap() = default;
  virtual ~ObjectWrap() {
    if (ref_ != nullptr && env_ != nullptr) {
      napi_delete_reference(env_, ref_);
      ref_ = nullptr;
    }
  }

  void Wrap(const v8::Local<v8::Object>& object);
  v8::Local<v8::Object> handle() const;

  template <typename T>
  static T* Unwrap(const v8::Local<v8::Object>& object) {
    if (object.IsEmpty() || !object.napi().IsObject()) return nullptr;
    void* ptr = nullptr;
    napi_status status = napi_unwrap(object.napi().Env(), object.napi(), &ptr);
    if (status != napi_ok || ptr == nullptr) return nullptr;
    return static_cast<T*>(ptr);
  }

 private:
  static void Finalize(napi_env env, void* data, void* hint);
  napi_env env_ = nullptr;
  napi_ref ref_ = nullptr;
};

class HandleScope {
 public:
  HandleScope() : scope_(node_occ_napi::CurrentEnv()) {}

 private:
  Napi::HandleScope scope_;
};

class EscapableHandleScope {
 public:
  EscapableHandleScope() : scope_(node_occ_napi::CurrentEnv()) {}
  template <typename T>
  v8::Local<T> Escape(const v8::Local<T>& value) {
    Napi::Value escaped = scope_.Escape(static_cast<napi_value>(value.napi()));
    return v8::Local<T>(escaped);
  }

 private:
  Napi::EscapableHandleScope scope_;
};

struct AsyncResource {};

class Callback {
 public:
  explicit Callback(const v8::Local<v8::Function>& fn) {
    if (!fn.IsEmpty() && fn->IsFunction()) {
      fn_ = Napi::Persistent(fn.napi().As<Napi::Function>());
    }
  }
  ~Callback() {
    if (!fn_.IsEmpty()) fn_.Reset();
  }
  bool IsEmpty() const { return fn_.IsEmpty(); }
  void Call(int argc, v8::Local<v8::Value> argv[], AsyncResource*) {
    if (fn_.IsEmpty()) return;
    node_occ_napi::SetCurrentEnv(fn_.Env());
    std::vector<napi_value> args;
    args.reserve(static_cast<size_t>(argc));
    for (int i = 0; i < argc; i++) args.push_back(argv[i].napi());
    fn_.Call(args);
  }

 private:
  Napi::FunctionReference fn_;
};

class AsyncWorker {
 public:
  uv_work_t request{};
  Callback* callback;
  AsyncResource* async_resource;
  explicit AsyncWorker(Callback* cb)
      : callback(cb), async_resource(&resource_), env_(node_occ_napi::EnvSlot()) {
    request.data = this;
  }
  virtual ~AsyncWorker() { delete callback; }
  virtual void Execute() = 0;
  void PrepareMainThread() { node_occ_napi::SetCurrentEnv(env_); }
  virtual void WorkComplete() {
    PrepareMainThread();
    HandleScope scope;
    if (error_.empty()) HandleOKCallback();
    else HandleErrorCallback();
  }
  virtual void Destroy() { delete this; }
  virtual void HandleOKCallback() {
    if (callback == nullptr) return;
    callback->Call(0, nullptr, async_resource);
  }
  virtual void HandleErrorCallback() {
    if (callback == nullptr) return;
    v8::Local<v8::Value> argv[1] = {
        v8::Local<v8::Value>(Napi::Error::New(node_occ_napi::CurrentEnv(), error_).Value())};
    callback->Call(1, argv, async_resource);
  }
  void SetErrorMessage(const char* message) { error_ = message == nullptr ? "" : message; }
  const char* ErrorMessage() const { return error_.empty() ? nullptr : error_.c_str(); }

 private:
  AsyncResource resource_;
  napi_env env_ = nullptr;
  std::string error_;
};

inline void AsyncQueueWorker(AsyncWorker* worker) {
  uv_queue_work(
      uv_default_loop(),
      &worker->request,
      [](uv_work_t* req) {
        auto* self = static_cast<AsyncWorker*>(req->data);
        try {
          self->Execute();
        } catch (const std::exception& ex) {
          self->SetErrorMessage(ex.what());
        } catch (...) {
          self->SetErrorMessage("native exception");
        }
      },
      [](uv_work_t* req, int) {
        auto* self = static_cast<AsyncWorker*>(req->data);
        self->WorkComplete();
        self->Destroy();
      });
}

inline uv_loop_t* GetCurrentEventLoop() { return uv_default_loop(); }

struct Context {
  v8::Local<v8::Object> Global() const {
    napi_env env = node_occ_napi::EnvSlot();
    napi_value global = nullptr;
    napi_get_global(env, &global);
    if (global == nullptr) return v8::Local<v8::Object>();
    return v8::Local<v8::Object>(Napi::Value(env, global));
  }
};
inline Context* GetCurrentContext() {
  static Context context;
  return &context;
}

inline Maybe<bool> Equals(const v8::Local<v8::Value>& left, const v8::Local<v8::Value>& right) {
  if (left.IsEmpty() || right.IsEmpty()) return Maybe<bool>(false);
  bool same = false;
  napi_strict_equals(left.napi().Env(), left.napi(), right.napi(), &same);
  return Maybe<bool>(same);
}

inline void ThrowError(const char* message) {
  Napi::Env env = node_occ_napi::CurrentEnv();
  if (!env.IsExceptionPending()) {
    Napi::Error::New(env, message == nullptr ? "" : message).ThrowAsJavaScriptException();
  }
  throw JavaScriptException();
}

inline void ThrowError(const std::string& message) { ThrowError(message.c_str()); }

inline v8::Local<v8::Value> Undefined() {
  return v8::Local<v8::Value>(node_occ_napi::CurrentEnv().Undefined());
}
inline v8::Local<v8::Value> Null() {
  return v8::Local<v8::Value>(node_occ_napi::CurrentEnv().Null());
}

inline void IdleNotification(int) {}

template <typename T>
struct JsNew;

template <>
struct JsNew<v8::FunctionTemplate> {
  static v8::Local<v8::FunctionTemplate> make(Method method) {
    auto data = std::make_shared<FtData>();
    data->constructor = method;
    return v8::Local<v8::FunctionTemplate>(data);
  }
};
template <>
struct JsNew<v8::Object> {
  static v8::Local<v8::Object> make() {
    return v8::Local<v8::Object>(Napi::Object::New(node_occ_napi::CurrentEnv()));
  }
};
template <>
struct JsNew<v8::Array> {
  static v8::Local<v8::Array> make(int length) {
    return v8::Local<v8::Array>(
        Napi::Array::New(node_occ_napi::CurrentEnv(), static_cast<uint32_t>(length < 0 ? 0 : length)));
  }
};
template <>
struct JsNew<v8::Boolean> {
  static v8::Local<v8::Boolean> make(bool value) {
    return v8::Local<v8::Boolean>(Napi::Boolean::New(node_occ_napi::CurrentEnv(), value));
  }
};
template <>
struct JsNew<v8::Integer> {
  template <typename N>
  static v8::Local<v8::Integer> make(N value) {
    return v8::Local<v8::Integer>(
        Napi::Number::New(node_occ_napi::CurrentEnv(), static_cast<double>(value)));
  }
};
template <>
struct JsNew<v8::Number> {
  static v8::Local<v8::Number> make(double value) {
    return v8::Local<v8::Number>(Napi::Number::New(node_occ_napi::CurrentEnv(), value));
  }
};
template <>
struct JsNew<v8::String> {
  static v8::MaybeLocal<v8::String> make(const char* value) {
    return v8::MaybeLocal<v8::String>(v8::Local<v8::String>(
        Napi::String::New(node_occ_napi::CurrentEnv(), value == nullptr ? "" : value)));
  }
  static v8::MaybeLocal<v8::String> make(const std::string& value) { return make(value.c_str()); }
};

template <typename T, typename... Args>
auto New(Args&&... args) -> decltype(JsNew<T>::make(std::forward<Args>(args)...)) {
  return JsNew<T>::make(std::forward<Args>(args)...);
}

inline v8::MaybeLocal<v8::String> New(const char* value) { return JsNew<v8::String>::make(value); }
inline v8::MaybeLocal<v8::String> New(const std::string& value) { return JsNew<v8::String>::make(value); }
inline v8::Local<v8::Number> New(int value) { return JsNew<v8::Number>::make(static_cast<double>(value)); }
inline v8::Local<v8::Number> New(unsigned int value) {
  return JsNew<v8::Number>::make(static_cast<double>(value));
}
inline v8::Local<v8::Number> New(unsigned long value) {
  return JsNew<v8::Number>::make(static_cast<double>(value));
}
inline v8::Local<v8::Number> New(long value) { return JsNew<v8::Number>::make(static_cast<double>(value)); }
inline v8::Local<v8::Number> New(double value) { return JsNew<v8::Number>::make(value); }

template <typename T>
class Persistent;

template <>
class Persistent<v8::FunctionTemplate> {
 public:
  void Reset() { data_.reset(); }
  void Reset(const v8::Local<v8::FunctionTemplate>& value) { data_ = value.data(); }
  bool IsEmpty() const { return !data_; }
  v8::Local<v8::FunctionTemplate> Get() const { return v8::Local<v8::FunctionTemplate>(data_); }

 private:
  std::shared_ptr<FtData> data_;
};

template <>
class Persistent<v8::Object> {
 public:
  void Reset() {
    if (set_) {
      ref_.Reset();
      set_ = false;
    }
  }
  void Reset(const v8::Local<v8::Object>& value) {
    Reset();
    if (!value.IsEmpty()) {
      ref_ = Napi::Persistent(value.napi().As<Napi::Object>());
      set_ = true;
    }
  }
  bool IsEmpty() const { return !set_; }
  v8::Local<v8::Object> Get() const {
    if (!set_) return v8::Local<v8::Object>();
    return v8::Local<v8::Object>(ref_.Value());
  }

 private:
  Napi::ObjectReference ref_;
  bool set_ = false;
};

inline v8::Local<v8::FunctionTemplate> New(const Persistent<v8::FunctionTemplate>& value) {
  return value.Get();
}
inline v8::Local<v8::Object> New(const Persistent<v8::Object>& value) { return value.Get(); }

template <typename T>
struct ToResult;

template <>
struct ToResult<double> {
  using Result = Maybe<double>;
  template <typename V>
  static Result convert(const v8::Local<V>& value) {
    if (value.IsEmpty() || !value->IsNumber()) return Result();
    return Result(node_occ_napi::napi_as<Napi::Number>(value.napi()).DoubleValue());
  }
};
template <>
struct ToResult<int> {
  using Result = Maybe<int>;
  template <typename V>
  static Result convert(const v8::Local<V>& value) {
    if (value.IsEmpty() || !value->IsNumber()) return Result();
    return Result(static_cast<int>(
        node_occ_napi::napi_as<Napi::Number>(value.napi()).Int32Value()));
  }
};
template <>
struct ToResult<v8::Object> {
  using Result = v8::MaybeLocal<v8::Object>;
  template <typename V>
  static Result convert(const v8::Local<V>& value) {
    if (value.IsEmpty() || !value->IsObject()) return Result();
    return Result(v8::Local<v8::Object>(value.napi()));
  }
};
template <>
struct ToResult<v8::Function> {
  using Result = v8::MaybeLocal<v8::Function>;
  template <typename V>
  static Result convert(const v8::Local<V>& value) {
    if (value.IsEmpty() || !value->IsFunction()) return Result();
    return Result(v8::Local<v8::Function>(value.napi()));
  }
};
template <>
struct ToResult<v8::String> {
  using Result = v8::MaybeLocal<v8::String>;
  template <typename V>
  static Result convert(const v8::Local<V>& value) {
    if (value.IsEmpty() || !value->IsString()) return Result();
    return Result(v8::Local<v8::String>(value.napi()));
  }
};

template <typename T, typename V>
typename ToResult<T>::Result To(const v8::Local<V>& value) {
  return ToResult<T>::convert(value);
}

class Utf8String {
 public:
  template <typename T>
  explicit Utf8String(const v8::Local<T>& value) {
    if (!value.IsEmpty() && value->IsString()) {
      storage_ = node_occ_napi::napi_as<Napi::String>(value.napi()).Utf8Value();
    }
  }
  const char* operator*() const { return storage_.c_str(); }

 private:
  std::string storage_;
};

template <typename Obj, typename Index, typename Val,
          typename std::enable_if<std::is_integral<Index>::value && !std::is_same<Index, bool>::value, int>::type = 0>
inline void Set(const v8::Local<Obj>& object, Index index, const v8::Local<Val>& value) {
  if (object.IsEmpty()) return;
  node_occ_napi::napi_as<Napi::Object>(object.napi()).Set(static_cast<uint32_t>(index), value.napi());
}

template <typename Obj, typename Key, typename Val>
inline void Set(const v8::Local<Obj>& object, const v8::Local<Key>& key, const v8::Local<Val>& value) {
  if (object.IsEmpty() || key.IsEmpty()) return;
  Napi::Object target = node_occ_napi::napi_as<Napi::Object>(object.napi());
  if (key->IsNumber()) {
    target.Set(node_occ_napi::napi_as<Napi::Number>(key.napi()).Uint32Value(), value.napi());
    return;
  }
  target.Set(key.napi().ToString().Utf8Value(), value.napi());
}

template <typename Obj, typename Index,
          typename std::enable_if<std::is_integral<Index>::value && !std::is_same<Index, bool>::value, int>::type = 0>
inline v8::MaybeLocal<v8::Value> Get(const v8::Local<Obj>& object, Index index) {
  if (object.IsEmpty()) return v8::MaybeLocal<v8::Value>();
  return v8::MaybeLocal<v8::Value>(v8::Local<v8::Value>(
      node_occ_napi::napi_as<Napi::Object>(object.napi()).Get(static_cast<uint32_t>(index))));
}

template <typename Obj, typename Key>
inline v8::MaybeLocal<v8::Value> Get(const v8::Local<Obj>& object, const v8::Local<Key>& key) {
  if (object.IsEmpty() || key.IsEmpty()) return v8::MaybeLocal<v8::Value>();
  Napi::Object target = node_occ_napi::napi_as<Napi::Object>(object.napi());
  Napi::Value result;
  if (key->IsNumber()) result = target.Get(node_occ_napi::napi_as<Napi::Number>(key.napi()).Uint32Value());
  else result = target.Get(key.napi().ToString().Utf8Value());
  if (result.IsEmpty()) result = target.Env().Undefined();
  return v8::MaybeLocal<v8::Value>(v8::Local<v8::Value>(result));
}

inline v8::MaybeLocal<v8::Function> GetFunction(const v8::Local<v8::FunctionTemplate>& tpl) {
  if (tpl.IsEmpty()) return v8::MaybeLocal<v8::Function>();
  return v8::MaybeLocal<v8::Function>(tpl->GetFunction());
}

inline v8::MaybeLocal<v8::Object> NewInstance(const v8::Local<v8::Function>& fn) {
  if (fn.IsEmpty()) return v8::MaybeLocal<v8::Object>();
  return v8::MaybeLocal<v8::Object>(fn->NewInstance(Context{}, 0, static_cast<v8::Local<v8::Value>*>(nullptr)));
}

inline v8::MaybeLocal<v8::Object> NewInstance(const v8::Local<v8::Function>& fn, int argc,
                                             v8::Local<v8::Value>* argv) {
  if (fn.IsEmpty()) return v8::MaybeLocal<v8::Object>();
  return v8::MaybeLocal<v8::Object>(fn->NewInstance(Context{}, argc, argv));
}

inline v8::MaybeLocal<v8::Value> CallAsConstructor(const v8::Local<v8::Function>& fn, int argc,
                                                  v8::Local<v8::Value>* argv) {
  v8::MaybeLocal<v8::Object> created = NewInstance(fn, argc, argv);
  if (created.IsEmpty()) return v8::MaybeLocal<v8::Value>();
  return v8::MaybeLocal<v8::Value>(v8::Local<v8::Value>(created.ToLocalChecked().napi()));
}

inline Napi::Value MethodAdapter(const Napi::CallbackInfo& info) {
  node_occ_napi::SetCurrentEnv(info.Env());
  FunctionCallbackInfo<v8::Value> wrapped(info);
  auto* box = static_cast<MethodBox*>(info.Data());
  if (box != nullptr && box->fn != nullptr) {
    try {
      box->fn(wrapped);
    } catch (const JavaScriptException&) {
    } catch (const Napi::Error&) {
    } catch (const std::exception& ex) {
      if (!info.Env().IsExceptionPending()) {
        Napi::Error::New(info.Env(), ex.what()).ThrowAsJavaScriptException();
      }
    } catch (...) {
      if (!info.Env().IsExceptionPending()) {
        Napi::Error::New(info.Env(), "native exception").ThrowAsJavaScriptException();
      }
    }
  }
  if (info.Env().IsExceptionPending()) return info.Env().Undefined();
  if (wrapped.HasReturn()) return Napi::Value(info.Env(), wrapped.RawReturn());
  return info.Env().Undefined();
}

inline void SetMethod(const v8::Local<v8::Object>& target, const char* name, Method method) {
  if (target.IsEmpty()) return;
  Napi::Env env = target.napi().Env();
  node_occ_napi::SetCurrentEnv(env);
  Napi::Function fn = Napi::Function::New(env, MethodAdapter, name, BoxFor(method));
  target.napi().As<Napi::Object>().Set(name, fn);
}

inline void SetMethod(const v8::Local<v8::FunctionTemplate>& target, const char* name, Method method) {
  if (target.IsEmpty() || target.data() == nullptr || name == nullptr) return;
  std::shared_ptr<FtData> data = target.data();
  if (!data->defined) {
    data->AddStatic(name, method);
    return;
  }
  Napi::Function ctor = data->ctor.Value();
  node_occ_napi::SetCurrentEnv(ctor.Env());
  Napi::Function fn = Napi::Function::New(ctor.Env(), MethodAdapter, name, BoxFor(method));
  ctor.Set(name, fn);
}

inline void SetTemplate(const v8::Local<v8::ObjectTemplate>& proto, const char* name,
                        const v8::Local<v8::FunctionTemplate>& method) {
  if (!proto.IsEmpty() && !method.IsEmpty()) proto->AddMethod(name, method.method());
}

inline std::string NameOf(const v8::Local<v8::String>& name) {
  if (name.IsEmpty()) return "";
  return name.napi().As<Napi::String>().Utf8Value();
}

inline void SetAccessor(const v8::Local<v8::ObjectTemplate>& proto, const v8::Local<v8::String>& name,
                        Getter getter, void*, const v8::Local<v8::Value>&, int, int) {
  if (!proto.IsEmpty()) proto->AddAccessor(NameOf(name), getter);
}

inline void SetAccessor(const v8::Local<v8::Object>& object, const v8::Local<v8::String>& name, Getter getter,
                        void*, const v8::Local<v8::Value>&, int, int attributes) {
  if (object.IsEmpty()) return;
  napi_property_descriptor descriptor{};
  std::string storage = NameOf(name);
  descriptor.utf8name = storage.c_str();
  descriptor.getter = InvokeGetter;
  descriptor.data = BoxFor(getter);
  descriptor.attributes = MapAttributes(attributes, true);
  napi_define_properties(object.napi().Env(), object.napi(), 1, &descriptor);
}

template <typename T>
inline void DefineOwnProperty(const v8::Local<v8::Object>& object, const v8::Local<v8::String>& name,
                              const v8::Local<T>& value, int attributes) {
  if (object.IsEmpty()) return;
  std::string storage = NameOf(name);
  napi_property_descriptor descriptor{};
  descriptor.utf8name = storage.c_str();
  descriptor.value = value.napi();
  descriptor.attributes = MapAttributes(attributes, false);
  napi_define_properties(object.napi().Env(), object.napi(), 1, &descriptor);
}

}  // namespace Nan

namespace v8 {

inline Local<Array> Array::New(int length) { return Nan::New<Array>(length); }

inline int JsHandle::InternalFieldCount() const {
  if (value_.IsEmpty() || !value_.IsObject()) return 0;
  void* ptr = nullptr;
  napi_status status = napi_unwrap(value_.Env(), value_, &ptr);
  if (status != napi_ok || ptr == nullptr) return 0;
  return 1;
}

template <typename ContextT, typename ArgT>
Local<Object> JsHandle::NewInstance(ContextT, int argc, ArgT* argv) const {
  if (value_.IsEmpty() || !value_.IsFunction()) return Local<Object>();
  Napi::Env env = value_.Env();
  node_occ_napi::SetCurrentEnv(env);
  std::vector<napi_value> args;
  args.reserve(static_cast<size_t>(argc > 0 ? argc : 0));
  for (int i = 0; i < argc; i++) args.push_back(argv[i].napi());
  napi_value result = nullptr;
  napi_status status = napi_new_instance(
      env, value_, static_cast<size_t>(argc), args.empty() ? nullptr : args.data(), &result);
  if (status != napi_ok || result == nullptr) return Local<Object>();
  return Local<Object>(Napi::Value(env, result));
}

inline void FunctionTemplate::SetClassName(const Local<String>& name) {
  if (!data_ || name.IsEmpty()) return;
  data_->className = name.napi().As<Napi::String>().Utf8Value();
}

inline bool FunctionTemplate::HasInstance(const Local<Value>& value) const {
  if (!data_ || !data_->defined) return false;
  if (value.IsEmpty() || !value->IsObject()) return false;
  return value.napi().As<Napi::Object>().InstanceOf(data_->ctor.Value());
}

inline Local<Function> FunctionTemplate::GetFunction() const {
  if (!data_) return Local<Function>();
  Nan::DefineClass(data_.get());
  if (!data_->defined) return Local<Function>();
  return Local<Function>(data_->ctor.Value());
}

template <typename T>
String::Utf8Value::Utf8Value(const Local<T>& value) {
  if (!value.IsEmpty() && value->IsString()) {
    storage_ = node_occ_napi::napi_as<Napi::String>(value.napi()).Utf8Value();
  }
}

}  // namespace v8

namespace Nan {

inline void ObjectWrap::Wrap(const v8::Local<v8::Object>& object) {
  if (object.IsEmpty() || !object->IsObject()) return;
  Napi::Env env = object.napi().Env();
  napi_value js = object.napi();
  void* existing = nullptr;
  if (napi_unwrap(env, js, &existing) == napi_ok && existing != nullptr && existing != this) {
    auto* previous = static_cast<ObjectWrap*>(existing);
    napi_ref previousRef = previous->ref_;
    napi_env previousEnv = previous->env_;
    previous->ref_ = nullptr;
    previous->env_ = nullptr;
    napi_remove_wrap(env, js, &existing);
    if (previousRef != nullptr && previousEnv != nullptr) napi_delete_reference(previousEnv, previousRef);
    delete previous;
  }
  napi_ref ref = nullptr;
  napi_status status = napi_wrap(env, js, this, &ObjectWrap::Finalize, nullptr, &ref);
  if (status != napi_ok) return;
  ref_ = ref;
  env_ = env;
}

inline v8::Local<v8::Object> ObjectWrap::handle() const {
  if (ref_ == nullptr || env_ == nullptr) return v8::Local<v8::Object>();
  napi_value value = nullptr;
  napi_get_reference_value(env_, ref_, &value);
  if (value == nullptr) return v8::Local<v8::Object>();
  return v8::Local<v8::Object>(Napi::Value(env_, value));
}

inline void ObjectWrap::Finalize(napi_env, void* data, void*) {
  auto* self = static_cast<ObjectWrap*>(data);
  // The wrap reference is released by Node-API after this finalizer.
  self->ref_ = nullptr;
  self->env_ = nullptr;
  delete self;
}

}  // namespace Nan

#define NAN_METHOD(name) void name(const Nan::FunctionCallbackInfo<v8::Value>& info)
#define NAN_GETTER(name) \
  void name(v8::Local<v8::String> property, const Nan::FunctionCallbackInfo<v8::Value>& info)
#define NAN_PROPERTY_GETTER(name) NAN_GETTER(name)
#define NAUV_WORK_CB(name) void name(uv_async_t* async)

#define NODE_MODULE(modname, regfunc)                                                         \
  static Napi::Object _node_occ_init_##modname(Napi::Env env, Napi::Object exports) {         \
    node_occ_napi::SetCurrentEnv(env);                                                        \
    v8::Local<v8::Object> target(exports);                                                    \
    regfunc(target);                                                                          \
    return exports;                                                                           \
  }                                                                                           \
  NODE_API_MODULE(modname, _node_occ_init_##modname)
