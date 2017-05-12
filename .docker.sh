#!/bin/bash

eval $(cat ./.docker.env)

# npm install
cd htdocs && \
composer install --ignore-platform-reqs --no-scripts && \
docker-compose -f $CONTAINERS_PATH/$MACHINE/docker-compose.yml run php app/console doctrine:schema:create && \
docker-compose -f $CONTAINERS_PATH/$MACHINE/docker-compose.yml run php app/console assets:install web && \
docker-compose -f $CONTAINERS_PATH/$MACHINE/docker-compose.yml run php app/console cache:clear --no-warmup && \
docker-compose -f $CONTAINERS_PATH/$MACHINE/docker-compose.yml run php app/console fos:user:create --super-admin `whoami` `whoami`@kangourouge.com `whoami`

cd ../skin && \
npm install && \
bower install