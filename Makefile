up:
	docker-compose \
	  -f docker-compose-python.yml \
		-f docker-compose-mysql.yml \
		-f docker-compose-redis.yml \
		up

upd:
	docker-compose \
	  -f docker-compose-python.yml \
		-f docker-compose-mysql.yml \
		-f docker-compose-redis.yml \
		up -d

down:
	docker-compose \
	  -f docker-compose-python.yml \
		-f docker-compose-mysql.yml \
		-f docker-compose-redis.yml \
		down

upFront:
	docker-compose \
	  -f docker-compose-python.yml \
		-f docker-compose-mysql.yml \
		-f docker-compose-redis.yml \
		-f docker-compose-node.yml \
		up

updFront:
	docker-compose \
	  -f docker-compose-python.yml \
		-f docker-compose-mysql.yml \
		-f docker-compose-redis.yml \
		-f docker-compose-node.yml \
		up -d

downFront:
	docker-compose \
	  -f docker-compose-python.yml \
		-f docker-compose-mysql.yml \
		-f docker-compose-redis.yml \
		-f docker-compose-node.yml \
		down