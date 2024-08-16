import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    let productPrice=0;
    let shipingPriceCents=0;
    

    cart.forEach((cartItem)=> {
        const product =getProduct(cartItem.productId);// eta product object return korche jar moddhe price ache
        productPrice+=Number((product.priceCents*cartItem.quantity).toFixed(2));
        const deliveryOptionPrice=getDeliveryOption(cartItem.deliveryOptionsId);
        shipingPriceCents+=Number((deliveryOptionPrice.priceCents).toFixed(2));
    });
    const totalPriceBeforeTax=Number((productPrice+shipingPriceCents).toFixed(2));
    const totalaftertax=Number((totalPriceBeforeTax*0.1).toFixed(2));
    const total=Number((totalPriceBeforeTax+totalaftertax).toFixed(2));
    const paymentSummaryHTMl=`

    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shipingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(totalaftertax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

    `;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTMl;
}