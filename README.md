# Team: Ampersand
Spring 2022 Project Team 

## This branch consists of 6 microservices. Click on the arrow for more information about each microservice
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
           <p>Plots the image from file written</p>
</details>
<details>
           <summary>radar-station</summary>
           <p>Gets the equivalent radar station code for the queried city</p>
</details>
<details>
           <summary>database</summary>
           <p>Keeps record of all user history. This service is also the API Gateway of our application. It redirects all the requests from the frontend to all other microservices and connects with DB to store and retrieve user history.</p>
</details>

Pre-requisites
- Docker Desktop (Download -> https://www.docker.com/products/docker-desktop)
- MongoDB (Download -> https://www.mongodb.com/try/download/community)

## Steps for deploying each service

1. Deploy account-service
    > cd account-service <br/>
    > npm i <br/>
    > npm start <br/>

2. Deploy greetings-service.
    > cd greetings-service <br/>
    > npm i <br/>
    > npm start <br/>

3. Deploy data-ingestor
    > cd data-ingestor <br/>
    > docker build -t data-ingestor-image . <br/>
    > docker run -d --name adscontainer1 -p 81:81 data-ingestor-image <br/>
    > **OR (to run without docker execute below 3 steps)** <br/>
    > cd data-ingestor <br/>
    > pip install -r requirements.txt <br/>
    > python -m uvicorn app.data_ingestor:app --reload --port 81 <br/>

4. Deploy data-plotting
    > cd data-plotting <br/>
    > docker build -t data-plotting-image .<br/>
    > docker run -d --name adscontainer -p 82:82 data-plotting-image <br/>
    > **OR (to run without docker execute below 3 steps)** <br/>
    > cd data-plotting <br/>
    > pip install -r requirements.txt  <br/>
    > python -m uvicorn app.main:app --reload --port 82 <br/>

5. Deploy radar-station
    > Download Eclipse <br/>
    > Open exisiting project (open the radar-station project that you just cloned) <br/>
    > Right click on Application.java file and select Run as Java application (it is in src->java->main->nexraddata->Application.java) <br/>
    > Now the microservice should be up and running on port 8080 <br/>

6. Deploy database
    - Open terminal: <br/>
    > Type "mongod" <br/>
    - If above command gives error follow the steps given below for Windows <br/>
    >> create directory "data" in C drive<br/>
    >> go inside "data" directory<br/>
    >> create directory "db"<br/>
    >> Run "mongod" command again<br/>
    - Open another terminal<br/>
    > cd database<br/>
    > npm i <br/>
    > npm run devStart<br/>
    
7. Deploy GUI
    > cd gui <br/>
    > npm i <br/>
    > npm start <br/>
