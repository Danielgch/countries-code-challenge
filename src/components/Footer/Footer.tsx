import React from "react";
import "./Footer.scss";


const Footer = () => {
    return (
        <footer>
            <div className="container-footer">
                <div className="container-footer__row">
                    <ul className="container-footer__ul">
                        <li className="container-footer__firtsli">
                            <span>{'By Daniel Giraldo'}</span>
                        </li>
                        <li className="container-footer__secondli">
                            Code Challenge {new Date().getFullYear()}
                        </li>
                    </ul>

                </div>
            </div>
        </footer>
    )

}

export default Footer;