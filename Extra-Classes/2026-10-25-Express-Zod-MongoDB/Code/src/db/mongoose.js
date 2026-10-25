// BSON 7 checks Node's V8 startup snapshot while it loads. Bun 1.3.14
// exposes that method but throws when BSON calls it. Hide only that optional
// snapshot API during the Mongoose import.
const getBuiltinModule = process.getBuiltinModule;

if (typeof Bun !== "undefined" && getBuiltinModule) {
  process.getBuiltinModule = (name) => {
    const builtin = getBuiltinModule(name);
    return name === "v8"
      ? { ...builtin, startupSnapshot: undefined }
      : builtin;
  };
}

let mongoose;
try {
  mongoose = (await import("mongoose")).default;
} finally {
  process.getBuiltinModule = getBuiltinModule;
}

export default mongoose;
