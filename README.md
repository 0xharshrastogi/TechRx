# TechRx

## Setup

1. ### install recommended extensions

   - open extension tab from activity bar
   - install recommended extensions

## Setting up docker configuration

- inside `env` folder, create `[development|production].env` file
- insert relevant values for env file
- copy paste from below

```env
MSSQL_SA_PASSWORD=yourStrong(!)Password
```

## Setup editor settings

- create a file `settings.json` inside `.vscode` folder
- insert the following settings

```json
{
	"eslint.workingDirectories": ["ui/web-portal"]
}
```

## Database configuration

1. Microsoft SQL Server

   - Server Name : `localhost`
   - Authentication: SQL Server Authentication
   - Username : sa
   - Password: <your_strong_password>
