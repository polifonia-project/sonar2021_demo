export interface IClient<I,R> {
    sendRequest(input: I) : Promise<R>
}
