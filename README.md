# Team: Ampersand
Spring 2022 Project Team 

## This branch consists of 5 microservices.
<details>
           <summary>account-service</summary>
           <p>Contains google-authentication for user</p>
</details>
<details>
           <summary>greetings-service</summary>
           <p>Fetches username from google-authentication service</p>
</details>
<details>
           <summary>data-ingestor</summary>
           <p>Fetches URL from AWS</p>
</details>
<details>
           <summary>data-plotting</summary>
           <p>Plots the image from file</p>
</details>
<details>
           <summary>database</summary>
           <p>Keeps record of all user history</p>
</details>

Pre-requisites
- Docker Desktop (Download -> https://www.docker.com/products/docker-desktop)
- MongoDB (Download -> https://www.mongodb.com/try/download/community)

## Steps for deploying each service

1. Deploy account-service
    > cd account-service</br>
    > npm i</br>
    > npm start</br>

2. Deploy greetings-service.
    > cd greetings-service</br>
    > npm i</br>
    > npm start</br>

3. Deploy data-ingestor
    > cd data-ingestor</br>
    > docker build -t data-ingestor-image .</br>
    > docker run -d --name adscontainer1 -p 81:81 data-ingestor-image</br>

4. Deploy data-plotting
    > cd data-plotting</br>
    > docker build -t data-plotting-image .</br>
    > docker run -d --name adscontainer -p 82:82 data-plotting-image</br>

5. Deploy database
    - Open terminal: 
    > Type "mongod" </br>
    - If above command gives error follow the steps given below for Windows</br>
    >> create directory "data" in C drive</br>
    >> go inside "data" directory</br>
    >> create directory "db"</br>
    >> Run "mongod" command again</br>
    - Open another terminal</br>
    > cd database</br>
    > npm run devStart</br>
    
6. Deploy GUI
    > cd gui</br>
    > npm start</br>
