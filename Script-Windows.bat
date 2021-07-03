echo "Abrindo uma nova aba no seu navegador"
start "" "http://localhost:8000"
echo "Inicializando servidor Python"
python -m http.server 8000 --bind 127.0.0.1
