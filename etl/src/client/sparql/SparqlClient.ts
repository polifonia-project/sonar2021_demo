import { IClient } from "../IClient";


enum SourceEnum {
    Sparql = "sparql",
    File = "file",
    Hypermedia = "hypermedia",
    RdfjsSource = "rdfjsSource",
    HdtFile = "hdtFile",
    OstrichFile = "ostrichFile"
}

export type SparqlSource = {
    type: SourceEnum,
    value: string // e.g. sparql endpoint url, file location...
}

export class SparqlClient implements IClient  {

    source: SparqlSource;
    graph?: string;

    constructor(source : SparqlSource, graph?: string) {
        this.source = source
        this.graph = graph
    }

    setSource(source: SparqlSource) {
        this.source = source
    }

    setGraph(graph : string) {
        this.graph = graph
    }

    sendRequest(input: { query: string; options?: any; }): Promise<any> {
        throw new Error("Method not implemented.");
    }

}