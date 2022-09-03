(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./resources/js/components/KaraokeMedia.js":
/*!*************************************************!*\
  !*** ./resources/js/components/KaraokeMedia.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");



var KaraokeMedia = function KaraokeMedia(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "m-1",
    style: {
      borderRadius: "0px",
      textAlign: "center",
      width: "47%"
    },
    onClick: function onClick() {
      return props.setShow(0);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: props.link
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("video", {
    src: props.src,
    width: "100%",
    preload: "none",
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "m-0 pt-2 px-1",
    style: {
      width: "150px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip"
    }
  }, props.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "mt-0 mx-1 mb-2 px-1 py-0"
  }, props.username));
};

/* harmony default export */ __webpack_exports__["default"] = (KaraokeMedia);

/***/ })

}]);