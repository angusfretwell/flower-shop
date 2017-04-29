# 💐 Flower shop

## Setup

1. Install [nvm](https://github.com/creationix/nvm).

2. Install and use the node version specified in `.nvmrc`:

	```shell
	$ nvm install && nvm use
	```

3. Install Yarn:

	```shell
	$ npm install -g yarn
	```

4. Install dependencies and link the package:

	```shell
	$ yarn
	$ yarn link
	```

## Usage

### CLI

```shell
$ flower-shop example-order.txt
```

The order (`example-order.txt`) should have a new line for each item, specifying the quantity and product code separated by a space, for example:

```
10 R12
15 L09
13 T58
```

### Programmatic

```javascript
const {buildReceipt} = require('flower-shop');

const receipt = buildReceipt([{
	code: 'R12',
	quantity: 15
}]);
```

## Development

Run tests:

```shell
$ yarn test

# Watch for changes
$ yarn test:watch
```

Run linter:

```shell
$ yarn run lint
```
