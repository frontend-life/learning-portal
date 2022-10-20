# syntax=docker/dockerfile:1
FROM ubuntu:22.04

# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /server

# install app
COPY server .

RUN pip install -r ./requirements.txt

# final configuration
ENV FLASK_APP=main
EXPOSE 8000
CMD python3 main.py