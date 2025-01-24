export interface ConfigFile {
    secret?: string;
    port?: number;
    env?: string;
    mongo?: {
        uri?: string;
        dev_uri?: string;
    };
}

export interface User {
    id?: string;
    name: string;
    email: string;
    picture: string;
    phoneNumber: string;
    balance: number;
    password: string;
    groups?: string[];
    createdAt?: string;
    updatedAt?: string;
}
