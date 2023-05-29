FROM python:3.10

ENV PYTHONUNBUFFERED=1 \
	PYTHONDONTWRITEBYTECODE=1

# Set the working directory to /app
WORKDIR /app

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
	&& curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list

RUN apt-get update && \
	ACCEPT_EULA=Y apt-get install -y msodbcsql18 \
	&& apt-get install -y unixodbc

COPY package_installations.txt .

RUN pip install --upgrade pip && \
	pip install --no-cache-dir -r package_installations.txt

COPY . .

EXPOSE 8000

# Start the Django development server
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
