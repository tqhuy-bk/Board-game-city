import React, { useContext, useEffect, useState } from 'react';
import { GlobleState } from '../../../GlobleState';
import ProductItem from '../utils/productItem/ProductItem';
import Filter from '../filter/Filter';
import LoadMore from '../loadMore/LoadMore';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    const state = useContext(GlobleState);
    const [products, setProducts] = state.productsApi.products;
    const loadingAPI = state.productsApi.loadingAPI[0];
    const setCategory = state.productsApi.category[1];
    const [isAdmin] = state.usersApi.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsApi.callback;
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


  

    useEffect(() => {
        setCategory('');
        window.scrollTo(0, 0);
    }, [setCategory]);

    const deleteProduct = async (id, image_id) => {
        try {
            setLoading(true);
            await axios.post(
                '/api/destroy',
                { public_id: image_id },
                {
                    headers: { Authorization: token },
                },
            );
            await axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token },
            });
            setLoading(false);
            setCallback(!callback);
            toast.success(`Xóa sản phẩm thành công`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } catch (err) {
            console.log(err.response.data);
        }
    };
    const handleCheckProduct = async (id) => {
        let flag = true;
        Object.values(products).forEach((product) => {
            if (product._id === id) {
                if (product.checked === true) {
                    flag = false;
                }
                return (product.checked = !product.checked);
            }
            if (product.checked === false) {
                flag = false;
            }
        });
        if (flag) setIsChecked(true);
        else setIsChecked(false);
        setProducts(products);
    };
    const handleCheckAll = async () => {
        Object.values(products).forEach((product) => {
            return (product.checked = !isChecked);
        });
        setIsChecked(!isChecked);
    };
    const deleteAll = async () => {
        products.forEach((product) => {
            if (product.checked) {
                return deleteProduct(product._id, product.image.public_id);
            }
        });
        setIsChecked(false);
    };
    if (products.length === 0) {
        var styleProducts = {
            marginBottom: '1000px',
        };
    }
    if (loading) {
        return <div className="loading-products"> loading...</div>;
    } else {
        return (
            <React.Fragment>
                <div className="container" style={styleProducts}>
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
                    {isAdmin && (
                        <div className="select-all">
                            
                            <label htmlFor="selectAll">Chọn tất cả</label>
                            <input
                                type="checkbox"
                                id="selectAll"
                                checked={isChecked}
                                onChange={handleCheckAll}
                            ></input>
                            
                            
                            <button
                                className="delete-all-button"
                                onClick={deleteAll}
                            >
                                Xoá tất cả
                            </button>
                        </div>
                    )}
                    <Filter />
                    <div className="row">
                        {products.length === 0 ? (
                            <div className="loading-products"> Không tìm thấy</div>
                        ) : loadingAPI ? (
                            <div className="loading-products"> Đang tải ...</div>
                        ) : (
                            products && Object.values(products).map((product, index) => {
                                return (
                                    <ProductItem
                                        product={product}
                                        key={index}
                                        isAdmin={isAdmin}
                                        deleteProduct={deleteProduct}
                                        handleCheckProduct={handleCheckProduct}
                                    />
                                );
                            })
                        )}
                    </div>
                    {loadingAPI ? '' : <LoadMore />}
                </div>
            </React.Fragment>
        );
    }
}