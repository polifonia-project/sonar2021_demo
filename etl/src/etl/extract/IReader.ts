/**
 * 
 * IReader interface is implemented by class reading data.
 *         Data can be read by remote or local source. E.g. Http Request. File ...
 * 
 * 
 * I: RequestInput: file location, database query etc... Any kind of parameter need to perform the operation
 * R: Response: data returned by the read operation. A Buffer, a Promise, an Observable, a Stream, an array etc...
 */
export interface IReader<I,R> {
    read(input: I) : Promise<R>
}
