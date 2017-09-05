# Pokedex
My Angular implementation of Nintendo Pokemons browser.

### Features:
* Uses REST API http://pokeapi.co,
* Uses seperate components for grid, details, loader, routing and fetching data,
* App Component is used only as a router outlet, can be used create larger application,
* Has infinite scroll, 
* CSS animated loader.

### Implementation details:
* Browser is implemented in Angular 4.4.0-RC.0,
* Typescript only,
* Uses Bootstrap 4.0 CSS to some extent,
* Uses 2 Google fonts - Abel:400 and Montserrat:300,400,700,
* Does not use automated testing.

### How do I get set up? ###
* Clone this repo
  https://github.com/antilama/Pokedex.git

* Install dependencies with npm (need npm installed globaly)
  npm install

* Development and Build is based on Angular CLI - https://cli.angular.io
  
  I recommend installing it globaly with npm:
  npm install -g @angular/cli

* use:
    ng generate (to create new components),
    ng serve (localhost server in dev mode),
    ng build --prod (final build to dist)