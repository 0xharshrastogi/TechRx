FROM python:3.10

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file into the container
COPY package_installations.txt .
RUN pip install --upgrade pip
RUN pip install django-cors-headers
RUN pip install PyJWT
RUN pip install pyodbc
RUN pip install django_extensions
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r package_installations.txt

# Copy the rest of the application code into the container
COPY . .

# Set environment variables for Django
ENV PYTHONUNBUFFERED=1
ENV DJANGO_ENV=production

RUN mkdir shared

# Expose port 8000 for the Django app
EXPOSE 8000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
