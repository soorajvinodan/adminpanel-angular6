When you are doing development for Pigeon web admin follow the steps mentioned below in local dev environment.
Step-by-step guide

You need to have proper dev setup machine to follow following setup.
Make sure your local mongod is running.
If you want to do changes for Pigeon - in client folder(From IDE):
Change "env" in config.json to Dev.
Change "serverUrl" src/environment/environment.ts to "http://localhost:8080/".
In client folder from terminal:
Do npm install.
run "ng serve"
run "node pigeonServer.js" (In different terminal for same directory)
Open "http://localhost:4200/" in browser.
Before doing checkin check the minified code is working or not by following the steps below:
Revert the change in config.json file.
Change "serverUrl" src/environment/environment.prod.ts to "http://localhost:8080/".
Stop "ng serve" and "pigeonServer".
Run "ng build --prod --aot"
Run "node pigeonServer.js"
Open localhost:8080 in browser and check the changes you have done is working or not.
