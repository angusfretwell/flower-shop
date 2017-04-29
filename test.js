describe('flower-shop', () => {
	describe('#buildReceipt', () => {
		it('should map over order items with #getItem', () => {

		});
	});

	describe('#getItem', () => {
		it('should call #getProductByCode with the product code', () => {

		});

		it('should call #validateOrderItem with the product and quantity', () => {

		});

		it('should call #getItemBundles with the product and quantity', () => {

		});

		it('should return the product, and count for each bundle', () => {

		});
	});

	describe('#getProductByCode', () => {
		it('should return the product that matches the specified code', () => {

		});

		it('should return empty if a matching product is not found', () => {

		});
	});

	describe('#validateOrderItem', () => {
		it('should return truthy if the quantity fits into available bundles', () => {

		});

		it('should return falsey if the quantity does not fit into available bundles', () => {

		});
	});

	describe('#getItemBundles', () => {
		it('should return the count for each bundles', () => {

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
