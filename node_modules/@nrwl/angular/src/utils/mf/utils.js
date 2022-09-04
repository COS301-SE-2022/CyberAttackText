"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependentPackagesForProject = exports.readRootPackageJson = void 0;
const devkit_1 = require("@nrwl/devkit");
const fs_1 = require("fs");
const typescript_1 = require("./typescript");
function readRootPackageJson() {
    const pkgJsonPath = (0, devkit_1.joinPathFragments)(devkit_1.workspaceRoot, 'package.json');
    if (!(0, fs_1.existsSync)(pkgJsonPath)) {
        throw new Error('NX MF: Could not find root package.json to determine dependency versions.');
    }
    return (0, devkit_1.readJsonFile)(pkgJsonPath);
}
exports.readRootPackageJson = readRootPackageJson;
function getDependentPackagesForProject(projectGraph, name) {
    const { npmPackages, workspaceLibraries } = collectDependencies(projectGraph, name);
    return {
        workspaceLibraries: [...workspaceLibraries.values()],
        npmPackages: [...npmPackages],
    };
}
exports.getDependentPackagesForProject = getDependentPackagesForProject;
function collectDependencies(projectGraph, name, dependencies = {
    workspaceLibraries: new Map(),
    npmPackages: new Set(),
}, seen = new Set()) {
    var _a;
    if (seen.has(name)) {
        return dependencies;
    }
    seen.add(name);
    ((_a = projectGraph.dependencies[name]) !== null && _a !== void 0 ? _a : []).forEach((dependency) => {
        if (dependency.target.startsWith('npm:')) {
            dependencies.npmPackages.add(dependency.target.replace('npm:', ''));
        }
        else {
            dependencies.workspaceLibraries.set(dependency.target, {
                name: dependency.target,
                root: projectGraph.nodes[dependency.target].data.root,
                importKey: getLibraryImportPath(dependency.target, projectGraph),
            });
            collectDependencies(projectGraph, dependency.target, dependencies, seen);
        }
    });
    return dependencies;
}
function getLibraryImportPath(library, projectGraph) {
    const tsConfigPathMappings = (0, typescript_1.readTsPathMappings)();
    const sourceRoot = projectGraph.nodes[library].data.sourceRoot;
    for (const [key, value] of Object.entries(tsConfigPathMappings)) {
        if (value.find((path) => path.startsWith(sourceRoot))) {
            return key;
        }
    }
    return undefined;
}
//# sourceMappingURL=utils.js.map