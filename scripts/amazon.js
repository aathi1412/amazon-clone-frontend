import { cart } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';


//-------------load products---------

async function loadPage() {
    await loadProductsFetch();

    renderProductsGrid();
}
loadPage();


function renderProductsGrid(){

//--------------search bar---------
//----------filter products by search-----------

    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;
    if(search){
        const searchLower = search.toLowerCase();

        filteredProducts = products.filter((product) => {
            return product.name.toLowerCase().includes(searchLower) || product.keywords.includes(searchLower);
        }); 
    }
    if(filteredProducts.length === 0){
        document.querySelector('.js-no-match').innerHTML = '<p>No products matched for your search, try different</p>';
    }

//------------generate products------------

    let productsHTML = '';

    filteredProducts.forEach(product => {
        productsHTML += `
                <div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image"
                        src="${product.image}">
                    </div>

                    <div class="product-name limit-text-to-2-lines">
                        ${product.name}
                    </div>

                    <div class="product-rating-container">
                        <img class="product-rating-stars"
                        src="${product.getStarsUrl()}">
                        <div class="product-rating-count link-primary">
                        ${product.rating.count}
                        </div>
                    </div>

                    <div class="product-price">
                        ${product.getPrice()}
                    </div>

                    <div class="product-quantity-container">
                        <select class = "js-quantity-selector-${product.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        </select>
                    </div>

                    ${product.extraInfoHTML()}

                    <div class="product-spacer"></div>

                    <div class="added-to-cart js-added-to-cart-${product.id}">
                        <img src="images/icons/checkmark.png">
                        Added
                    </div>

                    <button class="add-to-cart-button button-primary js-add-to-cart-button" 
                    data-product-id="${product.id}">
                        Add to Cart
                    </button>
                    </div>
        `
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;


//-----------cart quantity updation------------


    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

//------------show added message-----------------

    let successInterval = {};
    function showAddedMessage(productId){
        const addedButton = document.querySelector(`.js-added-to-cart-${productId}`);
        addedButton.classList.add('is-added-to-cart');

        const previousTimeOut = successInterval[productId]; 
        if(previousTimeOut){
            clearTimeout(previousTimeOut);
        }

        const intervalId = setTimeout(() => {
                addedButton.classList.remove('is-added-to-cart');
        }, 2000);
        successInterval[productId] = intervalId;
    }

//-------------add to cart button---------------


    document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
        button.addEventListener('click', () => {
            const {productId} = button.dataset;

            let noOfQuantity =  Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

            cart.addToCart(productId, noOfQuantity);

            const cartQuantity = cart.calculateCartQuantity();

            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
            
            showAddedMessage(productId);

            document.querySelector(`.js-quantity-selector-${productId}`).value = 1;

        });
    });

// ------------search button ---------------

    document.querySelector('.js-search-button').addEventListener('click', () => {
        const search = document.querySelector('.js-search-bar').value;

        window.location.href = 
        `amazon.html?search=${search}`;
    });
// -------------search button ENTER Event--------
    document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            const search = document.querySelector('.js-search-bar').value;

            window.location.href = 
                `amazon.html?search=${search}`;
        }
    });
}
