(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./resources/js/components/CommentMedia.js":
/*!*************************************************!*\
  !*** ./resources/js/components/CommentMedia.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Img__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Img */ "./resources/js/components/Img.js");
/* harmony import */ var _svgs_DecoSVG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../svgs/DecoSVG */ "./resources/js/svgs/DecoSVG.js");
/* harmony import */ var _svgs_OptionsSVG__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../svgs/OptionsSVG */ "./resources/js/svgs/OptionsSVG.js");
/* harmony import */ var _svgs_HeartSVG__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../svgs/HeartSVG */ "./resources/js/svgs/HeartSVG.js");
/* harmony import */ var _svgs_HeartFilledSVG__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../svgs/HeartFilledSVG */ "./resources/js/svgs/HeartFilledSVG.js");









var CommentsMedia = function CommentsMedia(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "avatar-thumbnail-xs",
    style: {
      borderRadius: "50%"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/home/".concat(props.comment.user_id)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Img__WEBPACK_IMPORTED_MODULE_3__["default"], {
    src: props.comment.pp,
    width: "50px",
    height: "50px"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-1 flex-grow-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "media-heading m-0",
    style: {
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, props.comment.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, props.comment.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "ml-1",
    style: {
      color: "gold"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_DecoSVG__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1",
    style: {
      color: "inherit"
    }
  }, props.comment.decos)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "float-right text-secondary mr-1"
  }, props.comment.created_at)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mb-0"
  }, props.comment.text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      e.preventDefault();
      props.onCommentLike(props.comment.id);
    }
  }, props.comment.hasLiked ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      color: "#fb3958"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_HeartFilledSVG__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1",
    style: {
      color: "inherit"
    }
  }, props.comment.likes)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      color: "rgba(220, 220, 220, 1)"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_HeartSVG__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1",
    style: {
      color: "inherit"
    }
  }, props.comment.likes))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1"
  }, props.comment.comments), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropup float-right hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    role: "button",
    id: "dropdownMenuLink",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_OptionsSVG__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown-menu dropdown-menu-right",
    style: {
      borderRadius: "0",
      backgroundColor: "#232323"
    }
  }, props.comment.username == props.auth.username && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item",
    onClick: function onClick(e) {
      e.preventDefault();
      props.onDeleteComment(props.comment.id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, "Delete comment")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "float-right anti-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-secondary",
    onClick: function onClick() {
      if (props.comment.username == props.auth.username) {
        props.setBottomMenu("menu-open"); // Set Comment to edit so as to delete it as well

        props.setCommentToEdit(props.comment.id); // Show and Hide elements

        props.setCommentDeleteLink(true);
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_OptionsSVG__WEBPACK_IMPORTED_MODULE_5__["default"], null)))));
};

/* harmony default export */ __webpack_exports__["default"] = (CommentsMedia);

/***/ })

}]);