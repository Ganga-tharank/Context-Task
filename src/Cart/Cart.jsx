import { useEffect, useReducer } from "react";
import { computeBilling, handleQuantityChange } from "../utils";

const INITIAL_STATE = {
  cart: [
    {
      id: 1,
      image:
      "https://images.hindustantimes.com/tech/img/2023/09/12/1600x900/iPhone_15_Pro_1694541536304_1694541571648.jpeg",
      productName: "iphone 15",
      quantity: 1,
      price: 499,
    },
    {
      id: 2,
      image:
      "https://cdn1.smartprix.com/rx-izLSMVlI0-w1200-h1200/zLSMVlI0.jpg",
      productName: "S23 ultra",
      quantity: 1,
      price: 499,
    },
    {
      id: 3,
      image:
        "https://www.learnerstake.com/wp-content/uploads/2022/01/Vivo-V23-Pro-official-image.jpg",
      productName: "vivo v23",
      quantity: 1,
      price: 499,
    },
  ],
  coupon: {
    name: "COUPA50",
    value: 50,
    type: "%",
  },
  total: 0,
  grandTotal: 0,
  platformCharges: 10,
};

function cartReducer(state, action) {
  if (action.type === "inc") {
    const cart = handleQuantityChange(
      state.cart,
      action.type,
      action.payload.id
    );
    const { total, grandTotal } = computeBilling(
      cart,
      state.coupon,
      state.platformCharges
    );
    return {
      ...state,
      cart: cart,
      total,
      grandTotal,
    };
  } else if (action.type === "dec") {
    const cart = handleQuantityChange(
      state.cart,
      action.type,
      action.payload.id
    );
    const { total, grandTotal } = computeBilling(
      cart,
      state.coupon,
      state.platformCharges
    );
    return {
      ...state,
      cart: cart,
      total,
      grandTotal,
    };
  } else if (action.type === "billing") {
    const { total, grandTotal } = computeBilling(
      state.cart,
      state.coupon,
      state.platformCharges
    );
    return {
      ...state,
      cart: state.cart,
      total,
      grandTotal,
    };
  }
  throw Error("Unknown action.");
}

export default function Cart() {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cart, platformCharges, total, grandTotal } = state;

  useEffect(() => {
    dispatch({ type: "billing" });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <div className="row">
            <h1 className="mb-3">Cart ({cart.length})</h1>
            <div className="col-12">
              {cart.map((item, index) => (
                <div key={`${item.productName}-${index}`} className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        <img style={{ width: "100%" }} src={item.image} />
                      </div>
                      <div className="col-3">
                        <h4>{item.productName}</h4>
                        <div className="d-flex align-items-center justify-content-start">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "dec",
                                payload: { id: item.id },
                              })
                            }
                            className="btn btn-outline-primary"
                            type="button"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "inc",
                                payload: { id: item.id },
                              })
                            }
                            className="btn btn-primary"
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-3">
          <h1 className="mb-3">Billing</h1>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <h5>Total</h5>
                </div>
                <div className="col-6">
                  <p>{total}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <h5>Platform Fees</h5>
                </div>
                <div className="col-6">
                  <p>{platformCharges}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <h4>Grand Total</h4>
                </div>
                <div className="col-6">
                  <h4>{grandTotal}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
