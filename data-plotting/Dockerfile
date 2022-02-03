# 
FROM python:3.8

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

#
RUN pip install numpy

#
RUN pip install netCDF4

#
RUN pip install scipy

#
RUN pip install arm-pyart

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./app /code/app

# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
