setup:
	ln -s ../common src/common

start:
	PORT=6052 yarn start

storybook:
	yarn storybook

test:
	yarn test
