(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./resources/js/components/VideoMediaVertical.js":
/*!*******************************************************!*\
  !*** ./resources/js/components/VideoMediaVertical.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_Img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Img */ "./resources/js/components/Img.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Button */ "./resources/js/components/Button.js");
/* harmony import */ var _svgs_CartSVG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../svgs/CartSVG */ "./resources/js/svgs/CartSVG.js");






var VideoMediaVertical = function VideoMediaVertical(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "mx-1 pt-0 px-0 pb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "thumbnail"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/video-show/".concat(props.video.id)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Img__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: props.video.thumbnail.match(/http/) ? props.video.thumbnail : "storage/".concat(props.video.thumbnail),
    width: "160em",
    height: "90em"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/video-show/".concat(props.video.id)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "m-0 pt-2 px-1",
    style: {
      width: "150px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip"
    }
  }, props.video.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "mt-0 mx-1 mb-2 px-1 py-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, props.video.username, " ", props.video.ft))), props.video.inCart ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn mb-1 rounded-0 text-light",
    style: {
      minWidth: '90px',
      height: '33px',
      backgroundColor: "#232323"
    },
    onClick: function onClick() {
      return props.onCartVideos(props.video.id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_CartSVG__WEBPACK_IMPORTED_MODULE_4__["default"], null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "mysonar-btn white-btn mb-1",
    style: {
      minWidth: '90px',
      height: '33px'
    },
    onClick: function onClick() {
      return props.onCartVideos(props.video.id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_CartSVG__WEBPACK_IMPORTED_MODULE_4__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    btnClass: 'btn mysonar-btn green-btn btn-2',
    btnText: 'KES 20',
    onClick: function onClick() {
      return onBuyVideos(props.video.id);
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (VideoMediaVertical);

/***/ })

}]);