import React from 'react';
function Footer() {
    return (
        <footer>
            <div className="icon-logo2">
                <img src="./img/logo.png" alt="" />
            </div>
            <div className="link">
                <ul className="link-footer">
                    <li><a href="/about-me">About me</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Link</a></li>
                    <li><a href="/">Link</a></li>
                </ul>
                <span className="author">&copy; by Group B</span>
                <span className="author">Xây dựng cộng đồng bloger phát triển.</span>
            </div>
        </footer>
    )
}
export default Footer;