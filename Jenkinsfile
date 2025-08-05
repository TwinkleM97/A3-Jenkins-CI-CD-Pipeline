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
                    bat 'npm install'
                    echo 'Build completed successfully!'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed (till Build stage)'
        }
    }
}
