const { execSync } = require("child_process");
const fs = require("fs");

if (process.platform !== "linux") {
  process.exit(0);
}

function emit(flags) {
  process.stdout.write(flags.filter(Boolean).join("\n"));
  process.stdout.write("\n");
  process.exit(0);
}

const names = ["opencascade", "OpenCASCADE", "occt", "OCC"];
for (const name of names) {
  try {
    const output = execSync(`pkg-config --libs ${name}`, { encoding: "utf8" }).trim();
    if (output) emit(output.split(/\s+/));
  } catch (err) {
    // try the next pkg-config module name
  }
}

const libDir = "/usr/lib/x86_64-linux-gnu";
let libraries = [];
try {
  libraries = fs.readdirSync(libDir)
    .filter((name) => /^libTK.+\.so$/.test(name))
    .map((name) => name.slice(3, -3))
    .sort();
} catch (err) {
  libraries = [];
}

if (libraries.length === 0) {
  console.error("OpenCascade libraries not found in " + libDir);
  process.exit(1);
}

emit([
  "-L" + libDir,
  "-Wl,--start-group",
  ...libraries.map((name) => "-l" + name),
  "-Wl,--end-group"
]);
