 
resource "aws_instance" "application" {
  ami           = var.instance_ami
  instance_type = var.instance_type
  key_name      = var.instance_key_name
  count         = var.instance_count
  security_groups = [aws_security_group.application_security_group.name]

  tags = {
    Name = "${var.stage}-liquivote"
  }
}

resource "aws_security_group" "application_security_group" {
  name        = "${var.stage}-application"

  ingress {
    description = "SSH access"
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "API HTTP access"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.stage}-liquivote-app"
  }
}

resource "aws_security_group" "redis_security_group" {
  name        = "${var.stage}-redis"

  ingress {
    description = "Redis"
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    security_groups = [aws_security_group.application_security_group.id]
  }

  tags = {
    Name = "${var.stage}-liquivote-redis"
  }
}

resource "aws_elb" "application" {
  name               = "${var.stage}-app-elb"
  availability_zones = ["eu-west-2a"]

  listener {
    instance_port     = 8080
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:3000/healthcheck"
    interval            = 30
  }

  instances                   = aws_instance.application.*.id
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400

  tags = {
    Name = "${var.stage}-liquivote"
  }
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "${var.stage}-liquivote"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "3.2.10"
  port                 = 6379
  security_group_ids = [aws_security_group.redis_security_group.id]
}