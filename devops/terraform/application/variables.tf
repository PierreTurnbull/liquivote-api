 
variable "instance_type" {
  type = string
  description = "Instance type"
}

variable "instance_ami" {
  type = string
  description = "AMI to use for instances"
}

variable "instance_count" {
  type = number
  description = "Number of instances to deploy"
}

variable "instance_key_name" {
  type = string
  description = "Key name"
}

variable "stage" {
  type = string
  description = "Stage in which application is deployed"
}