import { Service } from "typedi";
import { SparqlResponse } from "../../extract/sparql/SparqlClient";
import { IDataMapper } from "../IDataMapper";

@Service()
export class    SparqlDataMapper implements IDataMapper<SparqlResponse, any> {

    async transform(input: SparqlResponse) {
        return await this.parseBindings(input.bindings)
    }

    toEntity(d: any): any {
        const binding = d
        const jsonResource : any = {};
        const variables : string[] = Array.from(binding.keys());
        variables.forEach((v) => {
            const result = binding.get(v);
            jsonResource[stripeQuestionMark(v)] = result.value; // value convert from rdf object NamedNode, Literal giving just the value
        });
        return jsonResource;
    }

    async parseBindings(comunicaBindings : any) {
        /*
        {
            uri:
            label:
            otherProp:
        }
        */
        let bindings = comunicaBindings;
        const resources = bindings.map((binding : any) => {
            return this.toEntity(binding)
        });
        return resources;
    }
}

const stripeQuestionMark = (sparqlVariable : string) : string => {
    return sparqlVariable.replace("?", "");
};