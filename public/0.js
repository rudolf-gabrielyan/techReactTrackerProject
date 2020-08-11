(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/react/Components/AlertModal/CustomizedSwitches/CustomizedSwitch.scss":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./resources/js/react/Components/AlertModal/CustomizedSwitches/CustomizedSwitch.scss ***!
  \******************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".switch {\n  margin-right: 22px;\n}", ""]);

// exports


/***/ }),

/***/ "./resources/js/react/Components/AlertModal/CustomizedSwitches/CustomizedSwitch.scss":
/*!*******************************************************************************************!*\
  !*** ./resources/js/react/Components/AlertModal/CustomizedSwitches/CustomizedSwitch.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!./CustomizedSwitch.scss */ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/react/Components/AlertModal/CustomizedSwitches/CustomizedSwitch.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./resources/js/react/Components/AlertModal/CustomizedSwitches/SwitchDefault.js":
/*!**************************************************************************************!*\
  !*** ./resources/js/react/Components/AlertModal/CustomizedSwitches/SwitchDefault.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-switch */ "./node_modules/react-switch/index.js");
/* harmony import */ var react_switch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_switch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CustomizedSwitch_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomizedSwitch.scss */ "./resources/js/react/Components/AlertModal/CustomizedSwitches/CustomizedSwitch.scss");
/* harmony import */ var _CustomizedSwitch_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CustomizedSwitch_scss__WEBPACK_IMPORTED_MODULE_2__);




var SwitchDefault = function SwitchDefault(_ref) {
  var id = _ref.id,
      checked = _ref.checked,
      onChange = _ref.onChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_switch__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: "switch",
    id: id,
    checked: checked,
    onChange: onChange,
    offColor: "#C4C4C4",
    onColor: "#60E770",
    width: 118,
    height: 52,
    uncheckedIcon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        fontSize: '1rem'
      }
    }, "OFF")),
    checkedIcon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        fontSize: '1rem'
      }
    }, "ON"))
  });
};

/* harmony default export */ __webpack_exports__["default"] = (SwitchDefault);

/***/ })

}]);