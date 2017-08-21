export PATH := $(realpath .)/node_modules/.bin:$(PATH)

install:
	@yarn install;

run:
	@env-cmd config/dev.json node server.js;

build-ci:
	@env-cmd config/ci.json webpack --config webpack.production.config.js --progress --profile --colors;

build-live:
	@env-cmd config/prod.json webpack --config webpack.production.config.js --progress --profile --colors;

pre-deploy:build-ci
	@http-server ./dist;

publish:build-ci
	@sh ./shell/publish.sh;
