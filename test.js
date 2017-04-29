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
	bundle: {
		quantity: 5,
		price: 699
	}
}, {
	count: 1,
	bundle: {
		quantity: 10,
		price: 1299
	}
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
			sinon.spy(flowerShop, 'validateOrderItem');

			flowerShop.getItem(ORDER_ITEMS[0]);
		});

		it('should call #getProductByCode with the product code', () => {
			expect(flowerShop.getProductByCode.calledOnce).to.be.true();
			expect(flowerShop.getProductByCode.calledWith('R12')).to.be.true();
		});

		it('should call #validateOrderItem with the product and quantity', () => {
			expect(flowerShop.getProductByCode.calledOnce).to.be.true();
			expect(flowerShop.getProductByCode.calledWith(ROSES, 15)).to.be.true();
		});

		it('should call #getItemBundles with the product and quantity', () => {
			expect(flowerShop.getItemBundles.calledOnce).to.be.true();
			expect(flowerShop.getItemBundles.calledWith(ROSES, 15)).to.be.true();
		});

		it('should return the product, and count for each bundle', () => {
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
			expect(flowerShop.getProductByCode('R12')).to.equal(ROSES);
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
			expect(flowerShop.validateOrderItem(ROSES, 15)).to.be.true();
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
