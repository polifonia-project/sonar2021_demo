import { Service } from "typedi";
import { IPublisher } from "../IPublisher";
import fs from "fs"

export enum FileFormatEnum {
    Json = "json",
    JsonLd = "jsonld",
    Ttl = "ttl"
}

export type FilePublisherOptions = {
    format?: FileFormatEnum,
    destination?: string
    msg? : string
}

@Service()
export class FilePublisher implements IPublisher<any, FilePublisherOptions> {

    async write(input: any, options?: FilePublisherOptions) : Promise<void> {
        const jsons =  JSON.stringify(input, null, 2)

        fs.writeFile(options?.destination ? options.destination : "/tmp/test", jsons, (err) => {
            if (err) {
                throw new Error("Error" + err)
            }
        })        
    }
}