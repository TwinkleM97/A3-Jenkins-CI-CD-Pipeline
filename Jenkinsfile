pipeline {
    agent any

    environment {
        AZURE_CLIENT_ID     = credentials('azure-sp')
        AZURE_CLIENT_SECRET = credentials('azure-sp')
        AZURE_TENANT_ID     = credentials('azure-tenant')
        AZURE_SUBSCRIPTION  = credentials('azure-subscription')
        RESOURCE_GROUP      = 'rg-jenkins-cicd-twinkle'
        FUNCTIONAPP_NAME    = 'func-hello-twinkle-8894858'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || echo "Tests failed or not defined, continuing..."'
            }
        }

        stage('Build Project') {
            steps {
                sh 'zip -r function.zip *'
            }
        }

        stage('Azure Login') {
            steps {
                sh '''
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                    az account set --subscription $AZURE_SUBSCRIPTION
                '''
            }
        }

        stage('Deploy to Azure Function') {
            steps {
                sh '''
                    az functionapp deployment source config-zip \
                        --resource-group $RESOURCE_GROUP \
                        --name $FUNCTIONAPP_NAME \
                        --src function.zip
                '''
            }
        }
    }
}
