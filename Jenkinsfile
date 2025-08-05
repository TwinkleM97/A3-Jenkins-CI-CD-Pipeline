pipeline {
    agent any

    environment {
        AZURE_FUNCTIONAPP_NAME = 'func-hello-twinkle-8894858'
        AZURE_RESOURCE_GROUP   = 'rg-jenkins-cicd-twinkle'
        AZURE_SUBSCRIPTION_ID  = '50cae124-78f4-44b5-b776-67084ff1a820'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'
                git url: 'https://github.com/TwinkleM97/A3-Jenkins-CI-CD-Pipeline.git', branch: 'main'
                echo '✅ Checkout completed!'
            }
        }

        stage('Build') {
            steps {
                dir('azure-function-jenkins-cicd') {
                    echo '🔧 Installing dependencies...'
                    bat 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('azure-function-jenkins-cicd') {
                    echo '🧪 Running unit tests...'
                    bat 'npm test'  // Make sure you have a "test" script in package.json
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                dir('azure-function-jenkins-cicd') {
                    echo '🚀 Deploying to Azure Function App...'
                    bat """
                        az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                        az account set --subscription %AZURE_SUBSCRIPTION_ID%
                        az functionapp deployment source config-zip --resource-group %AZURE_RESOURCE_GROUP% --name %AZURE_FUNCTIONAPP_NAME% --src function.zip
                    """
                }
            }
        }
    }

    post {
        always {
            echo '📦 Jenkins pipeline finished.'
        }
        success {
            echo '✅ SUCCESS: Everything went well!'
        }
        failure {
            echo '❌ FAILURE: Check the logs.'
        }
    }
}
