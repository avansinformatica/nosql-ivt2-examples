# Nodejs User Server
Nodejs server die een api biedt voor functionaliteit rond users, studentenhuizen, maaltijden en deelnemers aan een maaltijd. Users kunnen zich registreren en een studentenhuis maken. Binnen een studentenhuis kan een maaltijd gemaakt worden. Andere users kunnen deelnemen aan een maaltijd. De app maakt gebruik van een MySQL database.

## Documentation
See the Swagger documentation at [our cloudserver](http://188.166.109.108:3000/api-docs/) and [localhost](http://localhost:3000/api-docs/).

## Requirements
- nodejs 
- MySql 

## Usage
- Fork this repo and clone your copy onto your local machine.
- Import the studentenhuis.sql script into your MySQL database.

Then run

```
npm install
npm start
```

For testing:
```
npm test
```

