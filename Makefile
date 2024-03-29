start:
	HOST=consultweb PORT=6052 yarn start

start-jitsi:
	HOST=consultweb PORT=6052 yarn start-jitsi

storybook:
	yarn storybook

deps:
	yarn install

test:
	yarn test

# because build is a folder
build-only:
	yarn run build

deploy-local: build-only deploy-local-only

deploy-local-only:
	rm -rf ../../consult-server/app/*
	-mkdir ../../consult-server/app/
	cp -r build/* ../../consult-server/app/

deploy-to-cf-only:
	# Cloudflare ENV variable set in bash profile
	npx wrangler pages publish build --project-name=consult-web --commit-dirty=true

deploy-to-cf: build-only deploy-to-cf-only
