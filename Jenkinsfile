pipeline {
    agent any
    
    environment {
        AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id')
        AZURE_CLIENT_ID = credentials('azure-client-id')
        AZURE_CLIENT_SECRET = credentials('azure-client-secret')
        AZURE_TENANT_ID = credentials('azure-tenant-id')
        RESOURCE_GROUP = 'rg-jenkins-cicd-[yourname]'
        FUNCTION_APP_NAME = 'func-hello-[yourname]-[studentid]'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo 'Building the application...'
                    sh 'npm install'
                    echo 'Build completed successfully!'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    echo 'Running automated tests...'
                    sh 'npm test'
                    echo 'All tests passed successfully!'
                }
            }
            post {
                always {
                    // Archive test results if needed
                    echo 'Test stage completed'
                }
            }
        }
        
        stage('Package') {
            steps {
                script {
                    echo 'Creating deployment package...'
                    sh '''
                        zip -r function-app.zip . -x "*.git*" "node_modules/.cache/*" "tests/*" "*.md"
                    '''
                    echo 'Package created successfully!'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying to Azure Functions...'
                    sh '''
                        # Login to Azure using Service Principal
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                        
                        # Set the subscription
                        az account set --subscription $AZURE_SUBSCRIPTION_ID
                        
                        # Deploy the function app
                        az functionapp deployment source config-zip \
                            --resource-group $RESOURCE_GROUP \
                            --name $FUNCTION_APP_NAME \
                            --src function-app.zip
                        
                        echo "Deployment completed successfully!"
                        echo "Function URL: https://$FUNCTION_APP_NAME.azurewebsites.net/api/HttpTrigger"
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            echo "Your function is available at: https://${env.FUNCTION_APP_NAME}.azurewebsites.net/api/HttpTrigger"
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}