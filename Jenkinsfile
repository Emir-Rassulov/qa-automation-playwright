pipeline {
    agent any

    environment {
        TEST_ENV = 'staging'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Emir-Rassulov/qa-automation-playwright.git'
            }
        }

        stage('Show environment') {
            steps {
                sh 'echo "Running tests against: $TEST_ENV"'
                sh 'echo "Build number is: $BUILD_NUMBER"'
                sh 'echo "Job name is: $JOB_NAME"'
            }
        }

        stage('Use a credential') {
            steps {
                withCredentials([string(credentialsId: 'demo-api-key', variable: 'API_KEY')]) {
                    sh 'echo "API key length is: ${#API_KEY} characters (value itself is hidden)"'
                }
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run tests') {
            steps {
                retry(2) {
                    sh 'npx playwright test --project=chromium'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            publishHTML(target: [
                reportName: 'Playwright Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true
            ])
        }
    }
}