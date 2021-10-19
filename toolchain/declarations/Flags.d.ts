/// <reference path="./core-engine.d.ts"/>

declare namespace Flags {
    const allFlags: {};

    function addFlag(name: string): boolean;

    function getFlag(name: string): boolean;

    function addUniqueAction(name: string, action: () => void): void;

    function assertFlag(name: string): void | never;
}