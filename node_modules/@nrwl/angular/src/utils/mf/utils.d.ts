import { ProjectGraph } from '@nrwl/devkit';
export declare type WorkspaceLibrary = {
    name: string;
    root: string;
    importKey: string | undefined;
};
export declare function readRootPackageJson(): {
    dependencies?: {
        [key: string]: string;
    };
    devDependencies?: {
        [key: string]: string;
    };
};
export declare function getDependentPackagesForProject(projectGraph: ProjectGraph, name: string): {
    workspaceLibraries: WorkspaceLibrary[];
    npmPackages: string[];
};
