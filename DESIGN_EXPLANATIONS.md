# Design Explanations

## Setup

### Infrastructure

Terraform IaC code is included in the terraform directory within the repo, for spinning 2 different environments (EC2 instances), along with the necessary networking and port considerations:

1. Jenkins server
   The Jenkins server is installed with Jenkins and it's dependencies during provision, using an included userdata, Once provisioned the server automatically has Jenkins running on it and ready to be used.

2. Test Environment:
   The test server also has a userdata script to installed docker on it during provisioning, this way once provision, Docker is up and running and we can deploy our application ready to be tested.

### Application code

The application being deployed is a React web Application which I wrote some time ago, the application is contained in the app directory within the project, along with the dependencies, assets, unit tests and Dockerfile to build the application into a microservice.

### CI/CD Pipeline

The pipeline is scripted with a Jenkinsfile present in the repository with the following stages:

1. Git Checkout - clones the code from git for every push.
2. Unit Tests - runs unit test on the source code for functionality, code quality and type safety.
3. Build Docker Image - build the application code into a Docker image.
4. Push Image to docker registry - pushes the image built in stage 3 into a DockerHub repository.
5. Deploy to Test Server - pulls the image from the repository and deploys it into the Test server.

### Git Integration

The Jenkins pipeline is integrated with the GitHub repo using a webhook, once changes are pushed to the repo, Jenkins runs a job with the latest changes.

# Instructions to run the project.

### 1. Set up Environments.

Spin up Jenkins server and Test server using `terraform apply` command, it is required to pass `aws_access_key`, `aws_secret_key`, and `ssh_key_name` as runtime variables, optionally `ami_id`, `instance_type`, `ec2_user` and `aws_region` can be passed as desired, if not supplied, terraform will provision ubuntu 22.0, t2.medium, with ubuntu as the user in the ca-central-1 region by default.

Example command:
`terraform plan -var 'aws_access_key=XXXXXXXXXXXXXXXXXXX' -var 'aws_secret_key=ghsgnsggsbdgbdgdjyujsshjsjs' -var 'key_name=my_key'`

Once deployment is complete, terraform will output the public IP addresses and DNS for the Jenkins server and Test server.

### 2. Jenkinsfile

Edit the Jenkinsfile to add the public IP for the Test server and the username for Dockerhub repository.

### 3. Set up CI/CD Pipeline.

Complete Jenkins setup by loading the Jenkins server public IP on port 8080 on a browser, install all recommended plugins, login with the admin password for the first time (ssh into the Jenkins using the key pair specified during provisioning to get admin password at `/var/lib/jenkins/secrets/initialAdminPassword`), then create an account with your own username and password for looging into Jenkins subsequently (an already existing Jenkins server can be used and this step can be skipped).

Install the following plugins/tools needed for jenkins workspace

- Node JS
- Docker and Docker pipeline

Tools required

- Node 21.5.0

These plugins and tools must be install on jenkins to run the pipeline successfully.

Create a Jenkins Pipeline with the Jenkinsfile in the GitHub repository.

Activated GitHub hook trigger for GITScm polling under Build Triggers.

Define Pipeline script from Git SCM, supplying the GitHub URL https://github.com/kenneth-alt/eavor-project as the Repository URL, building from the main branch and indicating Jenkinsfile for Script Path

### 4. Set up Git Integration.

A GitHub webhook for the jenkins can be set up on the GitHub repo by using the payload URL in the following format:
https:<jenkins_server_ip>:<jenkins_port>/github-webhook/

This setup would enable jenkins to run a job with the latest changes every time new code is pushed to the github repo.

### 5. Running the Application

Once the pipeline runs successfully, the application can be viewed using the public IP or DNS of the Test server. SSH access to this server is also available using the public IP and the key file specified during provisioning.

## Security and Industry Best Practices Considerations

- DockerHub repository credentials are stored as Jenkins credentials and safely injected into the pipelines.
- SSH key for accessing the Test server is also stored and used as Jenkins credentials.
- Only the necessary ports are opened in the environments and network access is controlled using AWS security group rules.

## Other Considerations

This is a minimalistic setup, while it meets the requirement of the assignment, there are improvements that could be made, like leveraging AWS role assignments for Jenkins server and deployments, avoiding the user of AWS credentials.
