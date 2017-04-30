const sinon = require('sinon');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const {PRODUCTS} = require('./config');
const flowerShop = require('.');

chai.use(dirtyChai);
const {expect} = chai;

const ROSES = PRODUCTS[0];
const ROSES_BUNDLES = ROSES.bundles.reverse();

const TULIPS = PRODUCTS[2];
const TULIPS_BUNDLES = TULIPS.bundles.reverse();

describe('flower-shop', () => {
	describe('#buildReceipt', () => {
		beforeEach(() => {
			sinon.spy(flowerShop, 'getItem');
		});

		it('should map over order items with #getItem', () => {
			flowerShop.buildReceipt([
				{code: 'R12', quantity: 15},
				{code: 'L09', quantity: 9}
			]);
			expect(flowerShop.getItem.calledTwice).to.be.true();
			expect(flowerShop.getItem.calledWith({code: 'R12', quantity: 15})).to.be.true();
			expect(flowerShop.getItem.calledWith({code: 'L09', quantity: 9})).to.be.true();
		});

		afterEach(() => {
			flowerShop.getItem.restore();
		});
	});

	describe('#getItem', () => {
		beforeEach(() => {
			sinon.stub(flowerShop, 'getProductByCode').returns(ROSES);
			sinon.stub(flowerShop, 'getItemBundles').returns([
				{count: 1, price: 1299, quantity: 10},
				{count: 1, price: 699, quantity: 5}
			]);
		});

		it('should call #getProductByCode with the product code', () => {
			flowerShop.getItem({code: 'R12', quantity: 15});
			expect(flowerShop.getProductByCode.calledOnce).to.be.true();
			expect(flowerShop.getProductByCode.calledWith('R12')).to.be.true();
		});

		it('should call #getItemBundles with the product, bundles and quantity', () => {
			flowerShop.getItem({code: 'R12', quantity: 15});
			expect(flowerShop.getItemBundles.calledOnce).to.be.true();
			expect(flowerShop.getItemBundles.calledWith(ROSES, ROSES_BUNDLES, 15))
				.to.be.true();
		});

		it('should return the product, and count for each bundle', () => {
			expect(flowerShop.getItem({code: 'R12', quantity: 15})).to.eql({
				product: {code: 'R12', name: 'Roses'},
				bundles: [
					{count: 1, price: 1299, quantity: 10},
					{count: 1, price: 699, quantity: 5}
				]
			});
		});

		afterEach(() => {
			flowerShop.getProductByCode.restore();
			flowerShop.getItemBundles.restore();
		});
	});

	describe('#getProductByCode', () => {
		it('should return the product that matches the specified code', () => {
			expect(flowerShop.getProductByCode('R12')).to.eql(PRODUCTS[0]);
		});

		it('should return empty if a matching product is not found', () => {
			expect(flowerShop.getProductByCode('ABC123')).to.be.empty();
		});
	});

	describe('#getItemBundles', () => {
		it('should return the count for each bundle', () => {
			expect(flowerShop.getItemBundles(ROSES, ROSES_BUNDLES, 15))
				.to.eql([
					{count: 1, price: 1299, quantity: 10},
					{count: 1, price: 699, quantity: 5}
				]);
		});

		it('should handle edge case order items', () => {
			expect(flowerShop.getItemBundles(TULIPS, TULIPS_BUNDLES, 13))
				.to.eql([
					{count: 2, price: 995, quantity: 5},
					{count: 1, price: 595, quantity: 3}
				]);
		});

		it('should throw an error if the item quantity is invalid', () => {
			expect(() => flowerShop.getItemBundles(ROSES, ROSES_BUNDLES, 11))
				.to.throw('Invalid quantity entered for Roses');
		});
	});
});

describe('cli', () => {
	it('should call #buildReceipt with the specified order', () => {

	});

	it('should throw an error if an order is not specified', () => {

	});

	it('should throw an error if the order format is invalid', () => {

	});

	it('should output the response from #buildOrder in JSON format', () => {

	});
});
