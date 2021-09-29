import { SourceEnum, SparqlClient } from "./extract/sparql/SparqlClient";
import { IETL } from "./IETL";
import { FilePublisher } from "./load/json/FilePublisher";
import { SparqlDataMapper } from "./transform/sparql/SparqlDataMapper";

/**
 * Extract songs from Polifonia ttl file v2 and returns Sonar App data
 */
export class PolifoniaTTLFileToSonarAPPSongsETL implements IETL<SparqlClient, SparqlDataMapper, FilePublisher> {

    client: SparqlClient;
    dataMapper: SparqlDataMapper;
    publisher: FilePublisher;

    constructor(client : SparqlClient, dataMapper : SparqlDataMapper, publisher : FilePublisher) {
        this.client = client
        this.dataMapper = dataMapper
        this.publisher = publisher
    }

    async run(options?: any) {

        const getSongsQuery = `
            SELECT * WHERE {
                ?s ?p ?o
            }`

        const songsResponse = await this.client.sendRequest({
            query: getSongsQuery,
            sources: [{
                type: SourceEnum.File,
                value: "https://raw.githubusercontent.com/polifonia-project/sonar2021_demo/develop/src/assets/data/data_v2.jsonld"
                // value: "../data/data_v2.ttl"
            }]
        })

        const songs = await this.dataMapper.transform(songsResponse)

        console.log(songs)        

    }
        
}