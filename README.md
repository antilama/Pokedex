# Pokedex
My Angular implementation of Nintendo Pokemons browser.

### What is it:
App start by loading 12 randomly selected Pokemons. Custom randomizer, API doesn't have one.
You can select a Pokemon, and go into details, or click Load more Pokemon which starts an infinite scroll mode.

* Grid Component passes all of the selected Pokemon data to Details Component, so there is no wait time!
* After Details are up, Component automatically preloads neighboring Pokemon providing better UX when You navigate,
* App uses REST API http://pokeapi.co,
* App Component is used only as a router outlet, so it can be used create larger application,
* Has infinite scroll, and CSS animated loader.

### Implementation details:
* Pokedex is implemented in Angular 4.4.0-RC.0,
* Typescript only,
* Uses Bootstrap 4.0 CSS to some extent,
* Uses 2 Google fonts - Abel:400 and Montserrat:300,400,700,
* Does not use automated testing.

### How do I get set up? ###
* Clone this repo
  https://github.com/antilama/Pokedex.git

* Install dependencies with npm (need npm installed globally)
  npm install

* Development and Build is based on Angular CLI - https://cli.angular.io
  
  I recommend installing it globally with npm:
  npm install -g @angular/cli

* use:
    ng generate (to create new components),
    ng serve (localhost server in dev mode),
    ng build --prod (final build to dist)