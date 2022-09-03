import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import Tooltip from '@material-ui/core/Tooltip';
import makeTimer from '../../../utils'

import loadingimage from './loading.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import axios from 'axios';
// MUI stuff
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
function MyAccount() {
    const state = useContext(GlobleState);
    const [token] = state.token;
    const [user] = state.usersApi.user;
    const [callback, setCallback] = state.usersApi.callback;
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false);
    const history = useHistory();
    const [image, setImage] = useState(user.image);
    const [loading, setLoading] = useState(false);
    const initialStateInfo = {
        name: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        image: {},
    };

    const [newUser, setNewUser] = useState(initialStateInfo);
    const [context, setContext] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const onHandleChange = (e) => {
        let targets = e.target;
        let name = targets.name;
        let value = targets.value.toLowerCase();
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };
    const handleInput = (e) => {
        setContext({
            ...context,
            [e.target.name]: e.target.value.toLowerCase()
        });
    };
    const handleSubmitInfo = async (e) => {
        e.preventDefault();
        try {
            console.log("user_name",newUser)
            setLoadingUpdate(true)
            await axios.patch(
                `/user/infor/${user._id}`,
                newUser,
                {
                    headers: { Authorization: token },
                },
            );
            await makeTimer()
            setLoadingUpdate(false)
            setCallback(!callback);
            toast.success(`Cập nhật thông tin thành công`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            await makeTimer(2000)
            history.push('/myAccount');
        } catch (err) {
            toast.error(err.response.data.msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    };
    const [errors, setErrors] = useState({});
    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        try {
            if(context.newPassword !== context.confirmPassword){
                toast.error("Không trùng khớp", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            };
            setLoadingUpdatePassword(true)
            await axios.patch(
                `/user/changePassword`,
                context,
                {
                    headers: { Authorization: token },
                },
            );
            await makeTimer(2000)
            setLoadingUpdatePassword(false)
            setCallback(!callback);
            toast.success(`Cập nhật mật khẩu thành công`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            await makeTimer(2000)
            history.push('/myAccount');
        } catch (err) {
            toast.error(err.response.data.msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setNewUser(user)
    }, [user])

    let styleImaheUpload = {
        display: image ? 'block' : 'none',
    };

    const onHandleUpload = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return toast.error(`Tìm không thấy ảnh`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            if (file.size > 1024 * 1024) {
                // 1mb
                return toast.error(`Kích thước size quá lớn`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return toast.error(`Định dạng file không đúng`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            
            let formDate = new FormData();
            formDate.append('file', file);
            setLoading(true);
            console.log("formDate", formDate)
            const res = await axios.post('/api/upload', formDate, {
                headers: {
                    'content-type': 'multipart/from-data',
                    Authorization: token,
                },
            });
            
            setLoading(false);
            setImage(res.data);
            await axios.patch(
                `/user/infor/${user.id}`,
                {...newUser, image:res.data},
                {
                    headers: { Authorization: token },
                },
            );
            setCallback(!callback);
            return toast.success(`Cập nhập thành công`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } catch (err) {
            toast.error(err.response.data.msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    };
   return (
      <div className="wapper">
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
          <div className="titile__" >
              <div className="tittle-content">
                  <Link to="/" style= {{color: '#7b7b7b'}}>
                      Home
                  </Link>
                  <span> / </span>
                  <span>MyAccount</span>
              </div>
          </div>
          <div className="wapper-body">
              <br/>
              <br/>
              <div className ="information">
                  <div className="information-left">
                      <h3>Chỉnh sửa thông tin</h3>
                      <form
                          noValidate
                          autoComplete="off"
                          onSubmit= {handleSubmitInfo}
                          className="form-infor"
                      >
                        
                          <div className="form-title">
                              <label>Họ và tên</label>
                              <TextField
                                  label="Họ và tên"
                                  id="outlined-required"
                                  variant="outlined"
                                  name="name"
                                  className="form-input"
                                  value={newUser.name}
                                  onChange={onHandleChange}
                              />
                          </div>
                          <div className="form-title">
                              <label>Số điện thoại</label>
                              <TextField
                                  label="Số điện thoại"
                                  id="outlined-required"
                                  variant="outlined"
                                  name="phone"
                                  className="form-input"
                                  value={newUser.phone}
                                  onChange={onHandleChange}
                              />
                          </div>
                          <div className="form-title">
                              <label>Email</label>
                              <TextField
                                  label="Email"
                                  id="outlined-required"
                                  variant="outlined"
                                  name="email"
                                  className="form-input"
                                  value={newUser.email}
                                  onChange={onHandleChange}
                              />
                          </div>
                          <div className="form-title">
                              <label>Địa chỉ</label>
                              <TextField
                                  label="Địa chỉ"                                  
                                  id="outlined-required"
                                  variant="outlined"
                                  name="address"
                                  className="form-input"
                                  onChange={onHandleChange}
                                  value={newUser.address}
                              />
                          </div>
                        
                          <div className="login-group" style={{marginLeft:'15%'}}>
                              <Button
                                  variant="contained"
                                  type="submit"
                                
                                  className="update-infor-button"
                              >
                                      {loadingUpdate ? (
                        <CircularProgress size={25} />
                    ) : (
                        'Cập nhập thông tin'
                    )}
                                
                              </Button>
                          </div>
                      </form>
                  </div>
                  <div className="information-right">
                      <div className="upload-avatar">
                           <h3>Ảnh đại diện</h3>
                           {
                              
                               user.image ? (
                                   <>
                                       <img
                                            className="image-upload"
                                            style={styleImaheUpload}
                                            alt="img-upload"
                                            src={image ? image.url: ''}
                                       >
                                       </img>
                                       <input
                                        className="update-avatar"
                                        type="file"
                                        onChange={onHandleUpload}
                                       ></input>
                                   </>
                               ): (
                               <>
                                   <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1609941293/javcommerce/person_slkixq.jpg" alt="" className="information-left-image"/>
                                   <input
                                   className="update-avatar"
                                   type="file"
                                  
                                   onChange={onHandleUpload}
                                   ></input>
                                  
                               </>
                           )}
                           {/* <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1609941293/javcommerce/person_slkixq.jpg" alt="" className="information-left-image"/> */}
                          
                      </div>               
                   
                      <form
                          noValidate
                          autoComplete="off"
                          onSubmit={handleSubmitPassword}
                          className="form-infor"
                      >
                        
                          <div className="form-title">
                              <label>Mật khẩu cũ</label>
                              <TextField
                                  label="Mật khẩu cũ"                                  
                                  id="outlined-required"
                                  variant="outlined"
                                  className="form-input"
                                  type="password"
                                  name="oldPassword"
                                  required
                                  onChange={handleInput}
                              />
                          </div>
                          <div className="form-title">
                              <label>Mật khẩu mới</label>
                              <TextField
                                  label="Mật khẩu mới"                                  
                                  id="outlined-required"
                                  variant="outlined"
                                  className="form-input"
                                  type="password"
                                  name="newPassword"
                                  required
                                  onChange={handleInput}
                              />
                          </div>
                          <div className="form-title">
                              <label>Xác nhận mật khẩu</label>
                              <TextField
                                  label="password mới"                                  
                                  id="outlined-required"
                                  variant="outlined"
                                  className="form-input"
                                  type="password"
                                  name="confirmPassword"
                                  required
                                  onChange={handleInput}
                              />
                          </div>
                          <div className="login-group" style={{marginLeft:'15%'}}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    
                                    className="update-infor-button"
                                >
                                  {loadingUpdatePassword ? (
                                        <CircularProgress size={25} />
                                    ) : (
                                        'Cập nhập mật khẩu'
                                    )}           
                                
                              </Button>
                          </div>
                      </form>             
                  </div>
              </div>
              <br/>
              <br/>
          </div>
        
      </div>
  );
}
export default MyAccount;