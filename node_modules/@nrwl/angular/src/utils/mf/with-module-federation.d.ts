import { SharedLibraryConfig } from './mf-webpack';
export declare type MFRemotes = string[] | [remoteName: string, remoteUrl: string][];
declare type SharedFunction = (libraryName: string, sharedConfig: SharedLibraryConfig) => SharedLibraryConfig | false;
declare type AdditionalSharedConfig = Array<string | [libraryName: string, sharedConfig: SharedLibraryConfig] | {
    libraryName: string;
    sharedConfig: SharedLibraryConfig;
}>;
export interface MFConfig {
    name: string;
    remotes?: MFRemotes;
    exposes?: Record<string, string>;
    shared?: SharedFunction;
    additionalShared?: AdditionalSharedConfig;
}
export declare function withModuleFederation(options: MFConfig): Promise<(config: any) => any>;
export {};
