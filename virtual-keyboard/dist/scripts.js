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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ \"./src/style/main.scss\");\n/* harmony import */ var _js_create_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/create.js */ \"./src/js/create.js\");\n/* harmony import */ var _js_base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/base.js */ \"./src/js/base.js\");\n/* harmony import */ var _js_keyevents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/keyevents.js */ \"./src/js/keyevents.js\");\n\n\n\n\n/*start keyboard*/\n\nconst Keyboard = {\n  elements: {\n    main: null,\n    keysContainer: null,\n    keys: [],\n    textArea: null\n  },\n  eventHandlers: {\n    oninput: null,\n    onclose: null\n  },\n  properties: {\n    value: \"\",\n    capsLock: false,\n    langRU: false\n  },\n  keyLayout: _js_base_js__WEBPACK_IMPORTED_MODULE_2__.keyLayout,\n\n  init() {\n    //create elements\n    const textArea = document.querySelector(\".use-keyboard-input\");\n    this.textArea = textArea;\n    this.elements.main = document.createElement(\"div\");\n    this.elements.keysContainer = document.createElement(\"div\"); //add class\n\n    this.elements.main.classList.add(\"keyboard\", \"keyboard--hidden\");\n    this.elements.keysContainer.classList.add(\"keyboard__keys\");\n    this.elements.keysContainer.appendChild(_js_create_js__WEBPACK_IMPORTED_MODULE_1__.createKeys.call(Keyboard)); //create elements from create JS\n\n    this.elements.keys = this.elements.keysContainer.querySelectorAll(\".keyboard__key\"); //prevent losefocus!\n\n    this.elements.main.addEventListener(\"mousedown\", e => {\n      e.preventDefault();\n    }, false);\n    this.elements.main.appendChild(this.elements.keysContainer);\n    document.body.firstElementChild.appendChild(this.elements.main); // Automatically use keyboard for elements with .use-keyboard-input\n\n    document.addEventListener(\"mousedown\", e => {\n      this._handleKeyboard(e);\n    });\n    document.addEventListener(\"mouseup\", e => {\n      this._handleKeyboard(e);\n    });\n    document.addEventListener(\"keydown\", e => {\n      this._handleKeyboard(e);\n    });\n    document.addEventListener(\"keyup\", e => {\n      this._handleKeyboard(e);\n    });\n    textArea.addEventListener(\"focus\", () => {\n      this.open(textArea.value, currentValue => {\n        textArea.value = currentValue;\n      });\n    });\n    textArea.focus(); //setTimeout(() => textArea.focus(), 300);\n\n    /*  this.open(textArea.value, currentValue => {\r\n        textArea.value = currentValue;\r\n    });*/\n  },\n\n  _triggerEvent(handlerName) {\n    if (typeof this.eventHandlers[handlerName] == \"function\") {\n      this.eventHandlers[handlerName](this.properties.value);\n    }\n  },\n\n  _handleKeyboard(e) {\n    if (e.stopPropagation) e.stopPropagation();\n    const {\n      code,\n      type\n    } = e;\n    const array = this.keyLayout['keyboardOrder'];\n    const array1 = this.elements.keys;\n\n    if (type == 'keydown' || type == 'keyup') {\n      e.preventDefault();\n      const myKey = array.find(key => key === code);\n      if (!myKey) return;\n      if (type == 'keydown') array1[array.indexOf(code)].classList.add(\"active\");\n      if (type == 'keyup') array1[array.indexOf(code)].classList.remove(\"active\");\n      const key = array1[array.indexOf(code)].textContent;\n      _js_keyevents_js__WEBPACK_IMPORTED_MODULE_3__.print.call(Keyboard, key, type);\n    }\n\n    if (type == 'mousedown' || type == 'mouseup') {\n      // console.log(e.target.classList)\n      if (e.target.classList.contains(\"keyboard__key\") || e.target.classList.contains(\"material-icons\") || e.target.classList.contains(\"special-key\")) {\n        const key = e.target.textContent;\n        _js_keyevents_js__WEBPACK_IMPORTED_MODULE_3__.print.call(Keyboard, key, type);\n      }\n    }\n  },\n\n  _toggleCapsLock() {\n    this.properties.capsLock = !this.properties.capsLock;\n\n    for (let key of this.elements.keys) {\n      if (key.childElementCount === 0) {\n        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();\n      }\n    }\n  },\n\n  _toggleLang(lang) {\n    let array = this.keyLayout[lang];\n    this.elements.keys.forEach((el, i) => {\n      if (el.childElementCount === 0) {\n        el.innerHTML = array[i];\n      }\n    });\n\n    if (this.properties.capsLock) {\n      for (let key of this.elements.keys) {\n        if (key.childElementCount === 0) {\n          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();\n        }\n      }\n    }\n  },\n\n  _toggleShift(lang) {\n    let array = this.keyLayout[lang];\n    this.elements.keys.forEach((el, i) => {\n      if (el.childElementCount === 0) {\n        el.innerHTML = array[i];\n      }\n    });\n  },\n\n  open(initialValue, oninput, onclose) {\n    this.properties.value = initialValue || \"\";\n    this.eventHandlers.oninput = oninput;\n    this.eventHandlers.onclose = onclose;\n    this.elements.main.classList.remove(\"keyboard--hidden\");\n  },\n\n  close() {\n    this.properties.value = \"\";\n    this.eventHandlers.oninput = oninput;\n    this.eventHandlers.onclose = onclose;\n    this.elements.main.classList.add(\"keyboard--hidden\");\n  }\n  /*print(){\r\n  }*/\n\n\n};\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n  (0,_js_create_js__WEBPACK_IMPORTED_MODULE_1__.createHeader)();\n  Keyboard.init();\n}); //TODO\n// 2. Сделать Shift сделать инверсию для капс лока!\n// Сделать сочетание для смены языка\n// Установить язык после перезагрузки local storage\n//ДОП. удаление выделением backspace\n// PROFIT!!!\n\n//# sourceURL=webpack://virtual-keyboard/./src/index.js?");

