FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get purge -y --auto-remove gcc \
    && rm -rf /var/lib/apt/lists/* \

COPY . .

ENV PYTHONUNBUFFERED=1
CMD ["python", "main.py"]