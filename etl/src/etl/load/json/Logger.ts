import { Service } from "typedi";
import { IPublisher } from "../IPublisher";

@Service()
export class Logger implements IPublisher<any[], any> {

    async write(input: any[]) : Promise<void> {
        console.log(input)
    }
}