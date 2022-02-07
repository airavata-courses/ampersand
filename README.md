# Team ampersAND
Spring 2022 Project Team 

Team - 
1. Aditi Pednekar
2. Dhruti Patel
3. Nikhil Kamble

Data Plotting (Create docker image and add it to container)

docker build -t data-plotting-image .

docker run -d --name adscontainer -p 82:82 data-plotting-image


Data Plotting (without docker)

pip install -r requirements.txt

python -m uvicorn app.main:app --reload --port 82
