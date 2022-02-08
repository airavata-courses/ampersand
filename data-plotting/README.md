# Team ampersAND
Spring 2022 Project Team 

Team - 
1. Aditi Pednekar
2. Dhruti Patel
3. Nikhil Kamble

Data Plotting (Create docker image and add it to container) <br/>
docker build -t data-plotting-image . <br/>
docker run -d --name adscontainer -p 82:82 data-plotting-image <br/>

Data Plotting (without docker) <br/>
pip install -r requirements.txt  <br/>
python -m uvicorn app.main:app --reload --port 82 <br/>
