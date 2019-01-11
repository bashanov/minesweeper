# MineSweeper

#### What is it?
Minesweeper is a clone of one of the most popular classic games fully written on react.js.

![Image](src/img/game.jpg)

#### I'd like to play, how to use?
* Manual
1. Clone repo and run `yarn install` (or `npm install`) to download dependencies.
2. Run `npm run build` to build the game. The result files will be located in `/dist` directory in the root.
3. Go to the project root, run webpack hot web server `npm run start` or start express nodejs server `node server.js`
* Docker
1. Clone repo and be sure you have docker (18.02.0+) and docker-compose packages.
2. Build and run docker-compose


#### Notice
Game uses
[animate.css](https://github.com/daneden/animate.css)
and 
[bootstrap4](https://github.com/twbs/bootstrap)
via a CDN.