# Team ampersAND
Spring 2022 Project Team 

Team - 
1. Aditi Pednekar
2. Dhruti Patel
3. Nikhil Kamble

Data Ingestor (Create Docker image and add it to container)
docker build -t data-ingestor-image .
docker run -d --name adscontainer1 -p 81:81 data-ingestor-image

Data Ingestor (without docker)
pip install -r requirements.txt
python -m uvicorn app.data_ingestor:app --reload --port 81
