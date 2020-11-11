import React from 'react'
import { navigateTo } from '../../utils/router'

const Header = () => (
    <div className="header-main">
        <div className="header-title">
            <h1 className="site-title">
                <span onClick={() => navigateTo('/')}>
               <a href= "/">
                <img 
            src="https://i.ibb.co/F5RXKCR/truecaller-logo.png" 
            alt="Truecaller"
            />
             </a>
                </span>
            </h1>
        </div>
        <header className="header-image-container">
            <img 
            src="https://truecaller.blog/wp-content/uploads/2017/03/cropped-blog-header.png" 
            alt="Header"
            />
        </header>
    </div>
)
export default React.memo(Header)