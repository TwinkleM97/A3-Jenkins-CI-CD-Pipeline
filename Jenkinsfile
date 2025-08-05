pipeline {
    agent any

    environment {
        // Azure Function App Config
        AZURE_FUNCTIONAPP_NAME = 'func-hello-twinkle-8894858'
        AZURE_RESOURCE_GROUP   = 'rg-jenkins-cicd-twinkle'

        // Secrets injected from Jenkins Credentials (must exist!)
        AZURE_CLIENT_ID     = credentials('AZURE_CLIENT_ID')
        AZURE_CLIENT_SECRET = credentials('AZURE_CLIENT_SECRET')
        AZURE_TENANT_ID     = credentials('AZURE_TENANT_ID')
        AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id')
    }

    stages {
        stage('Checkout') {
            steps {
                echo ' Checking out code from GitHub...'
                git url: 'https://github.com/TwinkleM97/A3-Jenkins-CI-CD-Pipeline.git', branch: 'main'
                echo ' Checkout completed.'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('azure-function-jenkins-cicd') {
                    echo ' Installing Node.js dependencies...'
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('azure-function-jenkins-cicd') {
                    echo ' Running tests...'
                    bat 'npm test'
                }
            }
        }

        stage('Create Deployment Package') {
            steps {
                dir('azure-function-jenkins-cicd') {
                    echo ' Creating zip package for deployment...'
                    bat 'powershell -Command "Compress-Archive -Path * -DestinationPath function.zip -Force"'
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                dir('azure-function-jenkins-cicd') {
                    echo ' Deploying to Azure Function App...'
                    bat """
                        az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                        az account set --subscription %AZURE_SUBSCRIPTION_ID%
                        az functionapp deployment source config-zip ^
                            --resource-group %AZURE_RESOURCE_GROUP% ^
                            --name %AZURE_FUNCTIONAPP_NAME% ^
                            --src function.zip
                    """
                }
            }
        }
    }

    post {
        always {
            echo '📋 Jenkins pipeline execution completed.'
        }
        success {
            echo '✅ SUCCESS: Azure Function deployed successfully!'
        }
        failure {
            echo '❌ FAILURE: Deployment failed. Check Jenkins logs.'
        }
    }
}
