import { Service } from 'typedi';


import { SourceEnum, SparqlClient } from "./extract/sparql/SparqlClient";
import { IETL } from "./IETL";
import { FilePublisher } from "./load/json/FilePublisher";
import { SparqlDataMapper } from "./transform/sparql/SparqlDataMapper";

/**
 * Extract songs from Polifonia ttl file v2 and returns Sonar App data
 */
@Service()
export class PolifoniaTTLFileToSonarAPPSongsETL implements IETL {


    constructor(private client : SparqlClient, private dataMapper : SparqlDataMapper, private publisher : FilePublisher) {
    }

    async run(options?: any) {

        const getSongsQuery = `
            PREFIX rdf: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX poli-mp: <https://w3id.org/polifonia/ON/musical-performance/>

            SELECT 
                ?id 
                ?name 
                ?artist 
                ?youtubeID 
            WHERE {
                ?id rdf:label ?label ;
                    poli-mp:hasTitle ?title ;
                    poli-mp:hasArtistLabel ?artist ;
                    poli-mp:hasYoutubeID ?youtubeID  .
            }
        `

        const songsResponse = await this.client.read({
            query: getSongsQuery,
            sources: [{
                type: SourceEnum.File,
                value: "https://raw.githubusercontent.com/polifonia-project/sonar2021_demo/develop/src/assets/data/data_v2.jsonld"
                // value: "../data/data_v2.ttl"
            }]
        })

        if (songsResponse.bindings) {

            const songs = await this.dataMapper.transform(songsResponse)
            console.log(songs)
        }

    }
        
}