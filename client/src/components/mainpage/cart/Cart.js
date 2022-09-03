import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import PaypalButton from './PaypalButton';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 
export default function Cart() {
  const state = useContext(GlobleState);
  const [cart, setCart] = state.usersApi.cart;
  const [user] = state.usersApi.user;
  console.log('==========cart==', cart)
  console.log('==========user==',user)
  const [callback, setCallback] = state.usersApi.callback;
 
  const [total, setTotal] = useState(0);
  const [token] = state.token;
 
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
 
  useEffect(() => {
      const totalCart = () => {
          let total = 0;
          total = cart.reduce((total, sum) => {
              return total + sum.quantity * sum.price;
          }, 0);
          setTotal(total);
      };
      totalCart();
  }, [cart]);
 
  const addToCart = async (cart) => {
      await axios.patch(
          '/user/addCart',
          { cart },
          {
              headers: { Authorization: token },
          },
      );
  };
 
  const increment = (id) => {
      cart.forEach((item) => {
          if (item._id === id) {
              item.quantity += 1;
          }
      });
      setCart([...cart]);
      addToCart(cart);
  };
 
  const decrement = (id) => {
      cart.forEach((item) => {
          if (item._id === id) {
              item.quantity === 1
                  ? (item.quantity = 1)
                  : (item.quantity -= 1);
          }
      });
      setCart([...cart]);
      addToCart(cart);
  };
 
  const removeCartItem = (id) => {
      if (window.confirm('Do you want to delete this product!')) {
          cart.forEach((item, index) => {
              if (item._id === id) {
                  cart.splice(index, 1);
              }
          });
          addToCart(cart);
          setCart([...cart]);
      }
  };
 
  const tranSuccess = async (payment) => {
      console.log("payment========", payment);
      const { paymentID, address } = payment;
 
      await axios.post(
          'api/payment',
          { cart, paymentID, address },
          {
              headers: { Authorization: token },
          },
      );
 
      setCart([]);
      addToCart([]);
      toast.success('Bạn đã đặt hàng thành công', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setCallback(!callback); // de goi lai api
  };
 
  return (
      <div className="cart" style={{marginLeft: '50px', marginBottom: '10rem'}}>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style = {{
                zIndex: '11'
            }}
            />
          {cart.length === 0 ? (
              <div className="cart-empty">
                  <h2>Cart Empty</h2>
                  <img
                      className="cart-empty-image"
                      src="https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
                      alt="cart-empty"
                  ></img>
              </div>
          ) : (
              <>
                  <div className="cart-container">
                      <h3 style ={{paddingLeft: '1rem', color: '#E5707E'}}>Giỏ hàng của bạn</h3>
                      <div className="cart-body">
                          <div className="cart-content">
                              <table className="cart-table">
                                  <thead>
                                      <tr>
                                          <th>&nbsp;</th>
                                          <th>&nbsp;</th>
                                          <th>&nbsp;</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {cart.map((product, index) => {
                                          return (
                                              <tr
                                                  className="cart-item"
                                                  key={index}
                                              >
                                                  <td className="cart-thumbnail">
                                                      <Link
                                                          to={`/detail/${product._id}`}
                                                      >
                                                          <img
                                                              src={product.image.url}
                                                              alt="product-img"
                                                          ></img>
                                                      </Link>
 
                                                  </td>
                                                  <td className="cart-quantitys">
                                                      <div className="cart-name">
                                                          <a
                                                              href={`/detail/${product._id}`}
                                                          >
                                                          </a>
                                                      </div>
                                                      <div class="button">
                                                          <button
                                                              className="cart-quantity-ct"
                                                              onClick={() =>
                                                                  decrement(
                                                                      product._id,
                                                                  )
                                                              }
                                                          >
                                                              -
                                                          </button>
                                                          <span className="cart-quantity-number">
                                                              {product.quantity}
                                                          </span>
                                                          <button
                                                              className="cart-quantity-ct"
                                                              onClick={() =>
                                                                  increment(
                                                                      product._id,
                                                                  )
                                                              }
                                                          >
                                                              +
                                                          </button>
                                                      </div>
                                                  </td>
                                                  <td
                                                      className="cart-remove"
                                                      onClick={() =>
                                                          removeCartItem(
                                                              product._id,
                                                          )
                                                      }
                                                  >
                                                  <div className="cart-price-t">
                                                      $
                                                      {product.price *
                                                          product.quantity}
                                                  </div>
                                                      x
 
                                                  </td>
                                              </tr>
                                          );
                                      })}
                                  </tbody>
                              </table>
                          </div>
                          <div className="cart-checkout">
                              <div className="cart-address">
                                  <div style ={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                                      <span style={{fontWeight: '500', fontSize: '0.9rem'}}>Giao tới</span>
                                      <Link to="/myAccount" style={{color: 'blue', fontSize: '0.9rem'}}>Thay đổi</Link>
                                  </div>
                                  {/* <p style ={{fontWeight: '500', fontSize: '1.1rem', marginBottom: '0.5rem'}}>Nguyễn Hữu Hưng | 0905683258</p> */}
                                  <p style ={{fontWeight: '500', fontSize: '1.1rem', marginBottom: '0.5rem'}}>{`${user.name} | ${user.phone}`}</p>
                                  {/* <p>57 Đường số 2 - Cư xá Bình Thới, Phường 8, Quận 11, Thành phố Hồ Chí Minh, Phường 08, Quận 11, Hồ Chí Minh</p> */}
                                  <p>{user.address}</p>
                              </div>
                              <div className="cart-checkout-box">
                                  <div className="cart-subtotal">
                                      <div className="cart-subtotal-label">
                                          Tổng cộng
                                      </div>
                                      <div className="cart-subtotal-number">
                                          {`${total} USD`}
                                      </div>
                                  </div>
                                  {/* <div className="cart-shipping">
                                      <div className="cart-shipping-label">
                                          Shipping
                                      </div>
                                      <p>
                                          There are no shipping methods
                                          available. Please double check your
                                          address, or contact us if you need
                                          any help.
                                      </p>
                                  </div> */}
                              </div>
                              {/* <Link to="#!" className="cart-payment-btn">
                                  Payment
                              </Link> */}
                              <div style={{marginTop: '2rem'}}>
                                  <PaypalButton
                                      total={total}
                                      tranSuccess={tranSuccess}
                                  ></PaypalButton>
                              </div>
                          </div>
                      </div>
                  </div>
              </>
          )}
          {/* <div className="cart-container">
              <Link to="/" className="cart-to-home">
                  <i
                      className="fas fa-long-arrow-alt-left"
                      style={{ marginRight: '5px' }}
                  ></i>
                  Go Back To Shopping
              </Link>
          </div> */}
          <Link to="/" className="icon">
                      <i className="fa fa-arrow-left"></i>
                  </Link>
      </div>
  );
}
 