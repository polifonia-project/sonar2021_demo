import { Service } from "typedi";

import { IReader } from "../IReader";
import { newEngine } from "@comunica/actor-init-sparql";
import { Bindings } from '@comunica/bus-query-operation';
import { DataFactory } from 'rdf-data-factory';
import { ActorInitSparql } from "@comunica/actor-init-sparql/index-browser";


export enum SourceEnum {
    Sparql = "sparql",
    File = "file",
    Hypermedia = "hypermedia",
    RdfjsSource = "rdfjsSource",
    HdtFile = "hdtFile",
    OstrichFile = "ostrichFile"
}

export type SparqlSource = {
    type: SourceEnum,
    value: string // e.g. sparql endpoint url, file location...
}

// adjust this to comunica such that IDataMapper can be typed
export type SparqlResponse = {
    bindings: any
}

type RequestOptions = any

export interface SparqlRequestInput {
    query: string
    options?: RequestOptions
    sources: SparqlSource[]
    graph? : string
}

@Service()
export class SparqlClient implements IReader<SparqlRequestInput, SparqlResponse> {

    sparqlQueryingEngine: ActorInitSparql;
    factory: any;
    
    constructor() {
        this.sparqlQueryingEngine = newEngine();
        this.factory = new DataFactory();
    }

    async read(input: SparqlRequestInput): Promise<SparqlResponse> {
        const query = input.query
        let bindings;
        try {
            let comunicaParams = {
                sources: input.sources,
                // bind ?graph variable if not default graph
                ...((input.graph && input.graph !== "default") && {initialBindings: Bindings({
                    '?graph' : this.factory.namedNode(input.graph)
                })})
            }
            const result : any = await this.sparqlQueryingEngine.query(query, comunicaParams);
            bindings = await result.bindings();
        } catch (e) {
            console.log("[!] SparqlClient.sendRequest", e);
            bindings = undefined;
        }
        return {
            bindings: bindings
        };
    }

    async invalidateCache() {
        await this.sparqlQueryingEngine.invalidateHttpCache()
    }

}
