const _ = require('lodash');
const {PRODUCTS} = require('./config');

exports.buildReceipt = () => {
	//
};

exports.getItem = () => {
	//
};

exports.getProductByCode = code =>
	_.find(PRODUCTS, _.matchesProperty('code', code));

exports.validateOrderItem = () => {
	//
};

exports.getItemBundles = () => {
	//
};
