import { expect } from 'chai';
import HTMLFunctional from './index.js';

describe('HTMLFunctional =>', () => {
  before(() => {
    document.body.innerHTML = '';
  });

  describe('setInnerHtml() ->', () => {
    it('Should return an IO', () => {
      let fn = HTMLFunctional.setInnerHTML;
      let div = document.createElement('div');
      let inner = '<a>ANUS</a>';
      let io = fn(inner)(div);

      io.runIO();
      expect(div.childNodes[0].text).to.be.equal('ANUS');
    });
  });

  describe('setAttr', () => {
    it('Should set the element attribute with the given value', () => {
      let fn = HTMLFunctional.setAttr;
      let div = document.createElement('div');
      let io = fn(div, 'attr');

      expect(div.attr).to.be.equal(undefined);
      io('ANUS').runIO();
      expect(div.attr).to.be.equal('ANUS');
    });
  });

  describe('createShadowDom()', () => {
    it('Should return a Nothing if the element is invalid', () => {
      let fn = HTMLFunctional.getShadowRoot;
      let notElem = undefined;
      let shadow = HTMLFunctional.createShadowDom(notElem);

      expect(shadow.toString()).to.be.equal('Maybe.Nothing');
    });

    it('Should return a Nothing if the element is not HTMLELement', () => {
      let fn = HTMLFunctional.getShadowRoot;
      let notElem = 'STRING';
      let shadow = HTMLFunctional.createShadowDom(notElem);

      expect(shadow.toString()).to.be.equal('Maybe.Nothing');
    });

    it('Should return Maybe(ShadowRoot)', () => {
      let fn = HTMLFunctional.createShadowDom;
      let elem = document.createElement('div');
      let shadowRoot = fn(elem);

      expect(shadowRoot.get()).to.be.equal(elem.shadowRoot);
    });
  });

  describe('getElementByTagName()', () => {
    it('Should return the first element with the same tag given', () => {
      let fn = HTMLFunctional.getElementByTagName;
      let div = document.createElement('div');
      document.body.appendChild(div);

      expect(fn('div', document).runIO()).to.be.eql(div);
    });
  });

  describe('getElementsByTagName()', () => {
    it('Should return the elements with the same tag given', () => {
      let fn = HTMLFunctional.getElementsByTagName;
      let div1 = document.createElement('div');
      document.body.appendChild(div1);

      let div2 = document.createElement('div');
      document.body.appendChild(div2);

      expect(fn('div', document).runIO().length).to.be.equal(3);
    });
  });

  describe('getShadowRoot() ', () => {
    it('Should return an Maybe(ShadowRoot)', () => {
      let fn = HTMLFunctional.getShadowRoot;
      let div = document.createElement('div');
      let shadow = HTMLFunctional.createShadowDom(div);

      expect(fn(div).get()).to.be.equal(shadow.get());
    });

    it('Should return a Nothing if the Element is not a HTMLElement', () => {
      let fn = HTMLFunctional.getShadowRoot;
      let notHtmlElem = 'String';

      expect(fn(undefined).toString()).to.be.eql('Maybe.Nothing');
      expect(fn(notHtmlElem).toString()).to.be.eql('Maybe.Nothing');
    });
  });

  describe('getChildNodes() ', () => {
    it('Should return a Maybe([HTMLELement])', () => {
      let fn = HTMLFunctional.getChildNodes;
      let div = document.createElement('div');
      let child = document.createElement('a');

      div.appendChild(child);
      expect(fn(div).get()).to.be.eql([child]);
    });

    it('Should return a  Just([]) if none node is found', () => {
      let fn = HTMLFunctional.getChildNodes;
      let div = document.createElement('div');

      expect(fn(div).toString()).to.be.eql('Maybe.Just()');
      expect(fn(div).get()).to.be.eql([]);
    });

    it('Should return a Nothing if the element is not valid', () => {
      let fn = HTMLFunctional.getChildNodes;
      let notHtmlElem = 'String';

      expect(fn(undefined).toString()).to.be.eql('Maybe.Nothing');
      expect(fn(notHtmlElem).toString()).to.be.eql('Maybe.Nothing');
    });
  });

  describe('getPwProjectInfo() ', () => {
    it('Should ...', () => {

      expect(true).to.be.equal(true);
    });
  });

  describe('getPwUserInfo() ', () => {
    it('Should ...', () => {

      expect(true).to.be.equal(true);
    });
  });

  describe('toggleStyle() ', () => {
    it('Should ...', () => {

      expect(true).to.be.equal(true);
    });
  });

  describe('toggleAttr() ', () => {
    it('Should ...', () => {

      expect(true).to.be.equal(true);
    });
  });
});
