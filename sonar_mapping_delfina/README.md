# Sonar Data Mapping
Data Transformation Raw JSON -> Polifonia RDF

There is a [related Github issue](https://github.com/polifonia-project/sonar2021_demo/issues/35) for this task.
In this repository, there is PyRML (Python based engine for processing RML files developed by A. Nuzzolese) and all my progress so far. It includes:

- **example_to_match_to.ttl **--> a manual example Turtle file (done with Fiorela and checking with Vale C. at different points) of how the transformed data should look like;
- **polifonia_kg_mapping_rules.ttl **--> the RML mapping rules, which can/should be added to;
- **sources (folder) **--> places_input.json --> the raw data which is the input for the mapping rules and PyRML;
- **polifonia_KG.ttl **--> the current output of applying the mapping rules to the raw data with PyRML.

Quite some progress has been made. However, there are still work to do, including:
- separating IRIs with two agents into two IRIs for two different agents
- connecting the mp:Recording instances to the mp:Session instances
- fixing some of the syntax in some of the IRIs (e.g., IRIs of the range of mp:hasRecordingPerformer)
- making sure the IRIs are the kind we want
- creating core:Place instances
- connecting core:Agent instances to core:Place instances through the property core:hasBirthPlace
- connecting core:Agent instances to core:Place instances through the property mp:hasMusicalActivityBeginPlace
- whatever else may come up in the next few days.
