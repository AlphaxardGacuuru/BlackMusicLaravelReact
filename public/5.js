(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    [5],
    {
        /***/ "./resources/js/components/AudioMediaHorizontal.js":
            /*!*********************************************************!*\
  !*** ./resources/js/components/AudioMediaHorizontal.js ***!
  \*********************************************************/
            /*! exports provided: default */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! react */ "./node_modules/react/index.js"
                );
                /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                    react__WEBPACK_IMPORTED_MODULE_0__
                );
                /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                    /*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js"
                );
                /* harmony import */ var _components_Img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                    /*! @/components/Core/Img */ "./resources/js/components/Img.js"
                );
                /* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                    /*! @/components/Button */ "./resources/js/components/Button.js"
                );
                /* harmony import */ var _svgs_CartSVG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
                    /*! @/svgs/CartSVG */ "./resources/js/svgs/CartSVG.js"
                );

                var AudioMediaHorizontal = function AudioMediaHorizontal(
                    props
                ) {
                    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        "div",
                        {
                            className: "d-flex p-2"
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            "div",
                            {
                                className: "thumbnail",
                                style: {
                                    width: "50px",
                                    height: "50px"
                                }
                            },
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                react_router_dom__WEBPACK_IMPORTED_MODULE_1__[
                                    "Link"
                                ],
                                {
                                    to: "/audio-show/".concat(props.audio.id),
                                    onClick: function onClick() {
                                        props.setShow(props.audio.id);
                                        props.setLocalStorage("show", {
                                            id: props.audio.id,
                                            time: 0
                                        });
                                    }
                                },
                                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                    _components_Img__WEBPACK_IMPORTED_MODULE_2__[
                                        "default"
                                    ],
                                    {
                                        src: "/storage/".concat(
                                            props.audio.thumbnail
                                        ),
                                        width: "100%",
                                        height: "50px"
                                    }
                                )
                            )
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            "div",
                            {
                                className: "p-2 mr-auto"
                            },
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                "span",
                                {
                                    style: {
                                        cursor: "pointer"
                                    },
                                    onClick: function onClick() {
                                        props.setShow(props.audio.id);
                                        props.setLocalStorage("show", {
                                            id: props.audio.id,
                                            time: 0
                                        });
                                    }
                                },
                                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                    "h6",
                                    {
                                        className: "mb-0 pb-0",
                                        style: {
                                            maxWidth: "7em",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "clip"
                                        }
                                    },
                                    props.audio.name
                                ),
                                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                    "h6",
                                    {
                                        className: "mt-0 pt-0",
                                        style: {
                                            maxWidth: "7em",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "clip"
                                        }
                                    },
                                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                        "small",
                                        null,
                                        props.audio.username
                                    ),
                                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                        "small",
                                        {
                                            className: "ml-1"
                                        },
                                        props.audio.ft
                                    )
                                )
                            )
                        ),
                        !props.audio.hasBought
                            ? props.audio.inCart
                                ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                      "div",
                                      null,
                                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                          "button",
                                          {
                                              className:
                                                  "btn text-light rounded-0",
                                              style: {
                                                  minWidth: "40px",
                                                  height: "33px",
                                                  backgroundColor: "#232323"
                                              },
                                              onClick: function onClick() {
                                                  return props.onCartAudios(
                                                      props.audio.id
                                                  );
                                              }
                                          },
                                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                              _svgs_CartSVG__WEBPACK_IMPORTED_MODULE_4__[
                                                  "default"
                                              ],
                                              null
                                          )
                                      )
                                  )
                                : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                      react__WEBPACK_IMPORTED_MODULE_0___default
                                          .a.Fragment,
                                      null,
                                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                          "div",
                                          null,
                                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                              "button",
                                              {
                                                  className:
                                                      "mysonar-btn white-btn",
                                                  style: {
                                                      minWidth: "40px",
                                                      height: "33px"
                                                  },
                                                  onClick: function onClick() {
                                                      return props.onCartAudios(
                                                          props.audio.id
                                                      );
                                                  }
                                              },
                                              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                                  "svg",
                                                  {
                                                      className: "bi bi-cart3",
                                                      width: "1em",
                                                      height: "1em",
                                                      viewBox: "0 0 16 16",
                                                      fill: "currentColor",
                                                      xmlns:
                                                          "http://www.w3.org/2000/svg"
                                                  },
                                                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                                      "path",
                                                      {
                                                          fillRule: "evenodd",
                                                          d:
                                                              "M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                                                      }
                                                  )
                                              )
                                          )
                                      ),
                                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                          "div",
                                          {
                                              className: "ml-2"
                                          },
                                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                              _components_Button__WEBPACK_IMPORTED_MODULE_3__[
                                                  "default"
                                              ],
                                              {
                                                  btnClass:
                                                      "btn mysonar-btn green-btn btn-2 float-right",
                                                  btnText: "KES 10",
                                                  onClick: function onClick() {
                                                      return props.onBuyAudios(
                                                          props.audio.id
                                                      );
                                                  }
                                              }
                                          )
                                      )
                                  )
                            : ""
                    );
                };

                /* harmony default export */ __webpack_exports__[
                    "default"
                ] = AudioMediaHorizontal;

                /***/
            }
    }
]);
