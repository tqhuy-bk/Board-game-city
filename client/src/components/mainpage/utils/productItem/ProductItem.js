import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { GlobleState } from '../../../../GlobleState';
export default function ProductItem({
    product,
    isAdmin,
    deleteProduct,
    handleCheckProduct,
}) {
const state = useContext(GlobleState);
const addCart = state.usersApi.addCart;
const [openModal, setOpenModal] = useState(false);
const openModel = () => {
    setOpenModal(true);
};
const closeModal = () => {
    setOpenModal(false);
};
const onHandleChange = () => {
    handleCheckProduct(product._id);
};
return (
    <React.Fragment>
        <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="prouduct_cart">
                {isAdmin ? (
                    <input
                        type="checkbox"
                        checked={product.checked}
                        className="prouduct_cart-checkbox"
                        onChange={onHandleChange}
                    ></input>
                ) : (
                    ''
                )}
                <Link to={`/detail/${product._id}`}>
                    <img
                        src={product.image.url}
                        // src="https://cf.shopee.vn/file/56cf50a0c4d9180078ff62fa4f9a47b7"
                        alt="product-item"
                        className="product-img"
                    ></img>
                </Link>
                <div className="content">
                    <Link to={`/detail/${product._id}`}>
                        <div className="product-name">{product.name}</div>
                    </Link>
                    {isAdmin ? (
                        ''
                    ) : (
                        <>
                            <div className="price">
                                ${product.price}
                            </div>
                            <div
                                className="btn-addtocart"
                                onClick={() => addCart(product)}
                            >
                                Thêm vào giỏ hàng
                            </div>
                        </>
                    )}
                </div>
                <button className="quick-look" onClick={openModel}>
                    <div>Xem nhanh</div>
                </button>
                <button
                    className="rp-btn-addtocart"
                    onClick={() => addCart(product)}
                >
                    <div>Thêm vào giỏ hàng</div>
                </button>
            </div>
            {isAdmin ? (
                <div className="product_admin-btn">
                    <div
                        className="product_admin-delete"
                        onClick={() =>
                            deleteProduct(
                                product._id,
                                product.image.public_id,
                            )
                        }
                    >
                        Xoá
                    </div>
                    <div className="product_admin-edit">
                        {' '}
                        <Link
                            to={`/product/edit/${product._id}`}
                            style={{ color: 'white' }}
                        >
                            Chỉnh sửa
                        </Link>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className={openModal ? 'modal modal-show' : 'modal'}>
                <div className="modal-content">
                    <div className="btn-close-modal" onClick={closeModal}>
                        &times;
                    </div>
                <div className="card__body">
                    <div className="card__body-left">
                        {product.image ? (
                            <img
                              //   src="https://cf.shopee.vn/file/56cf50a0c4d9180078ff62fa4f9a47b7"
                                src={product.image.url}
                                alt="product-detail"
                            ></img>
                        ) : (
                          <img
                          //   src="https://cf.shopee.vn/file/56cf50a0c4d9180078ff62fa4f9a47b7"
                            src="https://bgvnpicture.s3-ap-southeast-1.amazonaws.com/old/stories/images/uno-mattel-4.jpg"
                            alt="product-detail"
                        ></img>
                        )}
                    </div>
                    <div className="card__body-right card__body-right--a">
                        <div className="modal-wrapper" >
                            <Link to={`/detail/${product._id}`} className="modal-name">
                                {product.name}
                                </Link>
                            {/* <h5 ></h5> */}
                            <p className="modal-price">
                                ${product.price}
                            </p>
                        </div>
                        <div className="modal-list">
                            <div className="modal-item">
                                <div className="modal-image">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="modal-desc">
                                    <p>Số người chơi</p>
                                    <p style ={{fontWeight: 'bold'}}>{`${product.numPlayerFrom} - ${product.numPlayerTo}`}</p>
                                </div>
                            </div>
                            <div className="modal-item">
                                <div className="modal-image">
                                    <i className="fa fa-clock"></i>
                                </div>
                                <div className="modal-desc">
                                    <p>Thời gian chơi</p>
                                    <p style={{fontWeight: 'bold'}}>{`${product.playingTime}p`}</p>
                                </div>
                            </div>
                            <div className="modal-item">
                                <div className="modal-image">
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="modal-desc">
                                    <p>Độ tuổi</p>
                                    <p style={{fontWeight: 'bold'}}>{product.age}</p>
                                </div>
                            </div>
                            <div className="modal-item">
                                <div className="modal-image">
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="modal-desc">
                                    <p>Độ khó</p>
                                    <p style={{fontWeight: 'bold'}}>{product.level}</p>
                                </div>
                            </div>
                        </div>
                        <p className="modal-text">{product.desc.charAt(0).toUpperCase() + product.desc.slice(1)}</p>
                        {isAdmin ? (
                            <div
                                className="product_admin-btn"
                                style={{ marginTop: '20px'}}
                            >
                                <div
                                    style = {{
                                        borderRadius: '8px',
                                        marginLeft: '24px',
                                        marginRight: '20px'
                                    }}
                                    onClick={() =>
                                        deleteProduct(
                                            product._id,
                                            product.image,
                                        )
                                    }
                                >
                                    Xoá
                                </div>
                                <div style={{  borderRadius: '8px', marginLeft: '12px', }}>
                                    <a
                                        href={`/product/edit/${product._id}`}
                                        style={{color: 'white'}}
                                    >
                                        Chỉnh sửa
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="product_user-btn"
                            style={{marginTop: "20px"}}>
                                 <div
                                     className="card_btn-addtocart"
                                     onClick={() => addCart(product)}
                                     //    style = {{
                                     //        margin: "0 auto"
                                     //    }}
                                 >
                                     Thêm vào giỏ hàng
                                 </div>
                            </div>
                         
                        )}
                    </div>
                </div>
                {/* <div>
                    {isAdmin ? (
                            <div
                                className="product_admin-btn"
                                style={{ marginTop: '20px'}}
                            >
                                <div
                                    style = {{
                                        borderRadius: '8px',
                                        marginLeft: '24px',
                                        marginRight: '20px'
                                    }}
                                    onClick={() =>
                                        deleteProduct(
                                            product._id,
                                            product.images.public_id,
                                        )
                                    }
                                >
                                    Delete
                                </div>
                                <div style={{  borderRadius: '8px', marginLeft: '12px', }}>
                                    <a
                                        href={`/product/edit/${product._id}`}
                                        style={{color: 'white'}}
                                    >
                                        Edit
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="card_btn-addtocart"
                                onClick={() => addCart(product)}
                            >
                                Add To Cart
                            </div>
                        )}   
                </div> */}
                </div>
            </div>
        </div>
    </React.Fragment>
);
}