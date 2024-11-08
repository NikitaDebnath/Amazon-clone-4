
import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

  let cartSummaryHTML = ""; //to store html code

  //for compareing between cart and product

  cart.forEach((cartItem) => {
    let productId = cartItem.productId;

    let matchingProduct = "";
    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });
    const deliveryOptionId = cartItem.deliveryOptionsId;
    let deliveryOption = "";
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs(); //today's date

    const deliveryDate = today.add(deliveryOption.deliveryDays, "days"); //do calculations 'add' function (build-in function of dayjs) for adding dates in todays var
    const dateString = deliveryDate.format("dddd,MMMM D"); //display in right format

    cartSummaryHTML += ` <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }"> 
              <div class="delivery-date">
                Delivery date: ${dateString}
   
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ₹${matchingProduct.priceCents}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${
                        cartItem.quantity
                      }</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}  
  
                  
                </div>
              </div>
            </div>
              `;
    // console.log(cartSummaryHTML);
  });
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML; //storing the html code

  //function for dates

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ""; // to store the html of dates

    deliveryOptions.forEach((deliveryOptions) => {
      const today = dayjs(); //today's date

      const deliveryDate = today.add(deliveryOptions.deliveryDays, "days"); //do calculations 'add' function (build-in function of dayjs) for adding dates in todays var

      const dateString = deliveryDate.format("dddd,MMMM D"); //display in right format

      const priceString =
        deliveryOptions.priceCents === 0
          ? "Free "
          : `₹${deliveryOptions.priceCents}`;

      const ischecked = deliveryOptions.id === cartItem.deliveryOptionsId; //ckecked function

      html += `
  <div class="delivery-option js-delivery-option"  data-delivery-option-id="${
    deliveryOptions.id
  }" data-product-id="${matchingProduct.id}">
      <input type="radio"
        ${ischecked ? "checked" : ""}
  
        class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} - Shipping
        </div>
      </div>
    </div>
  `;
    });

    return html;
  }

  // for delete button

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      // console.log(productId);
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      // console.log(container);
      container.remove();
    });
  });

  //updating deliveryId in cart
  
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);//function calling
    });
  });

 
