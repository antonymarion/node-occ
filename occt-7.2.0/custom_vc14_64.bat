echo off

rem CASDEB comes as third argument

if /I "%VCVER%" == "vc14" (
  if "%ARCH%" == "64" (
    rem set environment variables used by OCCT
    set CSF_FPE=0

    set "TCL_DIR="
    set "TK_DIR="
    set "FREETYPE_DIR="
    set "FREEIMAGE_DIR="
    set "EGL_DIR="
    set "GLES2_DIR="
    set "GL2PS_DIR="
    set "TBB_DIR="
    set "VTK_DIR="
    set "FFMPEG_DIR="

    if not "" == "" (
      set "QTDIR="
    )
    set "TCL_VERSION_WITH_DOT="
    set "TK_VERSION_WITH_DOT="

    set "CSF_OCCTBinPath=%CASROOT%/win64/vc14/bin%3"
    set "CSF_OCCTLibPath=%CASROOT%/win64/vc14/lib%3"

    set "CSF_OCCTIncludePath=%CASROOT%/inc"
    set "CSF_OCCTResourcePath=%CASROOT%/src"
    set "CSF_OCCTDataPath=%CASROOT%/data"
    set "CSF_OCCTSamplesPath=%CASROOT%/samples"
    set "CSF_OCCTTestsPath=%CASROOT%/tests"
    set "CSF_OCCTDocPath=%CASROOT%/doc"
  )
)

