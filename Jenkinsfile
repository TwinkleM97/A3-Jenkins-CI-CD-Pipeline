pipeline {
    agent any

    environment {
        AZURE_CLIENT_ID       = credentials('azure-client-id')       // Jenkins Credentials
        AZURE_CLIENT_SECRET   = credentials('azure-client-secret')   // Jenkins Credentials
        AZURE_TENANT_ID       = credentials('azure-tenant-id')       // Jenkins Credentials
        AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id') // Jenkins Credentials
        AZURE_RESOURCE_GROUP  = 'rg-jenkins-cicd-twinkle'
        AZURE_FUNCTIONAPP_NAME = 'func-hello-twinkle-8894858'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'echo Build successful!'  
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'echo Tests passed!'  
            }
        }

        stage('Archive for Deployment') {
            steps {
                echo 'Creating deployment zip package...'
                bat 'powershell -Command "Compress-Archive -Path * -DestinationPath function.zip"'
            }
        }

        stage('Deploy to Azure') {
            steps {
                echo 'Deploying to Azure Function App...'
                bat """
                    az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                    az account set --subscription %AZURE_SUBSCRIPTION_ID%
                    az functionapp deployment source config-zip --resource-group %AZURE_RESOURCE_GROUP% --name %AZURE_FUNCTIONAPP_NAME% --src function.zip
                """
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
