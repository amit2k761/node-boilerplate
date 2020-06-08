# Two modes

1- Run server
2- Create schematics

# Running server

**Development**

1-npm run dev (Creates a dist file)
2-npm run start (Runs a server)

**Production**

1-npm run build:prod (Creates a dist file)
2- Run start script with pm2

# Naming convention

1-File names should be small letter with -(hyphen) seperated
2-Class names should start with capital letters.
3-Objects of class should be camelcase.
4-Private/protected properties should start with 'underscore'

# Folder structure

1-**src/** is root
2-**api/** contains all the business logic with there respectives routes
3-**config/** defines all the environment configs like staging/prod/dev/test
4-**constants/** contains all project wide constants
5-**crons/** for defining all the cron jobs
6-**database/** for adding up migration scripts
7-**globals/** for adding globals
8-**lib/** contains project library to writing custom code which could be reusable.
9-**middleware/** for defining all the middlewares
10-**pre-server/** for defining and running pre server configs
11-**utils/** for defining utility functions
