pipeline {
    agent any
   
    
    stages {

        stage('Install dependencies') {
            steps {
                echo " installer les dependances"
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo " Build de l'application"
                sh 'npm run build'
            }
        }

        // stage('test') {
        //     steps {
        //         echo " Execution des tests "
        //         sh 'npm test'
        //     }
        // }

       
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    script {
                        def scannerHome = tool 'SonarScanner'
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        
       
        stage('Login to OpenShift') {
             steps {
                 withCredentials([string(credentialsId: 'openshift-token', variable: 'TOKEN')]) {
                     sh "oc login --token=$TOKEN --server=https://api.ocp.heritage.africa:6443 "
                     
                 }
             }
             
         }

        //  stage('Deploy to openshift') {
        //       steps {
        //           sh 'oc project $OPENSHIFT_PROJECT'
        //           sh 'oc delete app=guest-platform'
        //           sh 'oc new-app openshift/nodejs:18-ubi9~https://github.com/Amina-9907/devops.git --name=guest-platform'
        //           sh 'oc expose service guest-platform'
        //           sh 'oc get route'

        //      }
        // }
        stage('update app'){
            steps{
                sh 'oc start-build guest-platform'
            }
        }
    }

}
