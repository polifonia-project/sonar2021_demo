# Sonar Data Mapping
Data Transformation Raw JSON -> Polifonia RDF

There is a [related Github issue](https://github.com/polifonia-project/sonar2021_demo/issues/35) for this task.
In this repository, there is PyRML (Python based engine for processing RML files developed by A. Nuzzolese) and all my progress so far. 


It includes:

AN EXAMPLE - This works mostly well.

- **ex_mapping_rules.ttl**--> the RML mapping rules, working with the example input;
- **ex_sources** --> folder with the example raw data which is the input for the mapping rules and PyRML;
- **ex_polifonia_KG.ttl**--> the current output of applying the mapping rules to the example raw data with PyRML.

FULL KG - (This still has some major issues - e.g., the Performer entities are not being created)

- **mapping_rules.ttl**--> the RML mapping rules, working with the full input;
- **sources** --> folder with the full input raw data which is the input for the mapping rules and PyRML;
- **polifonia_KG.ttl**--> the current output of applying the mapping rules to the full raw data with PyRML.


Other things to be done in next iteration:
- connecting core:Agent instances to core:Place instances through the property core:hasBirthPlace
- connecting core:Agent instances to core:Place instances through the property mp:hasMusicalActivityBeginPlace
- whatever else may come up in the next few days.