/***/ }),

/***/ "./src/js/base.js":
/*!************************!*\
  !*** ./src/js/base.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"keyLayout\": () => (/* binding */ keyLayout)\n/* harmony export */ });\nconst keyLayout = {\n  'en': [\"`\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\", \"-\", \"=\", \"backspace\", \"Tab\", \"q\", \"w\", \"e\", \"r\", \"t\", \"y\", \"u\", \"i\", \"o\", \"p\", \"[\", \"]\", \"\\\\\", \"Del\", \"caps\", \"a\", \"s\", \"d\", \"f\", \"g\", \"h\", \"j\", \"k\", \"l\", \";\", \"'\", \"enter\", \"Shift\", \"z\", \"x\", \"c\", \"v\", \"b\", \"n\", \"m\", \",\", \".\", \"/\", \"&#9650;\", \"Close\", \"Ctrl\", \"changeLang\", \"Alt\", \"space\", \"&#9668;\", \"&#9660;\", \"&#9658;\"],\n  'ru': [\"ё\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\", \"-\", \"=\", \"backspace\", \"Tab\", \"й\", \"ц\", \"у\", \"к\", \"е\", \"н\", \"г\", \"ш\", \"щ\", \"з\", \"х\", \"ъ\", \"\\\\\", \"Del\", \"caps\", \"ф\", \"ы\", \"в\", \"а\", \"п\", \"р\", \"о\", \"л\", \"д\", \"ж\", \"э\", \"enter\", \"Shift\", \"я\", \"ч\", \"с\", \"м\", \"и\", \"т\", \"ь\", \"б\", \"ю\", \".\", \"&#9650;\", \"Close\", \"Ctrl\", \"changeLang\", \"Alt\", \"space\", \"&#9668;\", \"&#9660;\", \"&#9658;\"],\n  'Shift_en': [\"~\", \"!\", \"@\", \"#\", \"$\", \"%\", \"^\", \"&\", \"*\", \"(\", \")\", \"_\", \"+\", \"backspace\", \"Tab\", \"Q\", \"W\", \"E\", \"R\", \"T\", \"Y\", \"U\", \"I\", \"O\", \"P\", \"{\", \"}\", \"|\", \"Del\", \"caps\", \"A\", \"S\", \"D\", \"F\", \"G\", \"H\", \"J\", \"K\", \"L\", \":\", \"\\\"\", \"enter\", \"Shift\", \"Z\", \"X\", \"C\", \"V\", \"B\", \"N\", \"M\", \"<\", \">\", \"?\", \"&#9650;\", \"Close\", \"Ctrl\", \"changeLang\", \"Alt\", \"space\", \"&#9668;\", \"&#9660;\", \"&#9658;\"],\n  'Shift_ru': [\"Ё\", \"!\", \"\\\"\", \"№\", \";\", \"%\", \":\", \"?\", \"*\", \"(\", \")\", \"_\", \"+\", \"backspace\", \"Tab\", \"Й\", \"Ц\", \"У\", \"К\", \"Е\", \"Н\", \"Г\", \"Ш\", \"Щ\", \"З\", \"Х\", \"Ъ\", \"/\", \"Del\", \"caps\", \"Ф\", \"Ы\", \"В\", \"А\", \"П\", \"Р\", \"О\", \"Л\", \"Д\", \"Ж\", \"Э\", \"enter\", \"Shift\", \"Я\", \"Ч\", \"С\", \"М\", \"И\", \"Т\", \"Ь\", \"Б\", \"Ю\", \",\", \"&#9650;\", \"Close\", \"Ctrl\", \"changeLang\", \"Alt\", \"space\", \"&#9668;\", \"&#9660;\", \"&#9658;\"],\n  'keyboardOrder': [\"Backquote\", \"Digit1\", \"Digit2\", \"Digit3\", \"Digit4\", \"Digit5\", \"Digit6\", \"Digit7\", \"Digit8\", \"Digit9\", \"Digit0\", \"Minus\", \"Equal\", \"Backspace\", \"Tab\", \"KeyQ\", \"KeyW\", \"KeyE\", \"KeyR\", \"KeyT\", \"KeyY\", \"KeyU\", \"KeyI\", \"KeyO\", \"KeyP\", \"BracketLeft\", \"BracketRight\", \"Backslash\", \"Delete\", \"CapsLock\", \"KeyA\", \"KeyS\", \"KeyD\", \"KeyF\", \"KeyG\", \"KeyH\", \"KeyJ\", \"KeyK\", \"KeyL\", \"Semicolon\", \"Quote\", \"Enter\", \"ShiftLeft\", \"KeyZ\", \"KeyX\", \"KeyC\", \"KeyV\", \"KeyB\", \"KeyN\", \"KeyM\", \"Comma\", \"Period\", \"Slash\", \"ArrowUp\", \"Close\", \"ControlLeft\", \"MetaLeft\", \"Alt\", \"Space\", \"ArrowLeft\", \"ArrowDown\", \"ArrowRight\"]\n};\n\n//# sourceURL=webpack://virtual-keyboard/./src/js/base.js?");

/***/ }),

