docker compose build

cd account-service
kubectl apply -f ./account-service-deployment.yaml
cd..

cd api-gateway
kubectl apply -f ./api-gateway-deployment.yaml

kubectl apply -f ./mongo-deployment.yaml

kubectl apply -f ./rabbitmq-deployment.yaml
cd..

cd data-ingestor
kubectl apply -f ./data-ingestor-deployment.yaml
cd..

cd data-plotting
kubectl apply -f ./data-plotting-deployment.yaml
cd..

cd greetings-service
kubectl apply -f ./greetings-service-deployment.yaml
cd..

cd gui
kubectl apply -f ./gui-deployment.yaml
cd..