import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js"; 
import { currencyFormat } from "../utils/money.js";
import {  getDeliveryOption } from "../../data/deliveryOption.js";






export function renderPaymentSummary(){

    let itemPrice = 0;
    let shippingPrice = 0;

    cart.forEach(cartItem => {
        
        let product = getProduct(cartItem.productId);
        itemPrice += cartItem.quantity * product.priceCents;

        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.priceCents;
        
    });

    const totalBeforeTax = itemPrice + shippingPrice;
    const estimatedTax = totalBeforeTax * 0.1;


    let paymentSummaryHTML = '';

    const cartQuantity = calculateCartQuantity();

    paymentSummaryHTML = `
            <div class="payment-summary-title">
                Payment Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${cartQuantity}):</div>
                <div class="payment-summary-money">
                $${currencyFormat(itemPrice)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money js-shipping">$${currencyFormat(shippingPrice)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${currencyFormat(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${currencyFormat(estimatedTax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money js-total">$${currencyFormat(totalBeforeTax + estimatedTax)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
        
    `

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;



}
