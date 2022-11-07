- kubectl create namespace react-docker
- kubectl config set-context --current --namespace=react-docker

- kubectl get namespaces
- kubectl apply -f deployment.yaml -n react-docker
- kubectl get deployment -w
- kubectl apply -f load-balancer.yaml
- kubectl get services -w
- minikube ip
- minikube service load-balancer --url

## SCALING DEMO
- kubectl scale deployment react-docker --replicas=10
- kubectl get deployment -w
- kubectl scale deployment react-docker --replicas=3
- kubectl get deployment -w

## CREATE EKS Cluster
- https://us-east-1.console.aws.amazon.com/eks/home?region=us-east-1#/cluster-create
- https://docs.aws.amazon.com/eks/latest/userguide/service_IAM_role.html#create-service-role

- aws sts get-caller-identity --profile eks_user
- aws eks update-kubeconfig --region us-east-1 --name Wishbliss --profile eks_user --role-arn arn:aws:iam::333427308013:role/eksClusterRole
- kubectl config view

