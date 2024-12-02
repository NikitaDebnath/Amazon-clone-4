import { addToCart, loadFromStorage,cart } from "../../data/cart.js";

describe('test suite:add to cart',()=>{
    it('adds an exiting product to the cart array',()=>{
        spyOn(localStorage,'setItem');  // spyOn  method helps mock the function  
        spyOn(localStorage,'getItem').and.callFake(()=>{
        return JSON.stringify([
            {
                productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:6,
                deliveryOptionsId:'1'
            }
        ]);
        
      });
      loadFromStorage();
      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(7);
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');




    });
    it('adds an new product to the cart array',()=>{

        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
       addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e') ;
       expect(cart.length).toEqual(1);
       expect(localStorage.setItem).toHaveBeenCalledTimes(1);
       expect(cart[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
       expect(cart[0].quantity).toEqual(1);
    });
})