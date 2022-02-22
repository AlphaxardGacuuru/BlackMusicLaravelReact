(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/js/components/SocialMediaInput.js":
/*!*****************************************************!*\
  !*** ./resources/js/components/SocialMediaInput.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Button */ "./resources/js/components/Button.js");
/* harmony import */ var _components_Img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Img */ "./resources/js/components/Img.js");
/* harmony import */ var react_filepond__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-filepond */ "./node_modules/react-filepond/dist/react-filepond.js");
/* harmony import */ var react_filepond__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_filepond__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! filepond/dist/filepond.min.css */ "./node_modules/filepond/dist/filepond.min.css");
/* harmony import */ var filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var filepond_plugin_image_exif_orientation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! filepond-plugin-image-exif-orientation */ "./node_modules/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.js");
/* harmony import */ var filepond_plugin_image_exif_orientation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_exif_orientation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! filepond-plugin-image-preview */ "./node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js");
/* harmony import */ var filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! filepond-plugin-file-validate-type */ "./node_modules/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.js");
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var filepond_plugin_image_crop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! filepond-plugin-image-crop */ "./node_modules/filepond-plugin-image-crop/dist/filepond-plugin-image-crop.js");
/* harmony import */ var filepond_plugin_image_crop__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_crop__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var filepond_plugin_image_transform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! filepond-plugin-image-transform */ "./node_modules/filepond-plugin-image-transform/dist/filepond-plugin-image-transform.js");
/* harmony import */ var filepond_plugin_image_transform__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_transform__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! filepond-plugin-file-validate-size */ "./node_modules/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js");
/* harmony import */ var filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var filepond_plugin_image_preview_dist_filepond_plugin_image_preview_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css */ "./node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css");
/* harmony import */ var filepond_plugin_image_preview_dist_filepond_plugin_image_preview_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_preview_dist_filepond_plugin_image_preview_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var emoji_picker_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! emoji-picker-react */ "./node_modules/emoji-picker-react/dist/index.js");
/* harmony import */ var emoji_picker_react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(emoji_picker_react__WEBPACK_IMPORTED_MODULE_12__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



 // Import React FilePond

 // Import FilePond styles

 // Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately







 // Register the plugins

Object(react_filepond__WEBPACK_IMPORTED_MODULE_3__["registerPlugin"])(filepond_plugin_image_exif_orientation__WEBPACK_IMPORTED_MODULE_5___default.a, filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_6___default.a, filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_7___default.a, filepond_plugin_image_crop__WEBPACK_IMPORTED_MODULE_8___default.a, filepond_plugin_image_transform__WEBPACK_IMPORTED_MODULE_9___default.a, filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_10___default.a);


var SocialMediaInput = function SocialMediaInput(props) {
  // Get csrf token
  var token = document.head.querySelector('meta[name="csrf-token"]'); // const [chosenEmoji, setChosenEmoji] = useState(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      doNotShowMentionPicker = _useState2[0],
      setDoNotShowMentionPicker = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("none"),
      _useState4 = _slicedToArray(_useState3, 2),
      display1 = _useState4[0],
      setDisplay1 = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("none"),
      _useState6 = _slicedToArray(_useState5, 2),
      display2 = _useState6[0],
      setDisplay2 = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("none"),
      _useState8 = _slicedToArray(_useState7, 2),
      display3 = _useState8[0],
      setDisplay3 = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("none"),
      _useState10 = _slicedToArray(_useState9, 2),
      display4 = _useState10[0],
      setDisplay4 = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("none"),
      _useState12 = _slicedToArray(_useState11, 2),
      display5 = _useState12[0],
      setDisplay5 = _useState12[1];

  var onEmojiClick = function onEmojiClick(event, emojiObject) {
    // setChosenEmoji(emojiObject);
    props.setText(props.text + emojiObject.emoji);
  }; // Show error on space in username


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    props.text.indexOf("@") > -1 && props.setShowMentionPicker(true);
  }, [props.text]); // Add username to text

  var addMention = function addMention(mention) {
    var textUsername = "@" + props.text.split("@")[1];
    var mentionToAdd = props.text.replace(textUsername, mention);
    props.setText(mentionToAdd);
    props.setShowMentionPicker(false);
    setDoNotShowMentionPicker(false);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("center", {
    style: {
      backgroundColor: "#232323"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-flex pt-2",
    style: {
      borderBottom: "1px solid #fff",
      backgroundColor: "#232323"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Img__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: props.auth.pp,
    imgClass: "rounded-circle",
    width: "25px",
    height: "25px",
    alt: "Avatar"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-grow-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    name: "post-text",
    className: "form-control m-0 p-2 border-bottom border-dark",
    style: {
      border: "none",
      outline: "none",
      height: "50px",
      resize: "none"
    },
    placeholder: props.placeholder,
    value: props.text,
    row: "1",
    onChange: function onChange(e) {
      return props.setText(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pt-2 px-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-light",
    style: {
      cursor: "pointer"
    },
    onClick: function onClick() {
      props.setShowEmojiPicker(!props.showEmojiPicker);
      props.setShowImagePicker( true && false);
      props.setShowPollPicker( true && false);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "currentColor",
    className: "bi bi-emoji-smile",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
  })))), props.showImage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pt-2 px-1 text-light",
    onClick: function onClick() {
      props.setShowImagePicker(!props.showImagePicker);
      props.setShowEmojiPicker( true && false);
      props.setShowPollPicker( true && false);

      if (props.showImage || props.showPollPicker) {
        props.setMedia("");
        props.setPara1();
        props.setPara2();
        props.setPara3();
        props.setPara4();
        props.setPara5();
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "currentColor",
    className: "bi bi-image",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
  })))), props.showPoll && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pt-2 px-1 text-white",
    onClick: function onClick() {
      props.setShowPollPicker(!props.showPollPicker);
      props.setShowEmojiPicker( true && false);
      props.setShowImagePicker( true && false);

      if (props.showImage || props.showPollPicker) {
        props.setMedia("");
        props.setPara1();
        props.setPara2();
        props.setPara3();
        props.setPara4();
        props.setPara5();
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "currentColor",
    className: "bi bi-bar-chart",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "submit",
    btnClass: "mysonar-btn-round white-btn",
    btnStyle: {
      borderRadius: "50%",
      minWidth: "33px",
      paddingRight: "2px"
    },
    btnText: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "p-2 text-dark"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      style: {
        transform: "rotate(45deg)"
      },
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      fill: "currentColor",
      className: "bi bi-send-fill",
      viewBox: "0 0 16 16"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
      d: "M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
    })))
  }))), props.showEmojiPicker && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(emoji_picker_react__WEBPACK_IMPORTED_MODULE_12___default.a, {
    onEmojiClick: onEmojiClick,
    preload: "true",
    pickerStyle: {
      width: "95%",
      borderRadius: "0px",
      margin: "10px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), props.showImagePicker && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_filepond__WEBPACK_IMPORTED_MODULE_3__["FilePond"], {
    name: "filepond-media",
    className: "m-2",
    labelIdle: "Drag & Drop your Image or <span class=\"filepond--label-action\"> Browse </span>",
    acceptedFileTypes: ['image/*'],
    allowRevert: true,
    server: {
      url: "".concat(props.url, "/api"),
      process: {
        url: props.urlTo,
        headers: {
          'X-CSRF-TOKEN': token.content
        },
        onload: function onload(res) {
          return props.setMedia(res);
        }
      },
      revert: {
        url: props.urlToDelete,
        headers: {
          'X-CSRF-TOKEN': token.content
        },
        onload: function onload(res) {
          return props.setMessage(res);
        }
      }
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), props.showMentionPicker && doNotShowMentionPicker ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card rounded-0",
    style: {
      maxHeight: "200px",
      overflowY: "scroll"
    }
  }, props.users.filter(function (user) {
    var regex = new RegExp(props.text.split("@")[1], 'gi');
    return user.username != props.auth.username && user.username != "@blackmusic" && user.account_type == "musician" && user.username.match(regex);
  }).map(function (user, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: key,
      className: "d-flex",
      onClick: function onClick() {
        return addMention(user.username);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "p-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Img__WEBPACK_IMPORTED_MODULE_2__["default"], {
      src: user.pp,
      imgClass: "rounded-circle",
      width: "30px",
      height: "30px"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "py-2 px-0"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
      className: "m-0",
      style: {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, user.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, user.username))));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)) : "", props.showPollPicker && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("center", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
    className: "mt-2"
  }, "Add Poll"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: "form-control border-dark",
    placeholder: "Parameter 1",
    onChange: function onChange(e) {
      setDisplay2("inline");
      props.setPara1(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    style: {
      display: display2
    },
    className: "form-control border-dark",
    placeholder: "Parameter 2",
    onChange: function onChange(e) {
      setDisplay3("inline");
      props.setPara2(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    style: {
      display: display3
    },
    className: "form-control border-dark",
    placeholder: "Parameter 3",
    onChange: function onChange(e) {
      setDisplay4("inline");
      props.setPara3(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    style: {
      display: display4
    },
    className: "form-control border-dark",
    placeholder: "Parameter 4",
    onChange: function onChange(e) {
      setDisplay5("inline");
      props.setPara4(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    style: {
      display: display5
    },
    className: "form-control border-dark",
    placeholder: "Parameter 5",
    onChange: function onChange(e) {
      return props.setPara5(e.target.value);
    }
  })));
};

SocialMediaInput.defaultProps = {
  urlTo: '/',
  urlToDelete: '/'
};
/* harmony default export */ __webpack_exports__["default"] = (SocialMediaInput);

/***/ })

}]);