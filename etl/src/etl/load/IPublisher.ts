/**
 * This interface is implemented by classes writing, publishing data.
 * E.g. You received data as json and write them to file, or event log, or console, or printer etc..
 * 
 * D: input data
 * O: options
 */
export interface IPublisher<D, O> {
    write(input: D, options?: O) : Promise<void>
}