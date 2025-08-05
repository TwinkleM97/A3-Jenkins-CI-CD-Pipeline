pipeline {
    agent any

    environment {
        // Azure Function App Config
        AZURE_FUNCTIONAPP_NAME = 'func-hello-twinkle-8894858'
        AZURE_RESOURCE_GROUP   = 'rg-jenkins-cicd-twinkle'

        // Secrets from Jenkins Credentials
        AZURE_CLIENT_ID       = credentials('AZURE_CLIENT_ID')
        AZURE_CLIENT_SECRET   = credentials('AZURE_CLIENT_SECRET')
        AZURE_TENANT_ID       = credentials('AZURE_TENANT_ID')
        AZURE_SUBSCRIPTION_ID = credentials('AZURE_SUBSCRIPTION_ID')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Cloning repository...'
                git url: 'https://github.com/TwinkleM97/A3-Jenkins-CI-CD-Pipeline.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running unit tests...'
                sh 'npm test'
            }
        }

        stage('Package Function App') {
            steps {
                echo '📦 Zipping project for deployment...'
                sh 'zip -r function.zip *'
            }
        }

        stage('Deploy to Azure Function') {
            steps {
                echo '🚀 Deploying to Azure...'
                sh '''
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                    az account set --subscription $AZURE_SUBSCRIPTION_ID
                    az functionapp deployment source config-zip \
                        --resource-group $AZURE_RESOURCE_GROUP \
                        --name $AZURE_FUNCTIONAPP_NAME \
                        --src function.zip
                '''
            }
        }
    }

    post {
        always {
            echo '📋 Pipeline execution finished.'
        }
        success {
            echo '✅ SUCCESS: Function deployed to Azure!'
        }
        failure {
            echo '❌ FAILURE: Something went wrong.'
        }
    }
}
