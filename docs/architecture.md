This section describes the architecture of the project.

## Structure

```
nana-rhythm-game
├── .eslintignore
├── .gitignore
├── .prettierignore
├── .prettierrc
├── CHANGELOG.md
├── LICENSE
├── package.json
├── README.md
├── tsconfig.json
├── tslint.json
├── webpack.config.js
├── assets (game assets)
│   ├── logo.png
├── public (main index.html file and css)
│   ├── index.html
│   ├── style.css
└── src
    ├── game (game files)
    |   ├── config (game configuration files)
    |   ├── core (folder with core game files)
    |   ├── helpers (folder with usefull functions like random number etc.)
    |   ├── interfaces (here are all interfaces for typescript)
    |   ├── objects (here you can find all game objects like image, text etc.)
    |   ├── redux (folder where are located all file related with global state)
    |   ├── scenes (folder where you can find all game scenes)
    |   ├── utils (folder where you put random stuff you don’t know where to put)
    |   └── game.js (main game file)
    ├── main (electron create window)
    ├── renderer (electron render)
    └── typing (types for tsconfig.json)
```
