import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loginImg from './login-img.jpg';
import axios from 'axios';

import makeTimer from '../../../../utils';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 
// MUI stuff
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
 
export default function Register() {
  const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
   //    images: {},
       phone: '',
      avatar: '',
      loading: false,
      address: ''
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  const onHandleChange = (e) => {
      const { name, value } = e.target;
      setUser({
          ...user,
          [name]: value,
      });
      console.log(name, value, user)
  };
  const onSubmit = async (e) => {
      e.preventDefault();
      setUser({ ...user, loading: true });
 
      try {
          await axios.post('/user/register', { ...user });
 
          localStorage.setItem('firstLogin', true);
          setUser({ ...user, loading: false });

          toast.success('Đăng kí thành công', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

            await makeTimer(1100)

          window.location.href = '/';
      } catch (err) {
 
          setUser({ ...user, loading: false });
          const msg = err.response.data.msg
          console.log(msg)
          if (msg) {
            toast.error(msg.code, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
          }
          if (user.email === '') {
              setErrors({ msg: 'Email not empty' });
          } else {
              if (user.name === '' && user.email !== '') {
                  setErrors({ msg: 'Name not empty' });
              } else {
                  setErrors(err.response.data);
              }
          }
      }
  };
  return (
      <div className="login register">
          <div 

          >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style = {{
                zIndex: '11'
            }}
            />
          </div>
          <div className="login-img">
              <img src={loginImg} alt="login-img"></img>
          </div>
          <div className="form-login">
              <h3 className="text"> BGCity </h3>
              <h4 className="heading">Mở tài khoản</h4>
              <p>Vui chơi, giải trí, thảo luận với thành viên khác trong nền tảng thương mại điện tử về boardgame duy nhất tại Việt Nam</p>
              <p style={{
                  opacity: 0.5,
                  marginTop: '1rem',
                  marginBottom: '1rem'
              }}>Thông tin đăng ký</p>
          <form
              noValidate
              autoComplete="off"
              onSubmit={onSubmit}
              style = {{
                  marginTop: '-10px'
              }}
          >
              <TextField
                  label="Name"
                  variant="outlined"
                  value={user.name}
                  onChange={onHandleChange}
                  name="name"
                  required={true}
                  className="form-input"
                  helperText={
                      errors.msg === 'Name not empty' ? errors.msg : ''
                  }
                  error={errors.msg === 'Name not empty' ? true : false}
                  autoComplete=""
              ></TextField>
              <TextField
                  label="Email"
                  variant="outlined"
                  value={user.email}
                  onChange={onHandleChange}
                  name="email"
                  className="form-input"
                  required={true}
                  helperText={
                      errors.msg === 'Email not empty' ? errors.msg : ''
                  }
                  error={errors.msg === 'Email not empty' ? true : false}
                  autoComplete=""
              />
              <TextField
                  label="Password (6+ Charactor)"
                  variant="outlined"
                  required={true}
                  value={user.password}
                  onChange={onHandleChange}
                  name="password"
                  type="password"
                  className="form-input"
                  autoComplete=""
                  helperText={
                      errors.msg === 'Mật khẩu không được nhỏ hơn 6 ký tự'
                          ? 'Password must not be less than 6 characters'
                          : ''
                  }
                  error={
                      errors.msg === 'Mật khẩu không được nhỏ hơn 6 ký tự'
                          ? true
                          : false
                  }
              />
              <TextField
                  label="Phone"
                  variant="outlined"
                  required={true}
                  value={user.phone}
                  onChange={onHandleChange}
                  name="phone"
                  type="phone"
                  className="form-input"
                  autoComplete=""
              />
              <TextField
                  label="Address"
                  variant="outlined"
                  required={true}
                  value={user.address}
                  onChange={onHandleChange}
                  name="address"
                  type="address"
                  className="form-input"
                  autoComplete=""
              />
              <div className="login-group">
                  <Button
                      variant="contained"
                      // color="primary"
                      type="submit"
                      onSubmit={onSubmit}
                      disabled={user.loading}
                      fullWidth
                      style={{
                          padding: '10px 0',
                          backgroundColor: '#f37435c4',
                          color: 'white'
                      }}
                  >
                      {user.loading ? (
                          <CircularProgress size={25} />
                      ) : (
                          'Đăng ký tài khoản Boardgame'
                      )}
                  </Button>
              </div>
          </form>
          </div>
      </div>
  );
}