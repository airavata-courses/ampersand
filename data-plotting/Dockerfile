# 
FROM python:3.9.10

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

#
RUN pip3 install numpy

#
RUN pip3 install netCDF4

#
RUN pip3 install scipy

#
RUN pip3 install arm-pyart

# 
RUN pip3 install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./app /code/app

# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "82"]
