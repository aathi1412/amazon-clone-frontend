export const cart = [];

export function addToCart(productId){
    let noOfQuantity =  Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    let matchingItem;

        cart.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

        if(matchingItem){
            matchingItem.quantity += noOfQuantity;
        }
        else{
            cart.push({
                productId,
                quantity: noOfQuantity
            });
        }
}