/***/ "./src/js/create.js":
/*!**************************!*\
  !*** ./src/js/create.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createHeader\": () => (/* binding */ createHeader),\n/* harmony export */   \"createKeys\": () => (/* binding */ createKeys)\n/* harmony export */ });\n//import {keyLayout} from './base.js'\nfunction createHeader() {\n  const container = document.createElement(\"div\");\n  const footer = document.createElement(\"footer\");\n  container.classList.add(\"container\");\n  document.body.appendChild(container);\n  document.body.appendChild(footer);\n  const new_desc_inner = `<h1>Virtual Keyboard w/ Vanilla JS</h1>\n    <h3>Features</h3>\n    <ul>\n        <li>Easy to integrate</li>\n        <li>Responsive</li>\n        <li>Vanilla JS (<strong>no libraries required!</strong>)</li>\n    </ul>\n    <textarea name=\"keyboard_text\" class=\"use-keyboard-input\" rows=\"5\" cols=\"35\"></textarea>`;\n  container.insertAdjacentHTML(\"afterBegin\", new_desc_inner);\n  const new_footer_inner = `<div class=\"footer__container footer-copyright\">\n    <div class=\"footer-copyright__element\">\n        <p class=\"copyright\">©</p>\n        <p class=\"year\">2022</p>\n        <a class=\"github-username\" href=\"https://github.com/OutLaw0\" target=\"_blank\" rel=\"noopener noreferrer\">github</a>\n    </div>\n    <a href=\"https://rs.school/js/\" class=\"rss\" target=\"_blank\"> Rolling Scopes School </a>\n</div>`;\n  footer.insertAdjacentHTML(\"afterBegin\", new_footer_inner);\n}\nfunction createKeys() {\n  const fragment = document.createDocumentFragment(); //Create HTML icon\n\n  const createIconHtml = icon_name => {\n    return `<i class=\"material-icons\">${icon_name}</i>`;\n  };\n\n  const createSpecKey = name => {\n    return `<span class=\"special-key\">${name}</span>`;\n  };\n\n  this.keyLayout.en.forEach(key => {\n    const keyElement = document.createElement('button');\n    const insertLineBreak = [\"backspace\", \"Del\", \"enter\", \"&#9658;\", \"Close\"].indexOf(key) !== -1; // Add attributes/classes\n\n    keyElement.setAttribute(\"type\", \"button\");\n    keyElement.classList.add(\"keyboard__key\");\n\n    switch (key) {\n      case \"backspace\":\n        keyElement.classList.add(\"keyboard__key--wide\"); //keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        keyElement.innerHTML = createIconHtml(\"backspace\");\n        break;\n\n      case \"Ctrl\":\n        // keyElement.classList.add(\"keyboard__key--wide\");\n        //  keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n        keyElement.innerHTML = createSpecKey(\"Ctrl\");\n        break;\n\n      case \"Alt\":\n        // keyElement.classList.add(\"keyboard__key--wide\");\n        //keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n        keyElement.innerHTML = createSpecKey(\"Alt\");\n        break;\n\n      case \"Tab\":\n        //keyElement.classList.add(\"keyboard__key--wide\")\n        // keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n        keyElement.innerHTML = createSpecKey(\"Tab\");\n        break;\n\n      case \"enter\":\n        keyElement.classList.add(\"keyboard__key--wide\"); // keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        keyElement.innerHTML = createIconHtml(\"keyboard_return\");\n        break;\n\n      case \"space\":\n        keyElement.classList.add(\"keyboard__key--extra-wide\"); // keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        keyElement.innerHTML = createIconHtml(\"space_bar\");\n        break;\n\n      case \"caps\":\n        keyElement.classList.add(\"keyboard__key--wide\", \"keyboard__key--activatable\"); // keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        keyElement.innerHTML = createIconHtml(\"keyboard_capslock\");\n        break;\n\n      case \"Shift\":\n        keyElement.classList.add(\"keyboard__key--wide\", \"keyboard__key--activatable\"); // keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        keyElement.innerHTML = createSpecKey(\"Shift\");\n        break;\n\n      case \"changeLang\":\n        keyElement.classList.add(\"keyboard__key--dark\"); //  keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        keyElement.innerHTML = createIconHtml(\"language\");\n        break;\n\n      case \"Del\":\n        //keyElement.classList.add(\"keyboard__key--wide\");\n        keyElement.innerHTML = createSpecKey(\"Del\"); //  keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        break;\n\n      case \"Close\":\n        keyElement.classList.add(\"keyboard__key--wide\", \"keyboard__key--dark\"); //   keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        keyElement.innerHTML = createIconHtml(\"check_circle\");\n        break;\n\n      default:\n        keyElement.innerHTML = key.toLowerCase(); //  keyElement.classList.add(this.keyLayout.keyboardOrder[index])\n\n        break;\n    }\n\n    fragment.appendChild(keyElement);\n\n    if (insertLineBreak) {\n      fragment.appendChild(document.createElement(\"br\"));\n    }\n  });\n  return fragment;\n}\n\n//# sourceURL=webpack://virtual-keyboard/./src/js/create.js?");

