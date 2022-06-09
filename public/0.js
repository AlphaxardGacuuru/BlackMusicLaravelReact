(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/js/components/VideoMediaHorizontal.js":
/*!*********************************************************!*\
  !*** ./resources/js/components/VideoMediaHorizontal.js ***!
  \*********************************************************/
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






var VideoMediaHorizontal = function VideoMediaHorizontal(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-flex p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "thumbnail",
    onClick: function onClick() {
      return props.setShow(0);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: props.link
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Img__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: props.thumbnail,
    width: "160em",
    height: "90em"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ml-2 mr-auto flex-grow-1",
    onClick: function onClick() {
      return props.setShow(0);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: props.link
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "mb-0",
    style: {
      width: "7em",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip"
    }
  }, props.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "mb-3",
    style: {
      width: "7em",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, props.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1"
  }, props.ft))), props.showCartandBuyButton ? props.hasBoughtVideo ? props.videoInCart ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn text-light mb-1 rounded-0",
    style: {
      minWidth: '40px',
      height: '33px',
      backgroundColor: "#232323"
    },
    onClick: function onClick() {
      return props.onCartVideos(props.videoId);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_CartSVG__WEBPACK_IMPORTED_MODULE_4__["default"], null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "mysonar-btn white-btn mb-1",
    style: {
      minWidth: '40px',
      height: '33px'
    },
    onClick: function onClick() {
      return props.onCartVideos(props.videoId);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_CartSVG__WEBPACK_IMPORTED_MODULE_4__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    btnClass: 'btn mysonar-btn green-btn btn-2 float-right',
    btnText: 'KES 20',
    onClick: function onClick() {
      return props.onBuyVideos(props.videoId);
    }
  })) : "" : ""));
};

VideoMediaHorizontal.defaultProps = {
  link: '/',
  thumbnail: '/',
  name: 'name',
  username: 'username',
  ft: 'ft',
  hasBoughtVideo: true,
  videoInCart: true,
  videoId: 1,
  showCartandBuyButton: true
};
/* harmony default export */ __webpack_exports__["default"] = (VideoMediaHorizontal);

/***/ })

}]);