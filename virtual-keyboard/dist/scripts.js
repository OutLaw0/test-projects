/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ \"./src/style/main.scss\");\n\n/*start keyboard*/\n\nfunction createHeader() {\n  const container = document.createElement(\"div\");\n  const footer = document.createElement(\"footer\");\n  container.classList.add(\"container\");\n  document.body.appendChild(container);\n  document.body.appendChild(footer);\n  let new_desc_inner = `<h1>Virtual Keyboard w/ Vanilla JS</h1>\n    <h3>Features</h3>\n    <ul>\n        <li>Easy to integrate</li>\n        <li>Responsive</li>\n        <li>Vanilla JS (<strong>no libraries required!</strong>)</li>\n    </ul>\n    <textarea name=\"keyboard_text\" class=\"use-keyboard-input\" rows=\"5\" cols=\"35\"></textarea>`;\n  container.innerHTML = new_desc_inner;\n  let new_footer_inner = `<div class=\"footer__container footer-copyright\">\n    <div class=\"footer-copyright__element\">\n        <p class=\"copyright\">©</p>\n        <p class=\"year\">2022</p>\n        <a class=\"github-username\" href=\"https://github.com/OutLaw0\" target=\"_blank\" rel=\"noopener noreferrer\">github</a>\n    </div>\n    <a href=\"https://rs.school/js/\" class=\"rss\" target=\"_blank\"> Rolling Scopes School </a>\n</div>`;\n  footer.innerHTML = new_footer_inner;\n}\n\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n  createHeader();\n});\nconst Keyboard = {\n  elements: {\n    main: null,\n    keysContainer: null,\n    keys: []\n  },\n  eventHandlers: {\n    oninput: null,\n    onclose: null\n  },\n  properties: {\n    value: \"\",\n    capsLock: false\n  },\n\n  init() {\n    //create elements\n    this.elements.main = document.createElement(\"div\");\n    this.elements.keysContainer = document.createElement(\"div\"); //add class\n\n    this.elements.main.classList.add(\"keyboard\", \"1keyboard--hidden\");\n    this.elements.keysContainer.classList.add(\"keyboard__keys\"); //add to body > container\n\n    this.elements.main.appendChild(this.elements.keysContainer);\n    document.body.firstElementChild.appendChild(this.elements.main);\n  },\n\n  _createKeys() {\n    const fragment = document.createDocumentFragment();\n    const keyLayout = [\"\\`\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\", \"-\", \"=\", \"backspace\", \"Tab\", \"q\", \"w\", \"e\", \"r\", \"t\", \"y\", \"u\", \"i\", \"o\", \"p\", \"[\", \"]\", \"\\\\\", \"caps\", \"a\", \"s\", \"d\", \"f\", \"g\", \"h\", \"j\", \"k\", \"l\", \";\", \"\\'\", \"enter\", \"Shift\", \"z\", \"x\", \"c\", \"v\", \"b\", \"n\", \"m\", \",\", \".\", \"?\", \"Ctrl\", \"Alt\", \"space\"]; //Create HTML icon\n\n    const createIconHtml = icon_name => {\n      return `<i class=\"material-icons\">${icon_name}</i>`;\n    };\n\n    keyLayout.forEach(key => {\n      const keyElement = document.createElement('button');\n      const insertLineBreak = [\"backspace\", \"p\", \"enter\", \"?\"].indexOf(key) !== -1; // Add attributes/classes\n\n      keyElement.setAttribute(\"type\", \"button\");\n      keyElement.classList.add(\"keyboard__key\");\n\n      if (key == \"backspace\") {\n        keyElement.classList.add(\"keyboard__key--wide\");\n        keyElement.innerHTML = createIconHtml(\"backspace\");\n      }\n    });\n  },\n\n  _triggerEvent(handlerName) {\n    console.log(\"Event Trig! Event Name: \" + handlerName);\n  },\n\n  _toggleCapsLock() {\n    console.log(\"Caps Lock Toggled!\");\n  },\n\n  open() {},\n\n  close() {}\n\n};\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n  Keyboard.init();\n});\n\n//# sourceURL=webpack://virtual-keyboard/./src/index.js?");

/***/ }),

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/style/main.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;