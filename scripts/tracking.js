import {getOrder} from '../data/ordersData.js';
import {loadProductsFetch, getProduct} from '../data/products.js';
import {updateCartQuantity} from '../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';





async function loadPage() {

// ------------load products--------

    await loadProductsFetch();

// ---------get url parameters------------

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const product = getProduct(productId);
    const order = getOrder(orderId);
    
//---------get productDetails-----------

    let productDetails;
    order.products.forEach((details) => {
        if(details.productId === product.id){
            productDetails = details;
        }
    });

// --------calculate width for track delivery-------------

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    
    const progressPercent = ((today - orderTime) / (deliveryTime - orderTime)) *100;

// ---------generate products to track---------- 

        let trackingHTML = 
        `
        <div class="order-tracking">
                <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
                </a>

                <div class="delivery-date">
                ${progressPercent >= 100 
                    ? 'Delivered on'
                    :'Arriving on'}
                 ${dayjs(deliveryTime).format('MMMM, D')}
                </div>

                <div class="product-info">
                ${product.name}
                </div>

                <div class="product-info">
                Quantity: ${productDetails.quantity}
                </div>

                <img class="product-image" src="${product.image}">

                <div class="progress-labels-container">
                <div class="progress-label ${
                progressPercent < 50 
                ? 'current-status' 
                : ''}">
                    Preparing
                </div>
                <div class="progress-label ${
                (progressPercent >= 50 && progressPercent < 100) 
                ? 'current-status' 
                : ''}">
                    Shipped
                </div>
                <div class="progress-label ${( progressPercent >= 100) ? 'current-status' : ''}">
                    Delivered
                </div>
                </div>

                <div class="progress-bar-container">
                <div class="progress-bar" style="width:${progressPercent}%;"></div>
                </div>
            </div>
        `;

        document.querySelector('.js-main').innerHTML = trackingHTML;

// -------update cart quantity in header----------

    updateCartQuantity();
        
}
loadPage();

