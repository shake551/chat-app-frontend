upFront:
	docker-compose \
		-f docker-compose-node.yml \
		up

updFront:
	docker-compose \
		-f docker-compose-node.yml \
		up -d

downFront:
	docker-compose \
		-f docker-compose-node.yml \
		down