set-default-node-version:
	. ${NVM_DIR}/nvm.sh && nvm alias default 16

start: set-default-node-version
	HOST=consultweb PORT=6052 yarn start

storybook: set-default-node-version
	yarn storybook

test:
	yarn test
