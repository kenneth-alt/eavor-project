pipeline {
  agent any

  environment {
    TEST_SERVER_IP = '35.182.74.38' // Replace with public IP of test server after spinning up
    DOCKERHUB_REPO = 'kennethalt99' // Replace with dockerhub username.
    APP_IMAGE_NAME = 'magic-cards'
    TAG = "${BUILD_ID}"
  }

  stages {
    stage('Unit Tests') {
      steps {
        nodejs('Node-21.5') {
          dir('app') {
            script {
              sh 'npm install'
              sh 'npm test'
            }
          }
        }
      }
    }

    stage('Build App Image') {
      steps {
        dir('app') {
          script {
            docker.build("${DOCKERHUB_REPO}/${APP_IMAGE_NAME}:${TAG}")
          }
        } 
      }
    }

    stage('Push Image to docker registry') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-password') {
            docker.image("${DOCKERHUB_REPO}/${APP_IMAGE_NAME}:${TAG}").push()
          }
        }
      }
    }

    stage('Deploy to Test Server') {
      steps {
        script {
          withCredentials([sshUserPrivateKey(credentialsId: 'TEST_SERVER_SSH_KEY', keyFileVariable: 'SSH_KEY', usernameVariable: 'EC2_USER')]) {
            sh """
            ssh -i $SSH_KEY -o StrictHostKeyChecking=no $EC2_USER@$TEST_SERVER_IP \\
            'docker stop ${APP_IMAGE_NAME} || true && \\
            docker rm -f ${APP_IMAGE_NAME} || true && \\
            docker pull ${DOCKERHUB_REPO}/${APP_IMAGE_NAME}:${TAG} && \\
            docker run --name ${APP_IMAGE_NAME} -d -p 80:80 ${DOCKERHUB_REPO}/${APP_IMAGE_NAME}:${TAG}'
            """
          }
        }
      }
    }
  }      
}
