import { Service } from 'typedi';


import { SparqlClient, SparqlSource } from "./extract/sparql/SparqlClient";
import { ETLResults, IETL } from "./IETL";
import { Logger } from './load/json/Logger';
import { SparqlDataMapper } from "./transform/sparql/SparqlDataMapper";


export type SparqlETLOptions = {
    query: string
    sources: SparqlSource[]
    verbose?: boolean
}

/**
 * Extract songs from Polifonia ttl file v2 and returns Sonar App data
 */
@Service()
export class SparqlETL implements IETL {


    constructor(private client : SparqlClient, private dataMapper : SparqlDataMapper, private publisher : Logger) {
    }

    async run(options: SparqlETLOptions) : Promise<ETLResults> {

        if (options) {
            const sparqlResponse = await this.client.read({
                query: options.query,
                sources: options.sources
            })
            if (sparqlResponse.bindings) {
                const resources = await this.dataMapper.transform(sparqlResponse)
                if (resources) {
                    if (options.verbose) {
                        this.publisher.write(resources)
                    }
                return resources
                }
            }
        } 
        return []
    }        
}