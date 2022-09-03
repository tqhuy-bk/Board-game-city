import React from 'react';
import FooterBottomImage from './footer-bottom-img.png';

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col col-sm-12 col-md-6 col-lg-3 footer-about">
                        <h3 className="footer-hd">Board Game City</h3>
                        <ul>
                            {/* <li>We are awesome!</li>
                            <li>Join us and live like a king.</li>
                            <li>+490 54 324 77</li>
                            <li>POTSDAMER PLATZ 93564</li> */}
                            <button>Contact Us</button>
                        </ul>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-3 footer-tags">
                        <h3 className="footer-hd">Thanh Toán</h3>
                        <ul>
                            <li><img src={FooterBottomImage} alt="footerimg"></img></li>
                        </ul>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-3 footer-archive">
                        <h3 className="footer-hd">Trợ giúp</h3>
                        <ul>
                            <li className="footer-hve">
                                <p>Chính sách bảo mật</p>
                            </li>
                            <li className="footer-hve">
                                <p>Chính sách đổi trả</p>
                            </li>
                            <li className="footer-hve">
                                <p>Chính sách vận chuyển</p>
                            </li>
                            <li className="footer-hve">
                                <p>Điều khoản sử dụng</p>
                            </li>
                          
                        </ul>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-3">
                        <h3 className="footer-hd">Liên Hệ</h3>
                        <ul className="footer-channel">
                            <li>
                                <a
                                    href="https://www.facebook.com/profile.php?id=100005621687191"
                                    style={{
                                        marginBottom: '10px',
                                        display: 'block',
                                    }}
                                >
                                    <i className="fab fa-facebook-square"></i>{' '}
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/tqhuy-bk?tab=repositories">
                                    <i className="fab fa-github"></i> Git
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <ul className="footer-team">
                        <li className="footer-hve ">
                            <p>Designer Shoes</p>
                        </li>
                        <li className="footer-hve">
                            <p>Gallery</p>
                        </li>
                        <li className="footer-hve">
                            <p>Pricing</p>
                        </li>
                    </ul>
                    {/* <img src={FooterBottomImage} alt="footerimg"></img> */}
                    <div>Copyright@123</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;