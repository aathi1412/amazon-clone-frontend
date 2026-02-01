import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from'../data/products.js';
import { loadCart, loadCartFetch } from "../data/cart-class.js";


loadProductsFetch(() => {
    renderOrderSummary();
    renderPaymentSummary();     
});

// async function loadPage(){

//     await loadProductsFetch();

//     await new Promise((resolve) => {
//         loadCartFetch(() => {
//             resolve();
//         });
//     });
     
//     renderOrderSummary();
//     renderPaymentSummary();
// }

// loadPage();

// Promise.all([

//     loadProductsFetch(),
//     loadCartFetch()

// ]).then( async () => {
//     await Promise.all([
//         renderOrderSummary(),
//         renderPaymentSummary() 
//     ]);
// });


/*
Promise.all([
    loadProductsFetch(),
     
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary(); 
});
*/

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
// }).then(() => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });   
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });


// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });
