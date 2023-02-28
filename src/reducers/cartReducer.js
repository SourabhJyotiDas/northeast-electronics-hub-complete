import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO, } from "../constants/cartConstent";



export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {

   switch (action.type) {
      case ADD_TO_CART:
         const item = action.payload;

         const isItemExist = state.cartItems.find((element) => {
            return element.product === item.product
         })

         if (isItemExist) {
            return {
               ...state,
               cartItems: state.cartItems.map((element) => {
                  return element.product === isItemExist.product ? item : element
               })
            }
         } else {
            return {
               ...state,
               cartItems: [...state.cartItems, item]
            }
         }

      case REMOVE_CART_ITEM:
         return {
            ...state,
            cartItems: state.cartItems.filter((element) => element.product !== action.payload),
         };

      case SAVE_SHIPPING_INFO:
         return {
            ...state,
            shippingInfo: action.payload,
         };

      default:
         return state
   }

}