/***/ }),

/***/ "./src/js/keyevents.js":
/*!*****************************!*\
  !*** ./src/js/keyevents.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"print\": () => (/* binding */ print)\n/* harmony export */ });\nfunction print(key, type) {\n  const position = this.textArea.selectionStart;\n\n  switch (key) {\n    case \"backspace\":\n      if (type == \"mousedown\" || type == \"keydown\") {\n        this.properties.value = this.properties.value.slice(0, position - 1) + this.properties.value.slice(position, this.properties.value.length);\n\n        this._triggerEvent(\"oninput\");\n\n        this.textArea.setSelectionRange(position - 1, position - 1);\n      }\n\n      break;\n\n    case \"Ctrl\":\n      break;\n\n    case \"Alt\":\n      break;\n\n    case \"Tab\":\n      if (type == \"mousedown\" || type == \"keydown\") {\n        this.properties.value = this.properties.value.slice(0, position) + \"\\t\" + this.properties.value.slice(position, this.properties.value.length);\n\n        this._triggerEvent(\"oninput\");\n\n        this.textArea.setSelectionRange(position + 1, position + 1);\n      }\n\n      break;\n\n    case \"keyboard_return\":\n      if (type == \"mousedown\" || type == \"keydown\") {\n        this.properties.value = this.properties.value.slice(0, position) + \"\\n\" + this.properties.value.slice(position, this.properties.value.length);\n\n        this._triggerEvent(\"oninput\");\n\n        this.textArea.setSelectionRange(position + 1, position + 1);\n      }\n\n      break;\n\n    case \"space_bar\":\n      if (type == \"mousedown\" || type == \"keydown\") {\n        this.properties.value = this.properties.value.slice(0, position) + \" \" + this.properties.value.slice(position, this.properties.value.length);\n\n        this._triggerEvent(\"oninput\");\n\n        this.textArea.setSelectionRange(position + 1, position + 1);\n      }\n\n      break;\n\n    case \"keyboard_capslock\":\n      {\n        if (type == \"mousedown\" || type == \"keydown\") {\n          const elem = this.elements.keys[29];\n\n          this._toggleCapsLock();\n\n          elem.classList.toggle(\"keyboard__key--active\", this.properties.capsLock);\n        }\n      }\n      break;\n\n    case \"Shift\":\n      {\n        const elem = this.elements.keys[42];\n\n        if (type == \"mousedown\" || type == \"keydown\") {\n          this._toggleShift(this.properties.langRU ? 'Shift_ru' : 'Shift_en');\n\n          elem.classList.add(\"keyboard__key--active\");\n        }\n\n        if (type == \"keyup\" || type == \"mouseup\") {\n          this._toggleLang(this.properties.langRU ? 'ru' : 'en');\n\n          elem.classList.remove(\"keyboard__key--active\");\n        }\n      }\n      break;\n\n    case \"language\":\n      if (type == \"mousedown\" || type == \"keydown\") {\n        this._toggleLang(this.properties.langRU ? 'en' : 'ru');\n\n        this.properties.langRU = !this.properties.langRU;\n      }\n\n      break;\n\n    case \"Del\":\n      if (type == \"mousedown\" || type == \"keydown\") {\n        this.properties.value = this.properties.value.substring(0, position) + this.properties.value.substring(position + 1);\n\n        this._triggerEvent(\"oninput\");\n\n        this.textArea.setSelectionRange(position, position);\n      }\n\n      break;\n\n    case \"check_circle\":\n      {\n        const elem = this.elements.keys[54];\n\n        if (type == \"mousedown\" || type == \"keydown\") {\n          elem.focus();\n          this.close();\n\n          this._triggerEvent(\"onclose\");\n        }\n      }\n      break;\n\n    default:\n      if (type == \"mousedown\" || type == \"keydown\") {\n        this.properties.value = this.properties.value.slice(0, position) + key + this.properties.value.slice(position, this.properties.value.length);\n\n        this._triggerEvent(\"oninput\");\n\n        this.textArea.setSelectionRange(position + 1, position + 1);\n      }\n\n      break;\n  }\n}\n\n//# sourceURL=webpack://virtual-keyboard/./src/js/keyevents.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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