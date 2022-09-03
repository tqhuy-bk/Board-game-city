import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import ProductItem from '../utils/productItem/ProductItem';
import Cart from '../../../components/header/icons/cart.svg'
function DetailsProduct() {
let params = useParams();
const state = useContext(GlobleState);
const [products] = state.productsApi.products;
const [detailProduct, setDetailProduct] = useState({});
const [isAdmin] = state.usersApi.isAdmin;
const addCart = state.usersApi.addCart;
 
// Component did mount
useEffect(() => {
   if (params) {
       Object.values(products).forEach((product) => {
           if (product._id == params.id) {
               setDetailProduct(product);
           }
       });
   }
}, [params, products]);
 
useEffect(() => {
   window.scrollTo(0, 0);
}, [detailProduct]);
return (
   <div style = {{backgroundColor: '#E8E9A1', paddingTop: '2rem'}}>
       <div className="card-product">
           {detailProduct.length !== 0 && (
           <div className="card__body">
               <div className="card__body-left">
                   {detailProduct.image  ? (
                       <img
                           src={detailProduct.image.url}
                           alt="product-detail"
                       ></img>
                   ) : (
                       <img
                           src="https://bgvnpicture.s3-ap-southeast-1.amazonaws.com/old/stories/images/uno-mattel-4.jpg"
                           alt="product-detail"
                       ></img>
                   )}
               </div>
               <div className="card__body-right">
                   <div className="modal-wrapper" >
                       <h5 className="modal-name">{detailProduct.name}</h5>
                       <p className="modal-price">
                           $ {detailProduct.price}
                       </p>
                   </div>
                   <div className="modal-list">
                       <div className="modal-item">
                           <div className="modal-image">
                               <i className="fa fa-user"></i>
                           </div>
                           <div className="modal-desc">
                               <p>Số người chơi</p>
                               <p style ={{fontWeight: 'bold'}}>{`${detailProduct.numPlayerFrom} - ${detailProduct.numPlayerTo}`}</p>
                           </div>
                       </div>
                       <div className="modal-item">
                           <div className="modal-image">
                               <i className="fa fa-clock"></i>
                           </div>
                           <div className="modal-desc">
                               <p>Thời gian chơi</p>
                               <p style={{fontWeight: 'bold'}}>{`${detailProduct.playingTime}p`}</p>
                           </div>
                       </div>
                       <div className="modal-item">
                           <div className="modal-image">
                               <i className="fa fa-star"></i>
                           </div>
                           <div className="modal-desc">
                               <p>Độ tuổi</p>
                               <p style={{fontWeight: 'bold'}}>{detailProduct.age}</p>
                           </div>
                       </div>
                       <div className="modal-item">
                           <div className="modal-image">
                               <i className="fa fa-star"></i>
                           </div>
                           <div className="modal-desc">
                               <p>Độ khó</p>
                               <p style={{fontWeight: 'bold'}}>{detailProduct.difficultLevel}</p>
                           </div>
                       </div>
                   </div>
                   <p className="modal-text">{detailProduct.description}</p>
               </div>
           </div>
           )}
           <div className="card__bottom">
               <Link to="/" className="icon">
                   <i className="fa fa-arrow-left"></i>
               </Link>
               {isAdmin ? (
                       <div className="card_btn-addtocart"
                           style={{margin: "o auto"}}
                       >
                       <i className="fa fa-edit" aria-hidden="true"></i>                      
                           <Link
                               to={`/product/edit/${detailProduct._id}`}
                               style={{marginLeft: '1rem',fontSize: '1rem', color: 'black'}}
                           >
                               Chỉnh Sửa
                           </Link>
                       </div>
               ) : (
                   <div
                       className="card_btn-addtocart"
                       onClick={() => addCart(detailProduct)}
                       style={{margin: "0 auto",}}
                   >
                       <img src={Cart} alt="cart" style={{fontSize: '5px', width: '30px', height: '30px'}}></img>
                       <span > Chọn mua </span>
                   </div>
               )}            
           </div>
       <div className="related-products container">
           <h2>Các sản phẩm liên quan</h2>
           <div className="row">
           {products.length > 0 && Object.keys(detailProduct).length !== 0 && Object.values(products).map((product, index) => {
                  if (product.category.toLowerCase() == detailProduct.category.toLowerCase()) {
                    //   if (index <= 7) {
                          return (
                              <ProductItem
                                  product={product}
                                  key={index}
                              />
                          );
                    //   }
                  }
                  return null;
              })}

           </div>
       </div>
   </div>
</div>
);
}
 
export default DetailsProduct;