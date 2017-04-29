const sinon = require('sinon');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const flowerShop = require('.');

chai.use(dirtyChai);
const {expect} = chai;

const ROSES = {
	name: 'Roses',
	code: 'R12',
	bundles: [{
		quantity: 5,
		price: 699
	}, {
		quantity: 10,
		price: 1299
	}]
};

const ORDER_ITEMS = [{
	code: 'R12',
	quantity: 15
}, {
	code: 'L09',
	quantity: 9
}];

const ITEM_BUNDLES = [{
	count: 1,
	price: 1299,
	quantity: 10
}, {
	count: 1,
	price: 699,
	quantity: 5
}];

describe('flower-shop', () => {
	describe('#buildReceipt', () => {
		beforeEach(() => {
			sinon.spy(flowerShop, 'getItem');
		});

		it('should map over order items with #getItem', () => {
			flowerShop.buildReceipt(ORDER_ITEMS);
			expect(flowerShop.getItem.calledTwice).to.be.true();
			expect(flowerShop.getItem.calledWith(ORDER_ITEMS[0])).to.be.true();
			expect(flowerShop.getItem.calledWith(ORDER_ITEMS[1])).to.be.true();
		});

		afterEach(() => {
			flowerShop.getItem.restore();
		});
	});

	describe('#getItem', () => {
		beforeEach(() => {
			sinon.stub(flowerShop, 'getProductByCode').returns(ROSES);
			sinon.stub(flowerShop, 'getItemBundles').returns(ITEM_BUNDLES);
			sinon.stub(flowerShop, 'validateOrderItem').returns(true);
		});

		it('should call #getProductByCode with the product code', () => {
			flowerShop.getItem(ORDER_ITEMS[0]);
			expect(flowerShop.getProductByCode.calledOnce).to.be.true();
			expect(flowerShop.getProductByCode.calledWith('R12')).to.be.true();
		});

		it('should call #validateOrderItem with the product and quantity', () => {
			flowerShop.getItem(ORDER_ITEMS[0]);
			expect(flowerShop.validateOrderItem.calledOnce).to.be.true();
			expect(flowerShop.validateOrderItem.calledWith(ROSES, 15)).to.be.true();
		});

		it('should throw an error if #validateOrderItem returns falsey', () => {
			flowerShop.validateOrderItem.returns(false);
			expect(() => flowerShop.getItem(ORDER_ITEMS[0]))
				.to.throw('Invalid quantity entered for Roses');
		});

		it('should call #getItemBundles with the product and quantity', () => {
			flowerShop.getItem(ORDER_ITEMS[0]);
			expect(flowerShop.getItemBundles.calledOnce).to.be.true();
			expect(flowerShop.getItemBundles.calledWith(ROSES, 15)).to.be.true();
		});

		it('should return the product, and count for each bundle', () => {
			flowerShop.getItem(ORDER_ITEMS[0]);
			expect(flowerShop.getItemBundles.calledOnce).to.be.true();
			expect(flowerShop.getItemBundles.calledWith(ROSES, 15)).to.be.true();
		});

		afterEach(() => {
			flowerShop.getProductByCode.restore();
			flowerShop.validateOrderItem.restore();
			flowerShop.getItemBundles.restore();
		});
	});

	describe('#getProductByCode', () => {
		it('should return the product that matches the specified code', () => {
			expect(flowerShop.getProductByCode('R12')).to.eql(ROSES);
		});

		it('should return empty if a matching product is not found', () => {
			expect(flowerShop.getProductByCode('ABC123')).to.be.empty();
		});
	});

	describe('#validateOrderItem', () => {
		it('should return truthy if the quantity fits into available bundles', () => {
			expect(flowerShop.validateOrderItem(ROSES, 15)).to.be.true();
		});

		it('should return falsey if the quantity does not fit into available bundles', () => {
			expect(flowerShop.validateOrderItem(ROSES, 14)).to.be.false();
		});
	});

	describe('#getItemBundles', () => {
		it('should return the count for each bundles', () => {
			expect(flowerShop.getItemBundles(ROSES, 15)).to.be.eql(ITEM_BUNDLES);
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
