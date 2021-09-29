type RequestOption = any

type RequestInput = {
    query: string
    options? : RequestOption
}

type Response = any


export interface IClient {
    sendRequest(input: RequestInput) : Promise<Response>
}