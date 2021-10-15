SONAR DEMO - APP FEATURES TO DEMO


- Explain the concept of annotations to songs. Information/metadata related to songs. 
- Annotations:
	- Type (spatial/harmonic/lyrical and so on)
	- Type-specific attributes that describe the detail of the specific annotation
- play song, annotations appear based on timestamps in the 'stream'
- Expand annotations and show details, showing that each also presents a number of related songs
- These related songs are derived from the annotationss of other songs that have some (threshold-based) simlarity to this particular song annotation
- From these related song lists we can start to build our custom play list. 
- Play list can be viewed and managed in another tab
- If we want to be taken on a surprise musical journey, we simply don't add anything to our playlist. As a song finishes, if the queue is empty, a randomly shuffled song that has some relationship with the current song will be played.
- Settings - Here we can choose which musical annotations are of interest to us. For example, we may wish to switch off Lyrics-based annotations here and they will not appear in the live stream.


FUTURE DEVELOPMENT AND POINTS TO CONSIDER

- Search facility - The app should/could provide the facility to find new songs based on search criteria that aligns with a particular annotation type. For example:  search by place, search by chord progression, search for similar lyrics by input string.
- Components/pipeline
	- (a) Source data
	- (b) Transform to KG
	- (c) Transform from KG to app-specific data
	- (d) App
	
- Currently, step (c) builds a static input file, with hardcoded song <-> song relationships. Moving forwards, this is the step that would be replaced with some intelligent KG querying intermediary API/service. The process of the app internally querying for song info, annotations and relationships is abstrated to an easily swappable service/module. This currently uses the static input (JSON) file, but could also query an external API without any changes to the main app logic. This external KG-querying service or "agent" could potentially be the main takeaway from this exercise, rather than the app iteself. 

- Similarity thresholds - Currently, spatial relationships have a similarity threshold of 1, ie we only show related songs where two annotations have an idential place (IRI). Moving forwards, some GIS functionality here should look into spatial distance between song annotations in the same way we analyse 'lyrical distance' or 'harmonic distance' and generate links based on configurable thresholds. Lyrics and harmonics relationships are already based on thresholds for similarity values (0.0 - 1.0).

- Citizen curated data - this could be collected in a number of ways:
	- Collect song <-> song relationship suggestions from users
	- Validate and add weight to existing machine-generated relationships by letting users 'like' or score the suggestions made to them. 

- Before the SONAR event, we need a carefully curated set of songs and annotations that best showcase the work that's been done so far
