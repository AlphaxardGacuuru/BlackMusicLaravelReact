(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./resources/js/components/Polls.js":
/*!******************************************!*\
  !*** ./resources/js/components/Polls.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Button */ "./resources/js/components/Button.js");



var Polls = function Polls(props) {
  // Function for voting in poll
  var onPoll = function onPoll(post, parameter) {
    axios.get('sanctum/csrf-cookie').then(function () {
      axios.post("/api/polls", {
        post: post,
        parameter: parameter
      }).then(function (res) {
        props.setMessages([res.data]); // Update posts

        axios.get("/api/posts").then(function (res) {
          return props.setPosts(res.data);
        });
      })["catch"](function (err) {
        var resErrors = err.response.data.errors;
        var resError;
        var newError = [];

        for (resError in resErrors) {
          newError.push(resErrors[resError]);
        } // Get other errors


        newError.push(err.response.data.message);
        props.setErrors(newError);
      });
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, props.post.parameter_1 ? props.post.isWithin24Hrs ? props.post.hasVoted1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn btn-2 mb-1",
    btnText: props.post.parameter_1,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_1);
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn white-btn mb-1",
    btnText: props.post.parameter_1,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_1);
    }
  }) : props.post.hasVoted1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage1, "%"),
      backgroundColor: "#232323"
    }
  }, props.post.parameter_1)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage1, "%"),
      backgroundColor: "grey"
    }
  }, props.post.parameter_1)) : "", props.post.parameter_2 ? props.post.isWithin24Hrs ? props.post.hasVoted2 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn mb-1 btn-2",
    btnText: props.post.parameter_2,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_2);
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn white-btn mb-1",
    btnText: props.post.parameter_2,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_2);
    }
  }) : props.post.hasVoted2 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage2, "%"),
      backgroundColor: "#232323"
    }
  }, props.post.parameter_2)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage2, "%"),
      backgroundColor: "grey"
    }
  }, props.post.parameter_2)) : "", props.post.parameter_3 ? props.post.isWithin24Hrs ? props.post.hasVoted3 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn mb-1 btn-2",
    btnText: props.post.parameter_3,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_3);
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn white-btn mb-1",
    btnText: props.post.parameter_3,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_3);
    }
  }) : props.post.hasVoted3 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage3, "%"),
      backgroundColor: "#232323"
    }
  }, props.post.parameter_3)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage3, "%"),
      backgroundColor: "grey"
    }
  }, props.post.parameter_3)) : "", props.post.parameter_4 ? props.post.isWithin24Hrs ? props.post.hasVoted4 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn mb-1 btn-2",
    btnText: props.post.parameter_4,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_4);
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn white-btn mb-1",
    btnText: props.post.parameter_4,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_4);
    }
  }) : props.post.hasVoted4 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage4, "%"),
      backgroundColor: "#232323"
    }
  }, props.post.parameter_4)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage4, "%"),
      backgroundColor: "grey"
    }
  }, props.post.parameter_4)) : "", props.post.parameter_5 ? props.post.isWithin24Hrs ? props.post.hasVoted5 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn mb-1 btn-2",
    btnText: props.post.parameter_5,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_5);
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    btnClass: "mysonar-btn poll-btn white-btn mb-1",
    btnText: props.post.parameter_5,
    btnStyle: {
      width: "100%"
    },
    onClick: function onClick() {
      return onPoll(props.post.id, props.post.parameter_5);
    }
  }) : props.post.hasVoted5 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage5, "%"),
      backgroundColor: "#232323"
    }
  }, props.post.parameter_5)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress rounded-0 mb-1",
    style: {
      height: '33px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(props.post.percentage5, "%"),
      backgroundColor: "grey"
    }
  }, props.post.parameter_5)) : "", props.post.parameter_1 ? props.post.username == props.auth.username || !props.post.isWithin24Hrs ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    style: {
      color: "grey"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "Total votes: ", props.post.totalVotes), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)) : "" : "");
};

/* harmony default export */ __webpack_exports__["default"] = (Polls);

/***/ }),

/***/ "./resources/js/components/PostsMedia.js":
/*!***********************************************!*\
  !*** ./resources/js/components/PostsMedia.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_Img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Img */ "./resources/js/components/Img.js");
/* harmony import */ var _components_Polls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Polls */ "./resources/js/components/Polls.js");
/* harmony import */ var _svgs_DecoSVG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../svgs/DecoSVG */ "./resources/js/svgs/DecoSVG.js");
/* harmony import */ var _svgs_OptionsSVG__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../svgs/OptionsSVG */ "./resources/js/svgs/OptionsSVG.js");
/* harmony import */ var _svgs_CommentSVG__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../svgs/CommentSVG */ "./resources/js/svgs/CommentSVG.js");
/* harmony import */ var _svgs_HeartSVG__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../svgs/HeartSVG */ "./resources/js/svgs/HeartSVG.js");
/* harmony import */ var _svgs_HeartFilledSVG__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../svgs/HeartFilledSVG */ "./resources/js/svgs/HeartFilledSVG.js");
/* harmony import */ var _svgs_ShareSVG__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../svgs/ShareSVG */ "./resources/js/svgs/ShareSVG.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }












