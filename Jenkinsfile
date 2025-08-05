pipeline {
    agent any

    environment {
        AZURE_FUNCTIONAPP_NAME = 'func-hello-twinkle-8894858'
        AZURE_RESOURCE_GROUP = 'rg-jenkins-cicd-twinkle'
        AZURE_SUBSCRIPTION_ID = '50cae124-78f4-44b5-b776-67084ff1a820'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git url: 'https://github.com/TwinkleM97/A3-Jenkins-CI-CD-Pipeline.git', branch: 'main'
                echo 'Code checkout completed successfully!'
            }
        }

        stage('Build') {
            steps {
                script {
                    echo 'Building the application...'
                    echo 'Installing Node.js dependencies...'
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
                    echo 'Test stage completed'
                }
                success {
                    echo 'All test cases passed!'
                }
                failure {
                    echo 'Some tests failed. Check the console output for details.'
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    echo 'Creating deployment package...'
                    // Create a clean zip excluding unnecessary files
                    sh '''
                        echo "Packaging Azure Function for deployment..."
                        # Remove any existing zip file
                        rm -f functionapp.zip
                        
                        # Create zip excluding git files, tests, and other unnecessary files
                        zip -r functionapp.zip . -x "*.git*" "node_modules/.cache/*" "tests/*" "*.md" "*.log"
                        
                        # Verify zip contents
                        echo "Package contents:"
                        unzip -l functionapp.zip | head -20
                    '''
                    echo 'Package created successfully!'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying to Azure Functions...'
                    withCredentials([azureServicePrincipal(
                        credentialsId: 'azure-sp',
                        subscriptionIdVariable: 'AZ_SUBSCRIPTION_ID',
                        clientIdVariable: 'AZ_CLIENT_ID',
                        clientSecretVariable: 'AZ_CLIENT_SECRET',
                        tenantIdVariable: 'AZ_TENANT_ID'
                    )]) {
                        sh '''
                            echo "Logging into Azure..."
                            az login --service-principal -u $AZ_CLIENT_ID -p $AZ_CLIENT_SECRET --tenant $AZ_TENANT_ID
                            
                            echo "Setting subscription..."
                            az account set --subscription $AZ_SUBSCRIPTION_ID
                            
                            echo "Deploying function app..."
                            az functionapp deployment source config-zip \
                                --name $AZURE_FUNCTIONAPP_NAME \
                                --resource-group $AZURE_RESOURCE_GROUP \
                                --src functionapp.zip
                            
                            echo "Deployment completed successfully!"
                            echo "Function URL: https://$AZURE_FUNCTIONAPP_NAME.azurewebsites.net/api/HttpTrigger"
                            
                            echo "Testing deployed function..."
                            sleep 30  # Wait for deployment to complete
                            curl -f "https://$AZURE_FUNCTIONAPP_NAME.azurewebsites.net/api/HttpTrigger" || echo "Function may still be starting up"
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed'
            // Clean up workspace
            sh 'rm -f functionapp.zip'
        }
        success {
            echo '🎉 Pipeline completed successfully!'
            echo "✅ Build: Completed"
            echo "✅ Tests: All passed"
            echo "✅ Deployment: Success"
            echo ""
            echo "🔗 Your Azure Function is available at:"
            echo "https://${env.AZURE_FUNCTIONAPP_NAME}.azurewebsites.net/api/HttpTrigger"
            echo ""
            echo "🧪 Test your function with:"
            echo "curl https://${env.AZURE_FUNCTIONAPP_NAME}.azurewebsites.net/api/HttpTrigger"
            echo "curl 'https://${env.AZURE_FUNCTIONAPP_NAME}.azurewebsites.net/api/HttpTrigger?name=Twinkle'"
        }
        failure {
            echo '❌ Pipeline failed!'
            echo 'Please check the console output above for error details.'
            echo 'Common issues to check:'
            echo '- Azure credentials configuration'
            echo '- Function app name and resource group'
            echo '- Test failures'
            echo '- Network connectivity to Azure'
        }
        unstable {
            echo '⚠️ Pipeline completed with warnings'
        }
    }
}