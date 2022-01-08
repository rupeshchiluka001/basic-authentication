# basic-athentication

Basic authentication using next.js and jwt

## Requirements

1. node version >= 12
1. mongo version >= 5
1. No other process should run on port 3000 and 3080
1. create ".env" file in project's root directory with variables
    1. "DB_STRING" of format "mongodb://localhost:27017/[database-name]"
1. cd into the folder "pages >> api >> config" and run the command "node generateKeypair.js"

## Instructions to run the server

1. cd into the project's root directory
1. run "npm install"
1. run "npm start"
1. open another terminal and cd into the folder "pages >> api" and run "node app.js"