var PostsMedia = function PostsMedia(props) {
  // Function for liking posts
  var onPostLike = function onPostLike(post) {
    // Show like
    var newPosts = props.posts.filter(function (item) {
      // Get the exact post and change like status
      if (item.id == post) {
        item.hasLiked = !item.hasLiked;
      }

      return true;
    }); // Set new posts

    props.setPosts(newPosts); // Add like to database

    axios.get('sanctum/csrf-cookie').then(function () {
      axios.post("/api/post-likes", {
        post: post
      }).then(function (res) {
        props.setMessages([res.data]); // Update posts

        axios.get("/api/posts").then(function (res) {
          return props.setPosts(res.data);
        });
      })["catch"](function (err) {
        var resErrors = err.response.data.errors;
        var resError;
        var newError = [];

        for (resError in resErrors) {
          newError.push(resErrors[resError]);
        } // Get other errors


        newError.push(err.response.data.message);
        props.setErrors(newError);
      });
    });
  }; // Function for deleting posts


  var onDeletePost = function onDeletePost(id) {
    axios.get('sanctum/csrf-cookie').then(function () {
      axios["delete"]("/api/posts/".concat(id)).then(function (res) {
        props.setMessages([res.data]); // Update posts

        axios.get("/api/posts").then(function (res) {
          return props.setPosts(res.data);
        });
      })["catch"](function (err) {
        var resErrors = err.response.data.errors;
        var resError;
        var newError = [];

        for (resError in resErrors) {
          newError.push(resErrors[resError]);
        } // Get other errors


        newError.push(err.response.data.message);
        props.setErrors(newError);
      });
    });
  }; // Web Share API for share button
  // Share must be triggered by "user activation"


  var onShare = function onShare(post) {
    // Define share data
    var shareData = {
      title: post.text,
      text: "Check out this post on Black Music\n",
      url: "https://music.black.co.ke/#/post-show/".concat(post.id)
    }; // Check if data is shareble

    navigator.canShare(shareData) && navigator.share(shareData);
  };

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
    to: "/profile/".concat(props.post.username)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Img__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: props.post.pp,
    width: "50px",
    height: "50px",
    alt: 'avatar'
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-1 flex-grow-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
    className: "m-0",
    style: {
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, props.post.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, props.post.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "ml-1",
    style: {
      color: "gold"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_DecoSVG__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1",
    style: {
      color: "inherit"
    }
  }, props.post.decos)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "float-right text-secondary mr-1"
  }, props.post.created_at)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "post-show/" + props.post.id
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mb-0"
  }, props.post.text)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-1",
    style: {
      overflow: "hidden"
    }
  }, props.post.media && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Img__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: "storage/".concat(props.post.media),
    width: "100%",
    height: "auto",
    alt: 'post-media'
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Polls__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, props, {
    post: props.post
  })), props.post.hasLiked ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    style: {
      color: "#fb3958"
    },
    onClick: function onClick(e) {
      e.preventDefault();
      onPostLike(props.post.id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      color: "inherit",
      fontSize: "1.2em"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_HeartFilledSVG__WEBPACK_IMPORTED_MODULE_8__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1",
    style: {
      color: "inherit"
    }
  }, props.post.likes)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    style: {
      color: "rgba(220, 220, 220, 1)"
    },
    onClick: function onClick(e) {
      e.preventDefault();
      onPostLike(props.post.id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      color: "inherit",
      fontSize: "1.2em"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_HeartSVG__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1",
    style: {
      color: "inherit"
    }
  }, props.post.likes)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/post-show/" + props.post.id,
    style: {
      color: "rgba(220, 220, 220, 1)"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "ml-5",
    style: {
      fontSize: "1.2em"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_CommentSVG__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "ml-1",
    style: {
      color: "inherit"
    }
  }, props.post.comments)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "ml-5",
    style: {
      fontSize: "1.3em",
      color: "rgba(220, 220, 220, 1)"
    },
    onClick: function onClick() {
      return onShare(props.post);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_ShareSVG__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  }, props.post.username != props.auth.username ? props.post.username != "@blackmusic" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item",
    onClick: function onClick(e) {
      e.preventDefault();
      props.onFollow(props.post.username);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, props.post.hasFollowed ? "Unfollow ".concat(props.post.username) : "Follow ".concat(props.post.username))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/post-edit/".concat(props.post.id),
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, "Edit post")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item",
    onClick: function onClick(e) {
      e.preventDefault();
      onDeletePost(props.post.id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, "Delete post"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "float-right anti-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-secondary",
    onClick: function onClick() {
      if (props.post.username != props.auth.username) {
        if (props.post.username != "@blackmusic") {
          props.setBottomMenu("menu-open");
          props.setUserToUnfollow(props.post.username); // Show and Hide elements

          props.setUnfollowLink(true);
          props.setDeleteLink(false);
          props.setEditLink(false);
        }
      } else {
        props.setBottomMenu("menu-open");
        props.setPostToEdit(props.post.id); // Show and Hide elements

        props.setEditLink(true);
        props.setDeleteLink(true);
        props.setUnfollowLink(false);
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svgs_OptionsSVG__WEBPACK_IMPORTED_MODULE_5__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "d-block text-secondary my-1"
  }, props.post.hasEdited && "Edited")))));
};

/* harmony default export */ __webpack_exports__["default"] = (PostsMedia);

/***/ })

}]);