#!/usr/bin/env node
const os = require('os');
const fs = require('fs-extra');
const meow = require('meow');
const {buildReceipt} = require('.');

const cli = meow(`
	Usage
	  $ flower-shop <input>

	Examples
	  $ flower-shop example-order.txt
`);

const getItemsFromFile = data =>
	data
		.toString()
		.trim()
		.split(os.EOL)
		.map(item => {
			const parts = item.split(' ');
			return {
				quantity: parts[0],
				code: parts[1]
			};
		});

const logReceipt = receipt => console.log(JSON.stringify(receipt, null, 2));

fs.readFile(cli.input[0]).then(
	data => logReceipt(buildReceipt(getItemsFromFile(data))),
	() => {
		throw new Error('Order file must be specified');
	}
).catch(err => console.error(err.message));
