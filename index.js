const _ = require('lodash');
const {PRODUCTS} = require('./config');

const getSortedBundles = bundles =>
	_(bundles).sortBy('quantity').reverse().value();

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
			return _.assign({}, bundle, {count});
		});
};

exports.getItem = ({code, quantity}) => {
	const product = exports.getProductByCode(code);

	if (!exports.validateOrderItem(product, quantity)) {
		throw new Error(`Invalid quantity entered for ${product.name}`);
	}

	return {
		product: _.omit(product, 'bundles'),
		bundles: exports.getItemBundles(product, quantity)
	};
};

exports.buildReceipt = items => items.map(exports.getItem);
