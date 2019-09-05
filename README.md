# UDC 2019 Hackathon with Luniverse

## In Time


### Stacks
#### Back-End
- Luniverse Blockchain & API Gateway
- Ruby 2.6.3
- Rails 5.2.3
- Puma 3.12.1
- PostgreSQL 11.4

#### Front-End
- React 16.9.0
- D3.js 5.11.0
- Ant Design 3.22.2
- GSAP 2.1.3

### API Document
https://documenter.getpostman.com/view/1531741/SVfTMS43

### Dev Setup
#### Database
```bash
#!/bin/bash
PG_DBNAME=intime
PG_UNAME=intime
psql -d postgres -c "CREATE USER $PG_UNAME;"
psql -d postgres -c "ALTER USER $PG_UNAME CREATEDB;"
psql -d postgres -c "ALTER USER $PG_UNAME WITH SUPERUSER;"

rake db:create db:migrate db:seed
```

#### Packages
```bash
cd api && bundle install
cd web && yarn install
```

### Run
```
cd api && rails start
```

### LICENSE
MIT License