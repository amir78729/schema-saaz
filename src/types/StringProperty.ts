import { IProperty } from "../interface/JsonSchemaBuilder";

export class StringProperty implements IProperty {

    constructor() {

    }
    log(message: string): void {
        console.log(`[Console] ${message}`);
    }
}