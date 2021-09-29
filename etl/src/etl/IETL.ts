export type ETLOptions = any

export interface IETL {

    /**
     * Possible options to be configured timers, batch, parallelization etc.
     */
    run(options? : ETLOptions) : Promise<void>
         
}