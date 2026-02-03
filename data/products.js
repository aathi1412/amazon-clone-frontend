import { formatCurrency } from "../scripts/utils/money.js";


export function getProduct(productId){
  let matchingProduct;

        products.forEach((product) => {
            if(product.id === productId){
                matchingProduct = product;
            }
        });
    return matchingProduct;
}


class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails){

    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML(){
    return '';
  }

}

class Clothing extends Product{

  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `
    <a href="${this.sizeChartLink}" target="_blank">
    size chart
    </a>
    `;
  }
}

class Appliance extends Product{
  warrantyLink;
  instructionLink;

  constructor(productDetails){
    super(productDetails);
    this.warrantyLink = productDetails.warrantyLink;
    this.instructionLink = productDetails.instructionLink;
  }

  extraInfoHTML(){
    return `
    <a href="${this.warrantyLink}">warranty</a>
    <a href="${this.instructionLink}">instructions</a>
    `;
  }
}

class Item extends Product{
  BBSize;
  pussyColor;

  constructor(productDetails){
    super(productDetails);
    this.BBSize = productDetails.BBSize;
    this.pussyColor = productDetails.pussyColor;
  }

  extraInfoHTML(){
    return `
    <a href="#">${this.BBSize}</a>
    <a href="#">${this.pussyColor}</a>
    `;
  }
}





export let products = [];

export function loadProductsFetch(){

  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {

    return response.json();

  }).then((productsData) => {

      products = productsData.map((productDetails) => {
          if(productDetails.type === 'clothing'){
            return new Clothing(productDetails);
          }

          if(productDetails.type === 'appliance'){
            return new Appliance(productDetails);
          }

          if(productDetails.type === 'item'){
            return new Item(productDetails);
          }
          
          return new Product(productDetails);
        });
        
  });
  
  return promise;
}
/*
export const products = .map((productDetails) => {
  if(productDetails.type === 'clothing'){
    return new Clothing(productDetails);
  }

  if(productDetails.type === 'appliance'){
    return new Appliance(productDetails);
  }

  if(productDetails.type === 'item'){
    return new Item(productDetails);
  }
  
  return new Product(productDetails);
});
*/
