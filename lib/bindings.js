const fs = require("fs");
const path = require("path");

function load() {
  const candidates = [
    path.join(__dirname, "binding", "occ.node"),
    path.join(__dirname, "..", "build", "Release", "occ.node"),
    path.join(__dirname, "..", "build", "Debug", "occ.node")
  ];
  const errors = [];
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    try {
      return require(candidate);
    } catch (err) {
      errors.push(candidate + ": " + err.message);
    }
  }
  throw new Error("node-occ native binding not found\n" + errors.join("\n"));
}

module.exports = load();
