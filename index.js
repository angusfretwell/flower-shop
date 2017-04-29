const _ = require('lodash');
const {PRODUCTS} = require('./config');

const getSortedBundles = bundles =>
	_(bundles).sortBy('quantity').reverse().value();

exports.buildReceipt = () => {
	//
};

exports.getItem = () => {
	//
};

exports.getProductByCode = code =>
	_.find(PRODUCTS, _.matchesProperty('code', code));

exports.validateOrderItem = (product, quantity) =>
	!getSortedBundles(product.bundles)
		.reduce((remainder, bundle) => remainder % bundle.quantity, quantity);

exports.getItemBundles = (product, quantity) => {
	let quantityLeft = quantity;

	return getSortedBundles(product.bundles)
		.map(bundle => {
			const count = _.floor(quantityLeft / bundle.quantity);
			quantityLeft -= count * bundle.quantity;
			return _.assign(bundle, {count});
		});
};
