const _ = require('lodash');
const {PRODUCTS} = require('./config');

const getSortedBundles = bundles =>
	_(bundles).sortBy('quantity').reverse().value();

exports.getProductByCode = code =>
	_.find(PRODUCTS, _.matchesProperty('code', code));

exports.getItemBundles = (product, bundles, quantity) => {
	let quantityLeft = quantity;

	if (_.isEmpty(bundles)) {
		throw new Error(`Invalid quantity entered for ${product.name}`);
	}

	const itemBundles = bundles
		.map(bundle => {
			const count = _.floor(quantityLeft / bundle.quantity);
			quantityLeft -= count * bundle.quantity;
			return _.assign({}, bundle, {count});
		})
		.filter(({count}) => count);

	if (quantityLeft) {
		return exports.getItemBundles(product, _.drop(bundles, 1), quantity);
	}

	return itemBundles;
};

exports.getItem = ({code, quantity}) => {
	const product = exports.getProductByCode(code);
	const bundles = getSortedBundles(product.bundles);

	if (!product) {
		throw new Error(`Couldn't find product for code "${code}"`);
	}

	return {
		product: _.omit(product, 'bundles'),
		bundles: exports.getItemBundles(product, bundles, quantity)
	};
};

exports.buildReceipt = items => items.map(exports.getItem);
