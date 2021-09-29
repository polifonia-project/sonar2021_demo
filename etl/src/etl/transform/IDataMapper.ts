/**
 * IDataMapper interface is implemented by classes transforming data
 * 
 * I: input data type
 * O: output data
 * 
 * E.g. read DB rows and instantiate entity objects. Or transform data into json object etc... Serialize data etc.
 */
export interface IDataMapper<I,O> {
    transform(input: I) : O
}