echo "Pulling"
git pull

echo "Building app"
docker compose up -d --build