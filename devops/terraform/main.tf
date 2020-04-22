provider "aws" {
  version = "~> 2.0"
  region = "eu-west-3"
}

data "aws_ami" "app_ami" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}

resource "aws_key_pair" "app_key" {
  key_name = "liquivote-key"
  public_key = file(var.ssh_public_key_file)
}

module "development" {
  source = "./application"

  instance_type = "t2.micro"
  instance_ami = data.aws_ami.app_ami.id
  instance_count = 2
  instance_key_name = aws_key_pair.app_key.key_name
  stage = "development"
}
