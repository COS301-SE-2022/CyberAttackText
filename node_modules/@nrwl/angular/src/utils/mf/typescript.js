"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTsPathMappings = void 0;
const typescript_1 = require("@nrwl/workspace/src/utilities/typescript");
const fs_1 = require("fs");
let tsConfig;
let tsPathMappings;
function readTsPathMappings(tsConfigPath) {
    var _a, _b, _c;
    if (tsConfigPath === void 0) { tsConfigPath = (_a = process.env.NX_TSCONFIG_PATH) !== null && _a !== void 0 ? _a : (0, typescript_1.getRootTsConfigPath)(); }
    if (tsPathMappings) {
        return tsPathMappings;
    }
    tsConfig !== null && tsConfig !== void 0 ? tsConfig : (tsConfig = readTsConfiguration(tsConfigPath));
    tsPathMappings = {};
    Object.entries((_c = (_b = tsConfig.options) === null || _b === void 0 ? void 0 : _b.paths) !== null && _c !== void 0 ? _c : {}).forEach(([alias, paths]) => {
        tsPathMappings[alias] = paths.map((path) => path.replace(/^\.\//, ''));
    });
    return tsPathMappings;
}
exports.readTsPathMappings = readTsPathMappings;
function readTsConfiguration(tsConfigPath) {
    if (!(0, fs_1.existsSync)(tsConfigPath)) {
        throw new Error(`NX MF: TsConfig Path for workspace libraries does not exist! (${tsConfigPath}).`);
    }
    return (0, typescript_1.readTsConfig)(tsConfigPath);
}
//# sourceMappingURL=typescript.js.map