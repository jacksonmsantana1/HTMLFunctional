import R from 'ramda';
import IO from 'io-monad';
import Maybe from 'data.maybe';
import Helpers from 'helpers-patchwork';

/******************************Helpers*******************************/

// ramda
const curry = R.curry;
const compose = R.compose;
const map = R.map;
const chain = R.chain;
const get = R.prop;
const nth = R.nth;
const equals = R.equals;

// Helpers
const compareId = Helpers.compareId;
const isArrayEmpty = Helpers.isArrayEmpty;

/*******************************Constructor**************************/

const HTMLFunctional = function HTMLFunctional() {};

// createShadowDom :: HTMLElement -> ShadowRoot
const createShadowDom = (elem) =>
  Maybe.fromNullable(elem).chain((htmlElem) => {
    if (htmlElem.createShadowRoot) {
      return Maybe.Just(htmlElem);
    }

    return Maybe.Nothing();
  })
  .map((e) => e.createShadowRoot());

/****************************Setters*********************************/

// setInnerHTML :: String -> HTMLElement -> IO
const setInnerHTML = curry((strHtml, elem) => new IO(() => {
  /*eslint no-param-reassign:0*/
  elem.innerHTML = strHtml;
}));

// setAttr :: HTMLElement -> String -> String -> IO
const setAttr = curry((obj, attr, val) => new IO(() => {
  obj[attr] = val;
}));

/*****************************Getters********************************/

// getDOM :: _ -> IO(Document)
const getDOM = IO.of(window.document);

// getElementsByTagName :: String -> IO([HTMLElement])
const getElementsByTagName = (tag) => getDOM.map((doc) => (doc.getElementsByTagName(tag)))
.map(Array.from);

// getElementByTagName :: String -> IO(HTMLElement)
const getElementByTagName = (tag) => getDOM.map((doc) => (doc.getElementsByTagName(tag)[0]));

// getShadowRoot :: PwPinButton -> Maybe(ShadowRoot)
const getShadowRoot = compose(chain(Maybe.fromNullable),
  map(get('shadowRoot')),
  Maybe.fromNullable);

// getChildNodes :: HTMLElement -> Maybe(Array)
const getChildNodes = compose(map(Array.from),
  chain(Maybe.fromNullable),
  map(get('childNodes')),
  Maybe.fromNullable);

// getPwProjectInfo :: String -> Either(PwProjectInfo, Error)
const getPwProjectInfo = (pId) => getElementsByTagName('pw-project-info')
  .map(R.filter(compareId(pId)))
  .map(isArrayEmpty)
  .map(map(nth(0)));

// getPwUserInfo :: _ -> Either(PwUserInfo, Error)
const getPwUserInfo = getElementsByTagName('pw-user-info')
  .map(isArrayEmpty)
  .map(map(nth(0)));

/*********************************Toggles*********************************/

// toggleAttr :: HTMLElement -> String -> [String] -> Boolean -> IO
const toggleAttr = (comp, attrName, attrValues) => (new IO(() => {
  const attr = get(attrName);
  const checkAttr = compose(equals(attrValues[0]), attr);

  if (checkAttr(comp)) {
    setAttr(comp, attrName, attrValues[1]).runIO();
  } else {
    setAttr(comp, attrName, attrValues[0]).runIO();
  }
}));

//toggleStyle :: String -> DOMTokenList -> IO
const toggleStyle = curry((styleAttr, classList) =>
  (new IO(() => { classList.toggle(styleAttr); })));

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

export
  default HTMLFunctional;
