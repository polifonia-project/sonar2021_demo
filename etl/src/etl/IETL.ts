export type ETLOptions = any


/**
 * Client: client can fetch data from sources (files, sparql endpoint, db ...)
 *         Performs extract functionality
 * 
 * DataMapper: converts data received from client response into objects (e.g. raw JSON to Domain Entities or serialized them)
 *             Performs transform functionality 
 *
 * Publisher: publish data to file, event streams
 *            Performs load functionality
 */
export interface IETL<Client,DataMapper,Publisher> {

   
    client: Client
    dataMapper: DataMapper
    publisher: Publisher

    /**
     * Possible options to be configured timers, batch, parallelization etc.
     */
    run(options? : ETLOptions) : Promise<void>
         
}