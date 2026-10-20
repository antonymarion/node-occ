"use strict";

const v8 = require("v8");
const occ = require("../lib/occ");

function snapshot(label) {
  if (typeof global.gc === "function") global.gc();
  const memory = process.memoryUsage();
  return {
    label,
    heapUsed: memory.heapUsed,
    heapTotal: memory.heapTotal,
    external: memory.external,
    arrayBuffers: memory.arrayBuffers || 0,
    rss: memory.rss
  };
}

function mb(bytes) {
  return Math.round((bytes / (1024 * 1024)) * 100) / 100;
}

const N = Number(process.env.OCC_BENCH_N || 4000);
const config = (process.config && process.config.variables) || {};
const before = snapshot("baseline");
const solids = [];
for (let i = 0; i < N; i++) {
  solids.push(occ.makeBox([0, 0, 0], [10 + (i % 7), 20, 30]));
}
const afterSolids = snapshot("solids");

const vertices = [];
for (const solid of solids) {
  const found = solid.getVertices();
  for (let i = 0; i < found.length; i++) vertices.push(found[i]);
}
const afterVertices = snapshot("vertices");

let meshBytes = null;
try {
  const box = occ.makeBox([0, 0, 0], [80, 60, 40]);
  const cyl = occ.makeCylinder([40, 30, -10], [40, 30, 50], 25);
  const cut = occ.cut(box, cyl);
  cut.createMesh(0.5, 5);
  meshBytes = snapshot("mesh");
} catch (err) {
  meshBytes = { label: "mesh", error: String(err && err.message ? err.message : err) };
}

const heap = v8.getHeapStatistics();
const report = {
  node: process.version,
  binding: occ.binding || "unknown",
  pointerCompression: config.v8_enable_pointer_compression || 0,
  heapSizeLimit: heap.heap_size_limit,
  count: N,
  vertexCount: vertices.length,
  before,
  afterSolids,
  afterVertices,
  mesh: meshBytes,
  delta: {
    solidsHeapMb: mb(afterSolids.heapUsed - before.heapUsed),
    solidsRssMb: mb(afterSolids.rss - before.rss),
    verticesHeapMb: mb(afterVertices.heapUsed - before.heapUsed),
    verticesRssMb: mb(afterVertices.rss - before.rss)
  }
};

console.log(JSON.stringify(report));
// Keep the geometry alive until the process prints the report.
solids.length;
vertices.length;
