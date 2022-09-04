import { NormalModuleReplacementPlugin } from 'webpack';
import { WorkspaceLibrary } from './utils';
export interface SharedLibraryConfig {
    singleton?: boolean;
    strictVersion?: boolean;
    requiredVersion?: false | string;
    eager?: boolean;
}
export declare function shareWorkspaceLibraries(libraries: WorkspaceLibrary[], tsConfigPath?: string): {
    getAliases: () => {};
    getLibraries: (eager?: boolean) => Record<string, SharedLibraryConfig>;
    getReplacementPlugin: () => NormalModuleReplacementPlugin;
};
export declare function getNpmPackageSharedConfig(pkgName: string, version: string): SharedLibraryConfig | undefined;
export declare function sharePackages(packages: string[]): Record<string, SharedLibraryConfig>;
