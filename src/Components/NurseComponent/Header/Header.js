import React from "react";
import hesderStyle from "../Header/Header.module.css";
import LazyLoad from "react-lazyload";

export default function header() {
  return (
      <LazyLoad once>
    <header className={hesderStyle.header}>
      <div className={"container-fluid"}>
        <div className={"row"}></div>
      </div>
    </header>
      </LazyLoad>
  );
}
