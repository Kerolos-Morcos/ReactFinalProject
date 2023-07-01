import React from 'react'
import header from './header.module.css';
import LazyLoad from 'react-lazyload'

function Header() {
    return (
        <>
            {/* banner */}
            <LazyLoad once>
            <header className={header.equipments__banner}>
            </header>
            </LazyLoad>
            {/* end banner */}
        </>
    )
}

export default Header