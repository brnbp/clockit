
# Clockit CLI
> Clockit is an CLI tool to tracking work hours

- [Installation](#installing)
- [Configuration](#configuration)
- [Commands](#commands)
- [Road Map](#roadmap)


### Installing
```
 $ git clone git@github.com:brnbp/clockit.git
```


### Configuration:
 #### 1. Rename .env.example file to .env and fulfill the following things:
    - WORK_HOURS_PER_DAY    = quantity of hours worked per day


 #### 2. Install dependencies:
  ````
    $ yarn 
    or
    $ npm install
  ````

 #### 3. Make sure that the file called `robot` is executable:
  ````
   $ chmod +x ./bin/clkit
  ````


## Commands
````
    $ clkit init    start cli, setting up database, configs, etc

    $ clkit in      start work for current day
    $ clkit lin     breaks for lunch
    $ clkit lout    returns to work after lunch
    $ clkit out     stops work for current day

    $ clkit status  summary of work for current day

    $ clkit clear   clear all clocks from current day

    $ clkit help    summary of commands
     
````


### Roadmap
    - summary per period
    - displays red/green when work hours on current day diverges from configuration
    - put confirmation on each clockin (you are clockin for lunch at 12:00, are you sure? yes/no) 
        - use -y/-f for force clockin without ask confirmation
    - overwrite any clockin already setted for the day
    - adds notes to day
    - export/import data (for backup/restore purpose)