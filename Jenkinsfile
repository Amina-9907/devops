pipeline {
    agent any
   
    environment {
        APP_NAME= "react-project"
        OPENSHIFT_PROJECT = 'devops'
        IMAGE_NAME= "guest-platfrom"
        DOCKER_USER= "mina0423"
        OC_SERVER= "https://api.ocp.heritage.africa:6443"
    }

    stages {

        stage('Install dependencies') {
            steps {
                echo " installer les dependances"
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo "${params.ENV} est là !!!!!"
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
        // stage('build image ') {
        //     steps {
        //         script {
        //             // def imageTag= "$DOCKER_USER/$IMAGE_NAME:v${env.BUILD_NUMBER}"
        //             // sh "docker build -t ${imageTag} ."
        //             oc new-app registry.access.redhat.com/ubi8/nodejs-18~https://github.com/Amina-9907/devops.git --name=guest-platform

        //         }
        //     }
        // }
        // stage('push image') {
        //     steps {
        //        withCredentials([usernamePassword(credentialsId: 'docker_registry', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
        //             script {
        //                  def imageTag= "$DOCKER_USER/$IMAGE_NAME:v${env.BUILD_NUMBER}"
        //                  sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
        //                  sh "docker push ${imageTag}"
        //             }
        //        }
        //     }
        // }

        // stage('Pull image docker') {
        //      steps {
        //          script {
        //              def imageTag= "$DOCKER_USER/$IMAGE_NAME:v${env.BUILD_NUMBER}"
        //              sh 'docker pull   ${imageTag} || echo "Image non trouvée "'
        //         }
        //     }
        //  } 

        
        // stage('run container Docker') {
        //      steps {
        //          script {
        //              sh 'docker stop react_project || true'
        //              sh 'docker rm react_project || true'
        //              sh 'docker run -d --name react_project -p 3000:80 mina0423/react_project:v1'
        //          }
        //      }
        //  }
        
        stage('Login to OpenShift') {
             steps {
                 withCredentials([string(credentialsId: 'openshift-token', variable: 'TOKEN')]) {
                     sh "oc login --token=$TOKEN --server=$OC_SERVER "
                     // sh "oc apply -f secret-serviceaccount-token.yaml"
 
                    // oc project $OPENSHIFT_PROJECT
                     
                 }
             }
         }

         stage('Deploy to openshift') {
            steps {
                sh 'oc project $OPENSHIFT_PROJECT'
                // sh "sed -i 's|image: .*|image: ${DOCKER_USER}/${IMAGE_NAME}:v${env.BUILD_NUMBER}|' deployment.yaml"
                // sh "oc apply -f deployment.yaml"
                //sh 'oc delete bc guest-platform'

                sh 'oc new-app openshift/nodejs:18-ubi9~https://github.com/sclorg/nodejs-ex.git --name=guest-platform'
                sh 'oc expose service guest-platform'
                sh 'oc get route'

            }
        }
               
    }

}
