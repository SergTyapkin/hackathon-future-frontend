git fetch --all
git reset --hard "origin/$(. "docker-deploy/.env"; echo "$DEPLOY_BRANCH")"
echo "Deploying last commit:"
git log --oneline -1
cd docker-deploy || exit
docker compose down
docker compose up -d nginx --build
echo "Frontend updated successfully"
