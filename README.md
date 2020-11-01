# sub2myOnlyfans-back #
>
> EPITECH tek5 javascript fullstack project [BACK].  
>> By: Benjamin Brihoum, Victor Hazard, William Tessari.
>

## Installation ##
Run `npm install` then `npm run init` to initialise the project.
Then start your local mongoDB on port 27017.

## Deployment ##
Run `npm test` for developper purpose otherwise run `npm run prod`.

## Routes ##
`/user/signin` => POST {"username", "password"} => {"message" || "error"};  
`/user/login` => POST {"username", "password"} => {"message" && "token" || "error"};  
`/migration/` => GET {} => {{DATABASE CONTENT} || "error"};  
`/migration/up` => PATCH {"new column": "default value"} => {"message" || "error"};  
`/migration/down` => PATCH {"column to delete": ""} => {"message" || "error"};  

## Sockets ##
`.on('getEvent')` => "" => `.emit('answer', "JSON.stringify(event)")`  
`.on('replyEvent')` => "int" => ?`.emit('dead')`  

## <ins>Project Architecture:</ins> ##
\. --> `"YES I AM!" - Mohamedo Avuduru`  
├── Dockerfile --> `Docker container to run node and mongoledb. (send help)`  
├── node_modules --> `Let's not talk about this.`  
├── package-lock.json --> `Do! Not! Touch! This! File!`  
├── package.json --> `Project metadata.`  
├── README.md --> `You are here!`  
├── src --> `Does it needs any explanation?`  
│   ├── api --> `Route controller.`  
│   ├── config --> `Type definition.`  
│   ├── events --> `Events json.`  
│   ├── middleware --> `Middleware scripts.`  
│   ├── migrations --> `Migrations scripts.`  
│   ├── models --> `Database models.`  
│   ├── routes --> `Routes scripts.`  
│   ├── sockets --> `Sockets handlers.`  
│   ├── index.ts --> `Entry-point.`  
└── tsconfig.json --> `Typescript compiler configuration.`
