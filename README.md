
# Clockit CLI
> Clockit is an CLI tool to tracking work hours

## Commands
````
    $ clkit init    start cli, setting up database, configs, etc

    $ clkit in      start work for current day
    $ clkit lin     breaks for lunch
    $ clkit lout    returns to work after lunch
    $ clkit out     stops work for current day

    $ clkit status  summary of work for current day
    $ clkit help    summary of commands
     
````


### Roadmap
    - counts total hours worked per day
    - better summary per the day
    - summary per period
    - configure work hours per day
    - displays red/green when work hours on current day diverges from configuration
    - put confirmation on each clockin (you are clockin for lunch at 12:00, are you sure? yes/no) 
        - use -y/-f for force clockin without ask confirmation
    - overwrite any clockin already setted for the day
    - adds notes to day
    - export/import data (for backup/restore purpose)