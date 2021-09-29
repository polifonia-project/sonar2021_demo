export type ETLOptions = any
export type ETLResults = any[]

export interface IETL {

    /**
     * Possible options to be configured timers, batch, parallelization etc.
     */
    run(options? : ETLOptions) : Promise<ETLResults>
         
}