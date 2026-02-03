import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from'../data/products.js';


//-------------load products---------

async function loadPage(){

    await loadProductsFetch();
     
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();