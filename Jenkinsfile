pipeline {
    agent any

    parameters {
        choice(name: 'TEST_SUITE', choices: ['smoke', 'regression'], description: 'Which suite to run')
    }

    environment {
        TEST_ENV = 'staging'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Emir-Rassulov/qa-automation-playwright.git'
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
                script {
                    if (params.TEST_SUITE == 'smoke') {
                        sh 'npx playwright test --project=chromium --grep @smoke'
                    } else {
                        sh 'npx playwright test --project=chromium'
                    }
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