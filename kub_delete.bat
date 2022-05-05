cd account-service
kubectl delete -f ./account-service-deployment.yaml
cd..

cd api-gateway
kubectl delete -f ./api-gateway-deployment.yaml

kubectl delete -f ./mongo-deployment.yaml

kubectl delete -f ./rabbitmq-deployment.yaml
cd..

cd data-ingestor
kubectl delete -f ./data-ingestor-deployment.yaml
cd..

cd data-plotting
kubectl delete -f ./data-plotting-deployment.yaml
cd..

cd greetings-service
kubectl delete -f ./greetings-service-deployment.yaml
cd..

cd gui
kubectl delete -f ./gui-deployment.yaml
cd..

docker rmi -f account-service
docker rmi -f api-gateway
docker rmi -f mongo
docker rmi -f rabbitmq
docker rmi -f data-ingestor
docker rmi -f data-plotting
docker rmi -f greetings-service
docker rmi -f gui
