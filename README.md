![issues](https://img.shields.io/github/issues/AllAroundD/devconnector) ![forks](https://img.shields.io/github/forks/AllAroundD/devconnector) ![stars](https://img.shields.io/github/stars/AllAroundD/devconnector) ![license](https://img.shields.io/github/license/AllAroundD/devconnector)

# Dev-Connector

Dev Connector is a small social network app for developers that includes authentication, profiles and forum posts.
Users can create a profile and make posts to a forum and comment and like other posts.
Some features are:
The user's logo is grabbed from Gravatar upon registration.
Once the user adds their Github id to their profile, the github API is able to pull some information from the last 5 repositories.

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)

## Installation

For just using the application, there is no installation required. The application url is https://devconnector-dm.vercel.app/.
For the local setup of this application, there are a few npm modules that are required (default.json, axios, etc.). Once the repository is cloned, typing 'npm install' at the command prompt will install all of the required modules.
This application requires the MongoDB client (https://www.mongodb.com/download-center#community) to be installed.
A 'default.json' file will need to be created in the config folder of the application after cloning for the local connection info, with a mongoURI string to the mongo DB. The default.json config file should be added to .gitignore. If git has been previously tracking your default.json file then run the following...

> git rm --cached config/default.json

You can get an access token by following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). For this app, you don't need to add any permissions so don't select any in the scopes. DO NOT SHARE ANY TOKENS THAT HAVE PERMISSIONS. This would leave your account or repositories vulnerable, depending on permissions set.
Then add your token to the config file and confirm that the file is untracked with git status before pushing to GitHub.
Once you run the program by typing 'npm run dev', the node server will be listening on port 5000 and browser window will open and the app will listen on port 3000.

## Usage

For just using the application, the [application url](https://devconnector-dm.vercel.app/) is where the application resides.
If installing locally, see the installation steps above to install and then run the node server by typing the following command.

> npm run dev

Dev Connector is a small social network app (for developers) that includes authentication, profiles and forum posts.

Here is an example of the application in action:
![Dev Connector demo](./public/assets/img/devconnector-demo.gif)

## License

[MIT](LICENSE)

## Contributing

## Tests

No formal tests yet documented. The usage demo gif above shows some of the tests that were performed.

## Questions

[GitHub Profile](https://github.com/AllAroundD/)

-If you have any questions, please contact me at [dougmoore@use.startmail.com](mailto:dougmoore@use.startmail.com?subject=[GitHub]%20Source%20Question).
