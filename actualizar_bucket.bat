#!/bin/bash
LOCAL_PATH="C:\cristsoft\hosanna_landing_page\index.html" # Asegúrate de que termine con /
BUCKET_NAME="https://storage.cloud.google.com/hosanna_web/index.html"

echo "Sincronizando archivos a gs://${BUCKET_NAME}/..."
gsutil rsync -r -d "${LOCAL_PATH}" "gs://${BUCKET_NAME}/"
echo "Sincronización completa."