terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region      = var.aws_region
  access_key  = var.aws_access_key
  secret_key  = var.aws_secret_key
}

resource "aws_security_group" "testing_security_group" {
  name        = "testing_security_group"
  description = "Security group for test environment"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "jenkins_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.ssh_key_name
  security_groups = [aws_security_group.testing_security_group.name]

  tags = {
    Name = "jenkins_server"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y fontconfig openjdk-17-jre
              sudo apt-get install -y wget
              sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
                https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
              echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
                https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
                /etc/apt/sources.list.d/jenkins.list > /dev/null
              sudo apt-get update
              sudo apt-get install -y jenkins
              sudo systemctl enable jenkins
              sudo systemctl start jenkins
              EOF
}

resource "aws_instance" "test_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.ssh_key_name
  security_groups = [aws_security_group.testing_security_group.name]

  tags = {
    Name = "test_server"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io
              sudo systemctl enable docker
              sudo systemctl start docker
              sudo usermod -aG docker ${var.ec2_user}
              EOF
}

output "jenkins_server_ip" {
  value = aws_instance.jenkins_server.public_ip
}

output "test_server_ip" {
  value = aws_instance.test_server.public_ip
}

output "test_server_dns" {
  value = aws_instance.test_server.public_dns
}

