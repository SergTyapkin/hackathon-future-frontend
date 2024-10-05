cd docker-deploy || exit
docker compose down
docker compose up -d nginx-certbot
docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d "$(DOMAIN_URL)"
sudo chmod ugo+rwx -R ./certbot/
