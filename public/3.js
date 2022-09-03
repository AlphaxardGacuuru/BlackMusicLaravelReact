(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./resources/js/components/MusiciansHorizontal.js":
/*!********************************************************!*\
  !*** ./resources/js/components/MusiciansHorizontal.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_Img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Img */ "./resources/js/components/Img.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Button */ "./resources/js/components/Button.js");
/* harmony import */ var _svgs_CheckSVG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../svgs/CheckSVG */ "./resources/js/svgs/CheckSVG.js");






var MusiciansHorizontal = function MusiciansHorizontal(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-flex justify-content-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile/".concat(props.user.username)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Img__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: props.user.pp,
    imgClass: "rounded-circle",
    width: "30px",
    height: "30px",
    alt: "user"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
    className: "ml-2"
  }, props.user.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, props.user.username)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-2"
  }, props.user.hasBought1 || props.auth.username == "@blackmusic" ? props.user.hasFollowed ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: 'btn float-right rounded-0 text-light',
    style: {
      backgroundColor: "#232323"
    },
    onClick: function onClick() {
      return props.onFollow(props.user.username);
    }
  }, "Followed", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_CheckSVG__WEBPACK_IMPORTED_MODULE_4__["default"], null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    btnClass: 'mysonar-btn white-btn float-right',
    onClick: function onClick() {
      return props.onFollow(props.user.username);
    },
    btnText: 'follow'
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    btnClass: 'mysonar-btn white-btn float-right',
    onClick: function onClick() {
      return props.setErrors(["You must have bought atleast one song by ".concat(props.user.username)]);
    },
    btnText: 'follow'
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (MusiciansHorizontal);

/***/ })

}]);