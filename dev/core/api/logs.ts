const LOG_TAG = "ForestryPE";

function log(msg: string, tag: string) {
    Logger.Log(`[${LOG_TAG}] ${msg}`, tag);
}

function summonException(msg: string): never {
    throw new Error(msg);
}