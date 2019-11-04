# By-Tor's NC NEWS

A basic news article API built using Node.js, Express, Postgress and Knex. This API was built as a means to test my fundamental backend knowledge.

## Hosted @:

https://by-tor2114-nc-news.herokuapp.com/api

## Getting Stared

1. #### In order to successfully run this app on a local machine, please install all necessary dependencies with the following:

```
npm i
```

2. #### With dependencies installed, the databases must be initialised with the following:

```
npm run setup-dbs
```

3. #### The databses must then be set to the latest migration by running the following:

```
npm run migrate-latest
```

4. #### If you need to roll back to the initialised version of the database, please run:

```
npm run migrate-rollback
```

5. #### In the event that changes have been made that have caused the migrations to go out of sync, the database can be set back to it's original setup by running the command from step 2:

```
npm run setup-dbs
```

6. #### With the database set up, it now needs to be seeded with the following command:

```
npm run seed
```

7. #### The server can now be started on port 9090 with:

```
npm run start
```

8. #### With the server now live, a GET request to /api will produce a JSON file with a break down of which endpoints are available, as well as which methods an be used.
