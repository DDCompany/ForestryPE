declare class IntegrationAPI {
    addToRecyclerBlacklist(id: number): void;
}

declare class ICore {
    Integration: IntegrationAPI;
}

declare namespace ModAPI {
    function addAPICallback(name: "ICore", callback: (api: ICore) => void): void;
}