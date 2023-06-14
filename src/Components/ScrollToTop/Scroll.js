import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";

import ScrollStyle from "./scroll.module.css";

const Scroll = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className={ScrollStyle.top_to_btm}>
            {" "}
            {showTopBtn && (
                <FaAngleUp
                    className={`${ScrollStyle.icon_position} ${ScrollStyle.icon_style}`}
                    onClick={goToTop}
                />
            )}{" "}
        </div>
    );
};
export default Scroll;