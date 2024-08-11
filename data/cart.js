//get the cart from local storage\

import { deliveryOptions } from "./deliveryOptions.js";


export let cart =JSON.parse(localStorage.getItem('cart'))|| 

// if(!cart) 
//   {
  [
    {
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:6,
        deliveryOptionsId:'1'
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:9,
        deliveryOptionsId:'1'
    }
];
saveToStorage();
// };


//use local storage to save the cart data
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
} 

//function to add products in cart 

export function addToCart (productId){
  let matchingItem;
  cart.forEach((product)=>{
    if(product.productId===productId){
      matchingItem=product;
    };
  });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionsId:'1'

      });
    };
  saveToStorage();
  }


  // function for removing items from cart....

  export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
      if(productId!==cartItem.productId)
      {
        newCart.push(cartItem);
      };
    });
    cart=newCart;
    saveToStorage();
    
  };
  
  // localStorage.removeItem('cart');
  
//function to update deliveryId in the cart

  export function updateDeliveryOption(productId,deliveryOptionsId){
    let matchingItem;
    cart.forEach((item) => {
      if (productId == item.productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionsId=deliveryOptionsId;
    saveToStorage();
  }
