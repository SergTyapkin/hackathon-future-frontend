-include ./docker-deploy/.env


build:
	echo "[Make]: Running 'build' target in Makefile..." && \
	cd docker-deploy && \
	docker compose build --no-cache --progress=plain nginx
run:
	echo "[Make]: Running 'run' target in Makefile..." && \
	cd docker-deploy && \
	docker compose down && \
	docker compose up -d nginx
down:
	echo "[Make]: Running 'down' target in Makefile..." && \
	cd docker-deploy && \
	docker compose down

generate-certs:
	echo "[Make]: Running 'generate-certs' target in Makefile..." && \
	bash ./docker-deploy/scripts/generate-certs.sh
renew-certs:
	echo "[Make]: Running 'renew-certs' target in Makefile..." && \
	cd docker-deploy && \
	docker compose run --rm certbot renew
setup-auto-renewing-certs:
	echo "[Make]: Running 'setup-auto-renewing-certs' target in Makefile..." && \
	bash ./docker-deploy/scripts/setup-auto-renewing-certs.sh

update:
	echo "[Make]: Running 'update' target in Makefile..." && \
	bash ./docker-deploy/scripts/update-deploy.sh

setup-ci:
	echo "[Make]: Running 'setup-ci' target in Makefile..." && \
	bash ./docker-deploy/scripts/setup-ci.sh
	bash ./docker-deploy/scripts/show-variables-to-github-ci.sh

install-docker-if-not-exists:
	echo "[Make]: Running 'install-docker-if-not-exists' target in Makefile..." && \
	bash ./docker-deploy/scripts/install-docker-if-not-exists.sh

set-docker-not-sudo:
	echo "[Make]: Running 'set-docker-not-sudo' target in Makefile..." && \
	bash ./docker-deploy/scripts/set-docker-not-sudo.sh

setup-env-file:
	echo "[Make]: Running 'setup-env-file' target in Makefile..." && \
	bash ./docker-deploy/scripts/setup-env-file.sh

all:
	echo "[Make]: Running 'all' target in Makefile..." && \
	make install-docker-if-not-exists
	make setup-env-file
	make generate-certs
	make setup-auto-renewing-certs
	make down
	make setup-ci
	make update
