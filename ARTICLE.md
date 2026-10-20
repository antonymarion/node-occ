# Node-API, pointer compression, and Node OpenCascade

A native addon built with NAN does not start on a Node.js compiled with V8 pointer compression. The same code, built with Node-API, loads. With 4,000 [OpenCascade](https://dev.opencascade.org/) solids and their 32,000 vertices, the V8 heap goes from 246 MB to 138 MB.

Source code: [antonymarion/node-occ](https://github.com/antonymarion/node-occ), branch `node-api`.

## node-occ and node-caged

[node-occ](https://github.com/antonymarion/node-occ) (Node OpenCascade) wraps [OpenCascade](https://dev.opencascade.org/) ([OCCT](https://github.com/Open-Cascade-SAS/OCCT)) so JavaScript can build solids, run booleans, and read STEP or BREP. [Etienne Rossignon](https://medium.com/@etienne.rossignon) wrote that binding. This migration starts from his tree, [OpenWebCAD/node-occ](https://github.com/OpenWebCAD/node-occ) at commit `e135bd1`, which still called V8 through NAN.

NAN includes the V8 headers, so the pointer layout is fixed at compile time. [node-caged](https://github.com/platformatic/node-caged) is the Node.js build [Matteo Collina](https://www.linkedin.com/in/matteocollina/) publishes at Platformatic with `--experimental-enable-pointer-compression`. Those pointers are 32 bits. He wrote up the memory result in [We cut Node.js' memory in half](https://blog.platformatic.dev/we-cut-nodejs-memory-in-half). His [LinkedIn post](https://www.linkedin.com/posts/matteocollina_ive-just-updated-node-caged-to-nodejs-2610-activity-7460721601806942209-hnq3) is the later update of that image to Node.js 26. A NAN addon loads badly, or not at all. Node-API does not see that pointer layout. The ABI stays stable, so the same `.node` file runs on both binaries.

I started from the antonymarion fork and took the OpenWebCAD tree, originally OCCT 7.5 and still on NAN. I replaced NAN with a `src/nan.h` shim on top of `node-addon-api`. The C++ classes stay: `Nan::ObjectWrap`, `NAN_METHOD`, and the templates. The shim includes neither `v8.h` nor `nan`. I kept the fork's untrimmed-cone fix (`R2 = 0`). I adapted the code to OpenCascade 7.8, the version Debian ships. Triangulation uses `Poly_Triangulation::Node`. `TopoDS_Shape::HashCode` is removed in that version, so the hash uses `std::hash`.

## The measurement

The Docker image in `Dockerfile` starts from `platformatic/node-caged:26`, installs OpenCascade, then official Node.js 22.21.0. The addon is compiled once, against that Node 22's headers, with `NAPI_VERSION=8`.

The same `bench/memory.js` process creates 4,000 boxes (`makeBox`), then collects their vertices (32,000 objects), with `--expose-gc` before each sample. It reads `process.memoryUsage().heapUsed` and `rss`.

**Node 22.21.0.** Pointer compression off. V8 heap limit 4.05 GB.

- Heap after 4,000 solids: 131.27 MB
- RSS after 4,000 solids: 261.09 MB
- Heap after the 32,000 vertices: 245.78 MB
- RSS after the 32,000 vertices: 394.53 MB

**node-caged 26.10.0.** Pointer compression on. V8 heap limit 4.00 GB.

- Heap after 4,000 solids: 74.27 MB
- RSS after 4,000 solids: 204.61 MB
- Heap after the 32,000 vertices: 138.49 MB
- RSS after the 32,000 vertices: 317.36 MB

The solids heap drops by 43%. Solids plus vertices drop by 44%, from 246 MB to 138 MB. The drop stays under 50% because a JavaScript object holds more than pointers, and doubles do not shrink.

RSS for the 4,000 boxes drops by 56 MB. The V8 heap drops by 57 MB on that same step. The OpenCascade B-Rep is the same size in both runs. Pointer compression shrinks the JavaScript objects that wrap the geometry. OCCT's C++ allocations stay the same size. On Node OpenCascade, most of the RSS is that native geometry. The heap change is in the thousands of wrappers, vertices, and arrays.

node-caged caps each isolate at 4 GB. The official Node in this measurement reports 4.05 GB, and both processes sit under the cap. The smaller heap is the width of the pointers. Node-API is what keeps this addon running across Node versions, including the compressed build. NAN stays tied to one V8 layout.

All 265 Mocha tests in the repository pass on official Node, with this addon.

## Reproduce

From [antonymarion/node-occ](https://github.com/antonymarion/node-occ), branch `node-api`:

```bash
docker build -t node-occ-napi .
docker run --rm node-occ-napi /opt/node-stock/bin/node --expose-gc bench/memory.js
docker run --rm node-occ-napi sh -c '"$(cat /opt/caged-node-path)" --expose-gc bench/memory.js'
```

The JSON field `pointerCompression` is `0` or `1`. `binding` is `node-api`.

---

### LinkedIn note

I moved node-occ from NAN to Node-API so it loads on a Node binary built with V8 pointer compression. That binary is [node-caged](https://github.com/platformatic/node-caged). [Matteo Collina](https://www.linkedin.com/posts/matteocollina_ive-just-updated-node-caged-to-nodejs-2610-activity-7460721601806942209-hnq3) posted the update to Node.js 26.

node-occ is [Etienne Rossignon](https://medium.com/@etienne.rossignon)'s Node OpenCascade binding for [OpenCascade](https://dev.opencascade.org/). The same Node-API binary runs 4,000 solids and 32,000 vertices:

- V8 heap: 246 MB to 138 MB (−44%)
- native B-Rep memory stays the same

265 Mocha tests pass. The full write-up is on Medium.
