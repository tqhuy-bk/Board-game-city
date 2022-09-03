import { CircularProgress } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory, useParams } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import loadingimage from './loading.gif';
import makeTimer from '../../../utils'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

 
function handleCategory(categories, product, isEdit) {
   return categories.map((category) => {
       if (isEdit && category._id.toLowerCase() == product.category.toLowerCase()) {
           return (
               <option
                   selected
                   value={category._id}
                   key={category._id}
               >
                   {category.name}
               </option>
           );
       } else {
           return (
               <option
                   value={category._id}
                   key={category._id}
               >
                   {category.name}
               </option>
           );
       }
   })
}
function CreateProduct() {
    const params = useParams();
    var initialState = {
        name: '',
        age: '',
        category: '',
        desc: '',
        level: '',
        numPlayerFrom: '',
        numPlayerTo: '',
        playingTime: '',
        price: '',
        image: {},
    };
    const history = useHistory();
    const state = useContext(GlobleState);
    const [categories] = state.categoriesApi.categories;
    const [products] = state.productsApi.products;
    const [callback, setCallback] = state.productsApi.callback;
    const [isAdmin] = state.usersApi.isAdmin;
    const [token] = state.token;
    const [product, setProduct] = useState(initialState);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingTwo, setLoadingTwo] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        if (params.id) {
            products && Object.values(products).forEach((product) => {
                if (product._id == params.id) {
                    setProduct(product);
                    setImage(product.image);
                    setOnEdit(true);
                }
            });
        } else {
            setProduct(initialState);
            setImage(false);
            setOnEdit(false);
        }
    }, [params.id, products]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                setLoadingTwo(true)
                await axios.put(
                    `/api/products/${product._id}`,
                    {...product, image, price: Number(product.price), desc: product.desc.charAt(0).toUpperCase() + product.desc.slice(1)},
                    {
                        headers: { Authorization: token },
                    },
                );
                toast.success(`Chỉnh sửa sản phẩm ${product.name} thành công`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                await makeTimer(2000)
                setLoadingTwo(false)
                setCallback(!callback);
                history.push('/');
            } else {
                setLoadingTwo(true)
                await axios.post(
                    '/api/products',
                    {...product, image, price: Number(product.price), desc: product.desc.charAt(0).toUpperCase() + product.desc.slice(1)},
                    {
                        headers: { Authorization: token },
                    },
                );
                toast.success(`Thêm sản phẩm ${product.name} thành công`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                await makeTimer(2000)
                setLoadingTwo(false)
                setCallback(!callback);
                history.push('/');
            }
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
    const onHandleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value.toLowerCase()
        });
    };
  const onHandleUpload = async (e) => {
      e.preventDefault();
      try {
          const file = e.target.files[0];
          if (!file) {
              return toast.warn('Không tìm thấy ảnh.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            }
          if (file.size > 1024 * 1024) {
              // 1mb
              return toast.warn('Kích thước quá lớn.', {
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
              // 1mb
            //   return alert('File format is incorrect.');
              return toast.warn('Tập tin không đúng định dạng.', {
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
          
          const res = await axios.post('/api/upload', formDate, {
              headers: {
                  'content-type': 'multipart/from-data',
                  Authorization: token,
              },
          });
          setLoading(false);
          setImage(res.data);
          toast.success(`Thêm ảnh thành công`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      } catch (err) {
        //   alert(err.response.data.msg);
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
  const handleDestroyImage = async () => {
      try {
        //   if (!isAdmin) return alert("You're not an admin.");
          setLoading(true);
          await axios.post(
              '/api/destroy',
              { public_id: image.public_id },
              {
                  headers: { Authorization: token },
              },
          );
          setLoading(false);
          setImage(false);
          toast.success(`Xóa ảnh thành công`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      } catch (err) {
        //   alert(err.response.data.msg);
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
  let styleImaheUpload = {
      display: image ? 'block' : 'none',
  };
  return (
      <div className="create-product container" id = "create-product-container">
          <div
            style={{
                display: 'none'
            }}
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
          <div className="cp-image-upload-box">
              {loading ? (
                  <div className="cp-loading-image">
                      {' '}
                      <img src={loadingimage} alt="loading-img"></img>
                  </div>
              ) : (
                  <>
                      <input
                          type="file"
                          className="cp-file-upload"
                          name="file"
                          id="file_up"
                          onChange={onHandleUpload}
                      ></input>
                      <img
                          className="cp-image-upload"
                          style={styleImaheUpload}
                          alt="img-upload"
                          src={image ? image.url : ''}
                      ></img>
                      {image ? (
                          <Tooltip title="Delete Image" placement="top">
                              <span
                                  className="cp-image-button"
                                  onClick={handleDestroyImage}
                              >
                                  X
                              </span>
                          </Tooltip>
                      ) : (
                          ''
                      )}
                  </>
              )}
          </div>
       
          <div className ="div-form">
              <form onSubmit={handleSubmit} className = "form-create-edit">
                  <div className="ten-cate">
                      <div className="mb-3" id ="ten">
                          <label htmlFor="name" className="form-label">
                              Tên
                          </label>
                          <input
                              type="text"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.name}
                              id="name"
                              name="name"
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label
                              htmlFor="category"
                              className="form-label"
                              style={{ marginRight: '20px' }}
                          >
                              Phân loại
                          </label>
                          <select
                              name="category"
                              id="category"
                              onChange={onHandleChange}

                          >
                              {handleCategory(categories && Object.values(categories), product, onEdit)}
                              </select>
                              </div>
                  </div>
               
                  <div>
                      <div className="mb-3">
                          <label htmlFor="price" className="form-label">
                              Giá tiền
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.price}
                              id="price"
                              name="price"
                              required
                          />
                      </div>
                      <div>USD</div>
                  </div>
               
                  <div className="motcaidivtodung">
                      <div className="mb-3 mr-3">
                          <label htmlFor="bust" className="form-label">
                              Số người chơi tối thiểu
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.numPlayerFrom}
                              id="bust"
                              name="numPlayerFrom"
                              required
                          />
                      </div>
                      <div className="mb-3 mr-3">
                          <label htmlFor="waist" className="form-label">
                              tối đa
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.numPlayerTo}
                              id="waist"
                              name="numPlayerTo"
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="japanName" className="form-label">
                              Thời gian chơi
                          </label>
                          <input
                              type="text"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.playingTime}
                              id="japanName"
                              name="playingTime"
                              required
                          />
                      </div>
                      <div>phút</div>
                  </div>
                  <div className="motcaidivvuavua">
                      <div className="mb-3 mr-3">
                          <label htmlFor="hip" className="form-label">
                              Độ tuổi từ
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.age}
                              id="hip"
                              name="age"
                              required
                          />
                      </div>
                      <div className="mb-3 mr-3">
                          <label htmlFor="height" className="form-label">
                              Độ khó
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.level}
                              id="height"
                              name="level"
                              required
                          />
                      </div>
                  </div>
                  <div className="mb-3 mt-3">
                      <label htmlFor="hobby" className="form-label">
                          Mô tả
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          onChange={onHandleChange}
                          value={product.desc.charAt(0).toUpperCase() + product.desc.slice(1)}
                          id="hobby"
                          name="desc"
                          required
                      />
                  </div>
               
               
                  <button type="submit" className="cp-button">
                  {loadingTwo ? (
                         <CircularProgress size={25} />
                     ) :
                     onEdit ? 'Cập nhật' : 'Tạo'
                   }
                  </button>
              </form>
          </div>
       
      </div>
  );
}
export default CreateProduct;