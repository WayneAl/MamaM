import { WalletProvider } from "../types/solanaTypes";
/**
 * Small helper function to read a JSON file as a type from a filepath
 *
 * @param filePath The path to read the data from
 */
export declare function readJsonFile<T>(filePath: string): T;
export declare function isWalletProvider(object: unknown): object is WalletProvider;
/**
 * Small helper function to wait for `time` milliseconds - useful because often the on chain data needs to be validated before it's available
 *
 * @param time Amount of time to sleep for, in milliseconds
 */
export declare function sleep(time: number): Promise<void>;
