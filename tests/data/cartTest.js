import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

describe('test suite : addTocart function', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

beforeEach(() => {
    spyOn(localStorage, 'setItem');
});

    it('adds a existing product to cart', () => {
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                DeliveryOptionId: '1'
        }]);
        });
        loadFromStorage(); 
        addToCart(productId1, 1);

        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: productId1,
            quantity: 2,
            DeliveryOptionId: '1'
        }]));

        expect(cart[0].productId).toEqual(productId1);

        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to cart', () => {
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage(); 
        addToCart(productId1, 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(1);
    });
});


describe('test suite : removeFromCart function', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                DeliveryOptionId: '1'
            }]);
        });
        loadFromStorage(); 
    });


    it('removes productId that in cart', () => {
        
        removeFromCart(productId1);


        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
        
    });

    it('removes productId that not in cart', () => {
        
        removeFromCart(productId2);

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
                    productId: productId1,
                    quantity: 1,
                    DeliveryOptionId: '1'
                }])
        );
        
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(1);
    });
    
});



describe('test suite : updateDeliveryOption function', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                DeliveryOptionId: '1'
            },{
                productId: productId2,
                quantity: 1,
                DeliveryOptionId: '3'
            }]);
        });
        loadFromStorage(); 
    });


    it('update delivery option of product to cart', () => {
        
        updateDeliveryOption(productId1, '3');

        expect(cart[0].deliveryOptionId).toEqual('3');

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        // expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
        
    });

    it('update delivery option of product that is not in cart', () => {
        
        updateDeliveryOption('does not exist', 3);

        // expect(cart[0].deliveryOptionId).toEqual(3);

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);

        // expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
        
    });

    it('update delivery option of deliveryId that is not in cart', () => {
        
        updateDeliveryOption(productId1, 'does not exist');

        // expect(cart[0].deliveryOptionId).toEqual(3);

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);

        // expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
        
    });
    
});