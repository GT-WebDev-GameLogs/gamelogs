# PostgreSQL Database Setup
## Installing PostgreSQL
Download PostgreSQL locally [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). I am using version 16, but installing the latest version (17 at the time of writing this) should be alright.

## Creating the Database
After installing, you should be able to run the command `createdb gamelogs`, which creates a local database named `gamelogs`. If this error occurs, installation may not have worked properly, restarting your machine may be required, and/or run `psql` first to open the psql shell and run the command again. If there are issues, follow the steps on the [official getting started tutorial](https://www.postgresql.org/docs/current/tutorial-createdb.html).

## Initializing Database Schema
There is a script inside `gamelogs-server/db/scripts` named `init_schema.sql`. Running this with the command `psql -U <your_machine_user> -d gamelogs -a -f .\gamelogs-server\db\scripts\init_schema.sql` should initialize all the tables, domains, functions, etc.
Modify the name of your machine user accordingly (which you can find by running `psql` to get into the psql shell and then `\l` to list the databases and relevant info). Also modify the path of the sql script file if needed (the above path is assuming you are running it from the project root directory).

## Initializing Database Data
There is a script inside `gamelogs-server/db/scripts` named `init_data.sql`. Running this with the command `psql -U <your_machine_user> -d gamelogs -a -f .\gamelogs-server\db\scripts\init_data.sql` should initialize sample data for the tables defined in the previous step.
Again, you will need to modify the machine user name and also maybe the path of the sql script file.

## Verify Installation and Setup
To ensure that your database was set up correctly, run pgAdmin 4 (program should have installed with your installation of postgres). From there, navigate to Databases -> gamelogs -> Schemas -> public -> Tables. You can check the data/structure of the tables by right clicking on it, and selecting `View/Edit Data`. Notably for the `game` table, you should see 2 entries with a rating that should be the average of the corresponding reviews. Feel free to also check the other tables, domains, triggers, functions, etc. to ensure set up was done properly.
