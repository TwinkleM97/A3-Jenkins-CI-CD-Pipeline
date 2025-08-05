# Azure Function with Jenkins CI/CD Pipeline

This project demonstrates a complete CI/CD pipeline using Jenkins to deploy an Azure Function.

## Project Structure
- `HttpTrigger/` - Azure Function code
- `tests/` - Jest test files
- `Jenkinsfile` - Jenkins pipeline configuration
- `package.json` - Node.js dependencies

## Local Development
1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Start function locally: `npm start`

## CI/CD Pipeline
The Jenkins pipeline includes:
- Build: Install dependencies
- Test: Run automated tests
- Package: Create deployment zip
- Deploy: Deploy to Azure Functions