(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _tabs = _interopRequireDefault(require("./components/tabs"));

var _slider = _interopRequireDefault(require("./components/slider"));

var _accordiont = _interopRequireDefault(require("./components/accordiont"));

var _popup = _interopRequireDefault(require("./components/popup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.
//import Accordion from './components/accordion';
//import range from './components/range';
_popup["default"].init();

_accordiont["default"].init();

_tabs["default"].init();

(0, _slider["default"])();

},{"./components/accordiont":2,"./components/popup":3,"./components/slider":4,"./components/tabs":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var workAcc = function () {
  var work = document.querySelector('.work');

  if (work) {
    document.addEventListener('DOMContentLoaded', function () {
      var accordions = document.querySelectorAll('.work__list-item');
      accordions.forEach(function (el) {
        el.addEventListener('click', function (e) {
          var self = e.currentTarget;
          var control = self.querySelector('.work__item'); //

          var content = self.querySelector('.work-text');
          self.classList.toggle('open');

          if (self.classList.contains('open')) {
            control.setAttribute('aria-expanded', true);
            content.setAttribute('aria-hidden', false);
            content.style.maxHeight = content.scrollHeight + 'px';
          } else {
            control.setAttribute('aria-expanded', false);
            content.setAttribute('aria-hidden', true);
            content.style.maxHeight = null;
          }
        });
      });
    });
  }

  var init = function init() {};

  return {
    init: init
  };
}();

var _default = workAcc;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var showPopupBtns = document.querySelectorAll('.js-show-popup');
var popups = document.querySelectorAll('.js-popup');
var body = document.body;
var overlay = document.querySelector('.js-overlay');
var CLASS_ACTIVE = 'active';
var CLASS_OVERFLOW = 'overflow';

var popupsFunc = function () {
  var showPopup = function showPopup(event) {
    var openBtn = event.target.closest('.js-show-popup');
    var activePopup = document.querySelector('.js-popup.active');
    var targetPopup = document.querySelector("[data-popup=".concat(openBtn.dataset.trigger, "]"));

    if (activePopup) {
      activePopup.classList.remove(CLASS_ACTIVE);
    }

    if (openBtn.dataset.tab) {
      targetPopup.querySelector("[data-tab=\"".concat(openBtn.dataset.tab, "\"]")).classList.add(CLASS_ACTIVE);
      targetPopup.querySelector("[data-content=\"".concat(openBtn.dataset.tab, "\"]")).classList.add(CLASS_ACTIVE);
    }

    targetPopup.classList.add(CLASS_ACTIVE);
    body.classList.add(CLASS_OVERFLOW);
    overlay.classList.add(CLASS_ACTIVE);
  };

  var hidePopup = function hidePopup(activePopup) {
    if (!activePopup) {
      return;
    }

    body.classList.remove(CLASS_OVERFLOW);
    overlay.classList.remove(CLASS_ACTIVE);
    activePopup.classList.remove(CLASS_ACTIVE);

    if (document.querySelector('.active[data-content]') && document.querySelector('.active[data-tab]')) {
      document.querySelector('.active[data-content]').classList.remove(CLASS_ACTIVE);
      document.querySelector('.active[data-tab]').classList.remove(CLASS_ACTIVE);
    }
  };

  var showPopupInit = function showPopupInit() {
    if (showPopupBtns.length) {
      showPopupBtns.forEach(function (opener) {
        opener.addEventListener('click', function (event) {
          showPopup(event);
        });
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function () {
        hidePopup(document.querySelector('.js-popup.active'));
      });
    }

    if (popups.length) {
      popups.forEach(function (popup) {
        popup.addEventListener('click', function (event) {
          var closeBtn = event.target.closest('.js-popup-close');

          if (!closeBtn) {
            return;
          }

          hidePopup(popup);
        });
      });
    }
  };

  var init = function init() {
    if (popups.length) {
      showPopupInit();
    }
  };

  return {
    init: init
  };
}();

var _default = popupsFunc;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function initSwiper() {
  var accountantInit = new Swiper('.js-accountant-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
    centerInsufficientSlides: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      768: {
        spaceBetween: 100,
        slidesPerView: 4
      }
    }
  });
}

var _default = initSwiper;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_ACTIVE = 'active';
var wrapList = document.querySelectorAll('.js-tabs');

var tabs = function () {
  var tabsInit = function tabsInit() {
    if (!wrapList.length) return;
    wrapList.forEach(function (wrap) {
      return attachEvents(wrap);
    });

    function attachEvents(parent) {
      var tabList = parent.querySelectorAll('[data-tab]'),
          contentList = parent.querySelectorAll('[data-content]');
      if (!tabList.length) return;
      tabList.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          tabList.forEach(function (btn) {
            return btn.classList.remove(CLASS_ACTIVE);
          });
          e.currentTarget.classList.add(CLASS_ACTIVE);
          var idContent = e.currentTarget.dataset.tab;

          if (idContent === 'all') {
            contentList.forEach(function (content) {
              return content.classList.add(CLASS_ACTIVE);
            });
          } else {
            var currentContentList = document.querySelectorAll("[data-content=\"".concat(idContent, "\"]"));
            contentList.forEach(function (content) {
              return content.classList.remove(CLASS_ACTIVE);
            });
            currentContentList.forEach(function (content) {
              return content.classList.add(CLASS_ACTIVE);
            });
          }
        });
      });
    }
  };

  var init = function init() {
    tabsInit();
  };

  return {
    init: init
  };
}();

var _default = tabs;
exports["default"] = _default;

},{}]},{},[1]);
