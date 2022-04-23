import { PublicKey } from "@solana/web3.js";


// Solana injected window object
export interface SolWindow extends Window {
    solana: {
      isPhantom?: boolean,
      isMathWallet?: boolean,
      getAccount: () => Promise<string>,
    },
    solong: {
      selectAccount: () => Promise<string>,
    },
    solflare: {
      isSolflare?: boolean
    },
    Slope: {
      new (): SlopeWallet;
    }
};

export interface WalletProvider {
name: string,
icon: string,
url: string
};

export interface SlopeWallet {
    name: string,
    publicKey: any,
    on: Function,
    forgetAccounts: Function,
    connect(): Promise<{
        msg: string;
        data: {
            publicKey?: string;
        };
    }>;
    disconnect(): Promise<{ msg: string }>;
    signTransaction(message: string): Promise<{
        msg: string;
        data: {
            publicKey?: string;
            signature?: string;
        };
    }>;
    signAllTransactions(messages: string[]): Promise<{
        msg: string;
        data: {
            publicKey?: string;
            signatures?: string[];
        };
    }>;
    signMessage(message: Uint8Array): Promise<{ data: { signature: string } }>;
}

export interface MathWallet {
    isMathWallet: boolean,
    version: string,
    name: string,
    publicKey: PublicKey,
    on: Function,
    connect: Function,
    disconnect: Function,
    forgetAccounts: Function
};

export interface SlopeWallet {
    name: string,
    publicKey: any,
    on: Function,
    forgetAccounts: Function,
    connect(): Promise<{
        msg: string;
        data: {
            publicKey?: string;
        };
    }>;
    disconnect(): Promise<{ msg: string }>;
    signTransaction(message: string): Promise<{
        msg: string;
        data: {
            publicKey?: string;
            signature?: string;
        };
    }>;
    signAllTransactions(messages: string[]): Promise<{
        msg: string;
        data: {
            publicKey?: string;
            signatures?: string[];
        };
    }>;
    signMessage(message: Uint8Array): Promise<{ data: { signature: string } }>;
}

export interface SolongWallet {
    name: string,
    inProcess: boolean,
    currentAccount: string,
    selectMsg: any,
    signature: any,
    transferRst: any,
    publicKey: any,
    on: Function,
    disconnect: Function
    connect: Function,
    forgetAccounts: Function
};
