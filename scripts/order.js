import { orders } from '../data/ordersData.js';
import { products ,getProduct, loadProductsFetch } from '../data/products.js';
import { getDeliveryOption, formatDeliveryDate } from '../data/deliveryOption.js';
import { currencyFormat } from './utils/money.js';

loadProductsFetch(renderOrders);
console.log(orders);

function renderOrders(){
    
    if(orders.length === 0){
        document.querySelector('.js-empty-message').innerHTML = 'No orders yet';
    }

    let orderHTML = '';
    orders.forEach((order) => {
        orderHTML += 
        `
        <div class="order-container">

            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${formatDeliveryDate(order.orderTime)}</div>
                    </div>
                    <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${currencyFormat(order.totalCostCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>
            <div class="order-details-grid">
                ${renderProductList(order)}
            </div>
        </div>
        `;
        
    });
    document.querySelector('.js-orders-grid').innerHTML = orderHTML;

    
}

function renderProductList(order){

        let orderDetailHTML = '';

        order.products.forEach((product) => {

            const productId = product.productId;
            let matchingProduct = getProduct(productId);

            let deliveryDate = formatDeliveryDate(product.estimatedDeliveryTime);

            orderDetailHTML += 
            `
            
            <div class="product-image-container">
                <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${deliveryDate}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
            </div>
            
            `;
        });

        return orderDetailHTML;
    }