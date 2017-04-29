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

exports.validateOrderItem = (product, quantity) =>
	!_(product.bundles)
		.sortBy('quantity')
		.reverse()
		.reduce((remainder, bundle) => remainder % bundle.quantity, quantity);

exports.getItemBundles = () => {
	//
};
