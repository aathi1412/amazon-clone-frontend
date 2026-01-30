// import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

import {cart} from '../../data/cart-class.js';

describe('test suite : addTocart function', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

beforeEach(() => {
    spyOn(localStorage, 'setItem');
});

    it('adds a existing product to cart', () => {
        
         cart.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }];

        cart.addToCart(productId1, 1);

        expect(cart.cartItems.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);


        expect(cart.cartItems[0].productId).toEqual(productId1);

        expect(cart.cartItems[0].quantity).toEqual(2);
    });

    it('adds a new product to cart', () => {
        
        cart.cartItems = []; 

        cart.addToCart(productId1, 1);
        expect(cart.cartItems.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(1);
    });
});


describe('test suite : removeFromCart function', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        cart.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }];
    });


    it('removes productId that in cart', () => {
        
        cart.removeFromCart(productId1);


        expect(cart.cartItems.length).toEqual(0);

    });

    it('removes productId that not in cart', () => {
        
        cart.removeFromCart(productId2);

        expect(cart.cartItems.length).toEqual(1);

        
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(1);
    });
    
});



describe('test suite : updateDeliveryOption function', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        
        cart.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        },{
            productId: productId2,
            quantity: 1,
            deliveryOptionId: '3'
        }];
        
    });


    it('update delivery option of product to cart', () => {
        
        cart.updateDeliveryOption(productId1, '2');

        expect(cart.cartItems[0].deliveryOptionId).toEqual('2');

        
    });

    it('update delivery option of product that is not in cart', () => {
        
        cart.updateDeliveryOption('does not exist', '3');

        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');

        
    });

    it('update delivery option of deliveryId that is not in cart', () => {
        
        cart.updateDeliveryOption(productId1, 'does not exist');

        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');


        
    });
    
});
