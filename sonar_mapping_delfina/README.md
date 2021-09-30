# Sonar Data Mapping
Data Transformation Raw JSON -> Polifonia RDF

There is a [related Github issue](https://github.com/polifonia-project/sonar2021_demo/issues/35) for this task.
In this repository, there is PyRML (Python based engine for processing RML files developed by A. Nuzzolese) and all my progress so far. It includes:

- **example_to_match_to.ttl **--> a manual example Turtle file (done with Fiorela and checking with Vale C. at different points) of how the transformed data should look like;
- **ex_mapping_rules.ttl **--> the RML mapping rules, working with the example input;
- **ex_input.json --> the raw data which is the input for the mapping rules and PyRML -- should look exactly like this (e.g., id's have underscores instead of dashes);
- **polifonia_ex_KG.ttl **--> the current output of applying the mapping rules to the example raw data with PyRML.

Other things to be done in next iteration:
- creating core:Place instances
- connecting core:Agent instances to core:Place instances through the property core:hasBirthPlace
- connecting core:Agent instances to core:Place instances through the property mp:hasMusicalActivityBeginPlace
- whatever else may come up in the next few days.
