# Jenkins CI/CD Pipeline for Azure Function App

This project demonstrates an automated CI/CD pipeline using Jenkins to deploy a Node.js-based Azure Function App.

## Project Structure

```
A3-JENKINS-CI-CD-PIPELINE
│
├── src/functions/HttpTrigger.js        # Azure Function logic
├── tests/function.test.js              # Unit tests
├── Jenkinsfile                         # Jenkins CI/CD pipeline definition
├── package.json / package-lock.json    # Project metadata and dependencies
├── local.settings.json / host.json     # Azure Function configurations
├── .funcignore / .gitignore            # Ignore files for deployment and git
└── screenshots/                        # Evidence of each step in the pipeline
```

## Pipeline Stages

1. **Checkout** - Clones the GitHub repository.
2. **Install Dependencies** - Installs npm packages.
3. **Run Tests** - Runs automated unit tests using Jest.
4. **Package Function App** - Compresses the function files.
5. **Deploy to Azure** - Deploys using Azure CLI and Service Principal credentials.
6. **Post Actions** - Logs pipeline status (success or failure).

## Environment Configuration

Jenkins global credentials are used to securely store the following environment variables:
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

These are injected into the pipeline to authenticate Azure CLI.

## Function URL

Once deployed, the function is accessible via the Azure URL, example:
```
https://<your-function-name>.azurewebsites.net/api/HttpTrigger?code=***REDACTED***

```

## Screenshots

All key stages of the Jenkins CI/CD pipeline and Azure Function deployment are shown below:

### Azure Function App Created
![Azure Function App Created](screenshots/azure-function-app-created.png)

### Azure Function Resource Group
![Azure Function Resource Group](screenshots/azure-function-resource-group.png)

### Azure Code Editor
![Azure Code Editor](screenshots/azure-code-editor.png)

### Azure Test Run Output
![Azure Test Run Output](screenshots/azure-test-run-output.png)

### Jenkins Dashboard Pipeline Success
![Jenkins Dashboard Pipeline Success](screenshots/jenkins-dashboard-pipeline-success.png)

### Pipeline Success Overview
![Pipeline Success Overview](screenshots/pipeline-success-overview.png)

### Jenkins Stage Checkout
![Jenkins Stage Checkout](screenshots/jenkins-stage-checkout.png)

### Jenkins Stage Install Dependencies
![Jenkins Stage Install Dependencies](screenshots/jenkins-stage-install-dependencies.png)

### Jenkins Stage Run Tests
![Jenkins Stage Run Tests](screenshots/jenkins-stage-run-tests.png)

### Jenkins Stage Package Function
![Jenkins Stage Package Function](screenshots/jenkins-stage-package-function.png)

### Jenkins Stage Deploy To Azure
![Jenkins Stage Deploy To Azure](screenshots/jenkins-stage-deploy-to-azure.png)

### Jenkins Stage Verify Deployment
![Jenkins Stage Verify Deployment](screenshots/jenkins-stage-verify-deployment.png)

### Jenkins Environment Variable Config
![Jenkins Environment Variable Config](screenshots/jenkins-environment-variable-config.png)

### Browser Function Default Message
![Browser Function Default Message](screenshots/browser-function-default-message.png)

### Browser Function Response
![Browser Function Response](screenshots/browser-function-response.png)

## Outcome

- Azure Function deployed successfully and accessible via HTTP endpoint.
- Jenkins pipeline verified across all stages.

## Author

- Twinkle Mishra 
- 8894858
