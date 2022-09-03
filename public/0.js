(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/js/components/AvatarMedia.js":
/*!************************************************!*\
  !*** ./resources/js/components/AvatarMedia.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Img */ "./resources/js/components/Img.js");




var AvatarMedia = function AvatarMedia(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "m-0 p-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("center", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "avatar-thumbnail",
    style: {
      borderRadius: "50%"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile/" + props.user.username
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Img__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: props.user.pp,
    width: "150px",
    height: "150px"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "mt-2 mb-0",
    style: {
      width: "100px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip"
    }
  }, props.user.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    style: {
      width: "100px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip"
    }
  }, props.user.username)));
};

/* harmony default export */ __webpack_exports__["default"] = (AvatarMedia);

/***/ })

}]);