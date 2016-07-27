'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _ioMonad = require('io-monad');

var _ioMonad2 = _interopRequireDefault(_ioMonad);

var _data = require('data.maybe');

var _data2 = _interopRequireDefault(_data);

var _helpersPatchwork = require('helpers-patchwork');

var _helpersPatchwork2 = _interopRequireDefault(_helpersPatchwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/******************************Helpers*******************************/

// ramda
var curry = _ramda2.default.curry;
var compose = _ramda2.default.compose;
var map = _ramda2.default.map;
var get = _ramda2.default.prop;
var nth = _ramda2.default.nth;
var equals = _ramda2.default.equals;

// Helpers
var compareId = _helpersPatchwork2.default.compareId;
var isArrayEmpty = _helpersPatchwork2.default.isArrayEmpty;

/*******************************Constructor**************************/

var HTMLFunctional = function HTMLFunctional() {};

// createShadowDom :: HTMLElement -> ShadowRoot
var createShadowDom = function createShadowDom(elem) {
  return elem.createShadowRoot();
};

/****************************Setters*********************************/

// setInnerHTML :: String -> HTMLElement -> HTMLElement
var setInnerHTML = curry(function (strHtml, elem) {
  /*eslint no-param-reassign:0*/
  elem.innerHTML = strHtml;
});

// setAttr :: HTMLElement -> String -> String -> HTMLElement
var setAttr = curry(function (obj, attr, val) {
  obj[attr] = val;
  return obj;
});

/*****************************Getters********************************/

// getDOM :: _ -> IO(Document)
var getDOM = _ioMonad2.default.of(window.document);

// getElementsByTagName :: String -> IO([HTMLElement])
var getElementsByTagName = function getElementsByTagName(tag) {
  return getDOM.map(function (doc) {
    return doc.getElementsByTagName(tag);
  });
};

// getElementByTagName :: String -> IO(HTMLElement)
var getElementByTagName = function getElementByTagName(tag) {
  return getDOM.map(function (doc) {
    return doc.getElementsByTagName(tag);
  });
};

// getShadowRoot :: PwPinButton -> Maybe(ShadowRoot)
var getShadowRoot = compose(_data2.default.fromNullable, get('shadowRoot'));

// getChildNodes :: HTMLElement -> Maybe(Array)
var getChildNodes = compose(_data2.default.fromNullable, get('childNodes'));

// getPwProjectInfo :: String -> Either(PwProjectInfo, Error)
var getPwProjectInfo = function getPwProjectInfo(pId) {
  return getElementsByTagName('pw-project-info').map(_ramda2.default.filter(compareId(pId))).map(isArrayEmpty).map(map(nth(0)));
};

// getPwUserInfo :: _ -> Either(PwUserInfo, Error)
var getPwUserInfo = getElementsByTagName('pw-user-info').map(isArrayEmpty).map(map(nth(0)));

/*********************************Toggles*********************************/

// toggleAttr :: HTMLElement -> String -> [String] -> Boolean -> HTMLElement
var toggleAttr = function toggleAttr(comp, attrName, attrValues) {
  var attr = get(attrName);
  var checkAttr = compose(equals(attrValues[0]), attr);

  if (checkAttr(comp)) {
    setAttr(comp, attrName, attrValues[1]);
  } else {
    setAttr(comp, attrName, attrValues[0]);
  }

  return comp;
};

//toggleStyle :: String -> DOMTokenList -> IO
var toggleStyle = curry(function (styleAttr, classList) {
  return new _ioMonad2.default(function () {
    classList.toggle(styleAttr);
  });
});

/**********************************************************************/

HTMLFunctional.prototype.setInnerHTML = setInnerHTML;
HTMLFunctional.setInnerHTML = HTMLFunctional.prototype.setInnerHTML;

HTMLFunctional.prototype.setAttr = setAttr;
HTMLFunctional.setAttr = HTMLFunctional.prototype.setAttr;

HTMLFunctional.prototype.createShadowDom = createShadowDom;
HTMLFunctional.createShadowDom = HTMLFunctional.prototype.createShadowDom;

HTMLFunctional.prototype.getElementByTagName = getElementByTagName;
HTMLFunctional.getElementByTagName = HTMLFunctional.prototype.getElementByTagName;

HTMLFunctional.prototype.getElementsByTagName = getElementsByTagName;
HTMLFunctional.getElementsByTagName = HTMLFunctional.prototype.getElementsByTagName;

HTMLFunctional.prototype.getShadowRoot = getShadowRoot;
HTMLFunctional.getShadowRoot = HTMLFunctional.prototype.getShadowRoot;

HTMLFunctional.prototype.getChildNodes = getChildNodes;
HTMLFunctional.getChildNodes = HTMLFunctional.prototype.getChildNodes;

HTMLFunctional.prototype.getPwProjectInfo = getPwProjectInfo;
HTMLFunctional.getPwProjectInfo = HTMLFunctional.prototype.getPwProjectInfo;

HTMLFunctional.prototype.getPwUserInfo = getPwUserInfo;
HTMLFunctional.getPwUserInfo = HTMLFunctional.prototype.getPwUserInfo;

HTMLFunctional.prototype.toggleStyle = toggleStyle;
HTMLFunctional.toggleStyle = HTMLFunctional.prototype.toggleStyle;

HTMLFunctional.prototype.toggleAttr = toggleAttr;
HTMLFunctional.toggleAttr = HTMLFunctional.prototype.toggleAttr;

exports.default = HTMLFunctional;

//# sourceMappingURL=index.js.map