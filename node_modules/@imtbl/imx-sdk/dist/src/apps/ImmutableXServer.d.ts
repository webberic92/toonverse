import { ImLogger } from '@imtbl/imlogging';
export declare class ImmutableXServer {
    private log;
    private wss;
    private component;
    constructor(log: ImLogger, port?: number);
    private handleConnection;
    private handleMessage;
}
