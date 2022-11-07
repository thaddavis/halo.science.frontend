# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

https://tailwindcss.com/docs/guides/create-react-app

## Kubernetes

- Run docker daemon
- minikube start
- https://blog.logrocket.com/deploy-react-app-kubernetes-using-docker/
- npm run build
- docker build -t thaddavis/react-docker:v11 .
- docker run -d -p 3000:80 thaddavis/react-docker
- docker push thaddavis/react-docker:v11

- kubectl apply -f deployment.yaml


- docker build -t thaddavis/react-docker:v23 .
- docker push thaddavis/react-docker:v23
