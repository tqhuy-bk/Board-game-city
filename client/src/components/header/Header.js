import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Cart from './icons/cart.svg';
import Menu from './icons/menu.svg';
import './header.css';
import CartHover from '../mainpage/cartHover/CartHover';
import { GlobleState } from '../../GlobleState';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import makeTimer from '../../utils';
 
export default function Header() {
  const state = useContext(GlobleState);
  const [isLogged] = state.usersApi.isLogged;
  const [isAdmin] = state.usersApi.isAdmin;
  const [cart] = state.usersApi.cart;
  const [profile, setProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [user] = state.usersApi.user;
  useEffect(() => {
      if (user) {
          setProfile(document.querySelector('.profile'));
      }
  }, [user]);
 
  useEffect(() => {
      if (profile) {
          profile.addEventListener('click', function () {
              profile.classList.toggle('active');
          });
      }
  }, [profile]);
 
  const logoutUser = async () => {
      await axios.get('user/logout');
      localStorage.clear();

      toast.success('Đăng xuất thành công', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      await makeTimer(2000)
      window.location.href = '/';
  };
  const adminRoute = () => {
      return (
          <>
              <NavLink
                  to="/create_product"
                  activeClassName="nav-link--active"
                  className="nav-link"
                  exact
              >
                  Tạo sản phẩm
              </NavLink>
              <NavLink
                  to="/categories"
                  activeClassName="nav-link--active"
                  className="nav-link"
                  exact
              >
                  Danh mục
              </NavLink>
              {/* <NavLink
                  to="/categories"
                  activeClassName="nav-link--active"
                  className="nav-link"
                  exact
              >
                  Manage Users
              </NavLink> */}
          </>
      );
  };
 
  const userRoute = () => {
      return (
          <>
            {
                user.image ? (
                    <img
                  src={user.image.url}
                  alt="menu"
                  className="profile-image"
                ></img>
                   
                ):(
                    <img
                    src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1609941293/javcommerce/person_slkixq.jpg"
                    alt="menu"
                    className="profile-image"
                    ></img>
                )
            }
              
              <div className="profile-indicator"></div>
              <NavLink
                  to="/myAccount"
                  activeClassName="nav-link--active"
                  className="nav-link "
                  exact
              >
                  Tài khoản
              </NavLink>
              <NavLink
                  to="/history"
                  activeClassName="nav-link--active"
                  className="nav-link "
                  exact
              >
                  Lịch sử
              </NavLink>
              <NavLink
                  to="/"
                  activeClassName=""
                  className="nav-link "
                  exact
                  onClick={logoutUser}
              >
                  Đăng xuất
              </NavLink>
          </>
      );
  };
 
  useEffect(() => {
      const menu1 = document.querySelector('.menu');
      menu1.addEventListener('click', () => {
          setMenu(true);
      });
  }, []);
 
  return (
      <header className="header" id="header">
          <div 

          >
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
          </div>
          <h2>
              <Link
                  to="/"
                  exact="true"
                  className="logo"
                  style={isAdmin ? { fontSize: '20px' } : {}}
              >
                  Board Game City{isAdmin ? '-Admin' : ''}
              </Link>
          </h2>
          <ul className="nav">
              {/* <li>
                  <NavLink
                      to="/"
                      activeClassName="nav-link--active"
                      className="nav-link"
                      exact
                  >
                      Home
                  </NavLink>
              </li> */}
              {isAdmin ? adminRoute() : ''}
          </ul>
          <div className="header-right">
              <div className={isLogged === false ? 'cart' : 'cart'}>
                  <Link to="/cart">
                      <span className="nb">{cart.length}</span>
                      <img src={Cart} alt="cart"></img>
                  </Link>
                  <CartHover cart={cart} />
              </div>
 
              {isLogged && user ? (
                  <>
                      <div className="menu">
                          <img className="header-menu" src={Menu}></img>
                      </div>
                      <div
                          className={
                              menu ? 'rp-menu-child active' : 'rp-menu-child'
                          }
                      >
                          <div
                              className="rp-menu-child-close"
                              onClick={() => setMenu(false)}
                          >
                              X
                          </div>
                          <div
                              style={{
                                  display: 'block',
                                  textAlign: 'center',
                                  width: '100%',
                              }}
                          >
                              <NavLink
                                  to="/history"
                                  activeClassName="nav-link--active"
                                  className="nav-link "
                                  exact
                              >
                                  Lịch sử
                              </NavLink>
                              <NavLink
                                  to="/"
                                  activeClassName=""
                                  className="nav-link "
                                  exact
                                  onClick={logoutUser}
                              >
                                  Đăng xuất
                              </NavLink>
                          </div>
                          {isAdmin ? adminRoute() : ''}
                      </div>
                  </>
              ) : (
                  <>
                      <div className="menu">
                          <img className="header-menu" src={Menu}></img>
                      </div>
                      <div
                          className={
                              menu ? 'rp-menu-child active' : 'rp-menu-child'
                          }
                      >
                          <div
                              className="rp-menu-child-close"
                              onClick={() => setMenu(false)}
                          >
                              X
                          </div>
                          <div
                              style={{
                                  display: 'block',
                                  textAlign: 'center',
                                  width: '100%',
                              }}
                          >
                              <div>
                                  <NavLink
                                      to="/login"
                                      className="nav-link"
                                      activeClassName="nav-link--active"
                                  >
                                      Đăng nhập
                                  </NavLink>
                              </div>
                              {/* <div>
                                  <NavLink
                                      to="/register"
                                      className="nav-link"
                                      activeClassName="nav-link--active"
                                  >
                                      Register
                                  </NavLink>
                              </div> */}
                          </div>
                      </div>
                  </>
              )}
              {isLogged && user ? (
                  <div className="profile-box">
                      <div className="profile">
                          <div className="profile-name">{user.name}</div>
                          <i className="fas fa-sort-down"></i>
                      </div>
                      <div className="profile-child">{userRoute()}</div>
                  </div>
              ) : (
                  <div className="menu-login-sm">
                      <div>
                          <NavLink
                              to="/login"
                              className="nav-link"
                              activeClassName="nav-link--active"
                          >
                              Đăng nhập
                          </NavLink>
                      </div>
                      <div>
                          <NavLink
                              to="/register"
                              className="nav-link"
                              activeClassName="nav-link--active"
                          >
                              Đăng kí
                          </NavLink>
                      </div>
                  </div>
              )}
          </div>
      </header>
  );
}