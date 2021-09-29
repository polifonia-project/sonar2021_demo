import { IPublisher } from "../IPublisher";

export enum FileFormatEnum {
    Json = "json",
    JsonLd = "jsonld",
    Ttl = "ttl"
}

export type FilePublisherOptions = {
    format: FileFormatEnum
}

export class FilePublisher implements IPublisher<any[], FilePublisherOptions> {

    async write(input: any[], options: FilePublisherOptions) : Promise<void> {
        const jsons =  JSON.stringify(input)
        // blablabla and write
    }
}