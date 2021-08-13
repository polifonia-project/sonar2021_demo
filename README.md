# sonar2021_demo
This repository is created for the documentation of the Polifonia demo that is going to be presented to SONAR2021

## dev branch
Development branch

To develop you need node.js and npm package manager installed in you're machine.

Install dependency and dev dependency:

```npm install --dev```


Project is configured to be coded in both js and ts.
You can write libraries, functions, classes for you're application under ```src/``` folder.



All the components in ```src/main.ts``` would be bundled in a single js file imported in you're app ```index.html```.


By running:

```npm run build```

webpack will compile and bundle the code in ```build/main.js```.

This script is imported in ```build/index.html```.


Application specific js is placed in ```dist/assets/app.js```.

