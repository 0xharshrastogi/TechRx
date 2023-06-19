FROM rasa/rasa:latest

WORKDIR /app

COPY . /app

RUN pip install pip
RUN pip install -r requirements-linux.txt

CMD ["run", "--enable-api", "--cors", "*", "--debug"]
