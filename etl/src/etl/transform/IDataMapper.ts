export interface IDataMapper<I,O> {
    transform(input: I) : O
}