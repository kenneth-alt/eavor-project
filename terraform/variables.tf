variable "aws_region" {
  description = "AWS region"
  default     = "ca-central-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.medium"
}

variable "ec2_user" {
  description = "Preffered user for Test server Instance"
  default     = "ubuntu"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  default     = "ami-05d4121edd74a9f06"
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair to use for accessing the EC2 instance"
}

variable "aws_access_key" {
  description = "AWS Access Key ID"
}

variable "aws_secret_key" {
  description = "AWS Secret Access Key"
}
