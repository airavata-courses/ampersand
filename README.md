# Team ampersAND
Spring 2022 Project Team 

Team - 
1. Aditi Pednekar
2. Dhruti Patel
3. Nikhil Kamble

Data Ingestor (Create Docker image and add it to container) <br/>
cd data-ingestor <br/>
docker build -t data-ingestor-image . <br/>
docker run -d --name adscontainer1 -p 81:81 data-ingestor-image <br/>

Data Ingestor (without docker) <br/>
cd data-ingestor <br/>
pip install -r requirements.txt <br/>
python -m uvicorn app.data_ingestor:app --reload --port 81 <br/>
