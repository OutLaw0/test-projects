/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ \"./src/style/main.scss\");\n\nconst userStock = {\n  lang: 'JS',\n  frame: \"Angular\"\n};\nconst user = {\n  name: 'Vatal',\n  age: '35',\n  ...userStock\n};\nconsole.log(user);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUVBLE1BQU1BLFNBQVMsR0FBRTtBQUViQyxFQUFBQSxJQUFJLEVBQUUsSUFGTztBQUdiQyxFQUFBQSxLQUFLLEVBQUU7QUFITSxDQUFqQjtBQU9BLE1BQU1DLElBQUksR0FBRztBQUNiQyxFQUFBQSxJQUFJLEVBQUUsT0FETztBQUViQyxFQUFBQSxHQUFHLEVBQUUsSUFGUTtBQUdiLEtBQUdMO0FBSFUsQ0FBYjtBQU1BTSxPQUFPLENBQUNDLEdBQVIsQ0FBWUosSUFBWiIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpcnR1YWwta2V5Ym9hcmQvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGUvbWFpbi5zY3NzJztcclxuXHJcbmNvbnN0IHVzZXJTdG9jayA9e1xyXG5cclxuICAgIGxhbmc6ICdKUycsXHJcbiAgICBmcmFtZTogXCJBbmd1bGFyXCJcclxufVxyXG5cclxuXHJcbmNvbnN0IHVzZXIgPSB7XHJcbm5hbWU6ICdWYXRhbCcsXHJcbmFnZTogJzM1JyxcclxuLi4udXNlclN0b2NrXHJcbn1cclxuXHJcbmNvbnNvbGUubG9nKHVzZXIpIl0sIm5hbWVzIjpbInVzZXJTdG9jayIsImxhbmciLCJmcmFtZSIsInVzZXIiLCJuYW1lIiwiYWdlIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGUvbWFpbi5zY3NzLmpzIiwibWFwcGluZ3MiOiI7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpcnR1YWwta2V5Ym9hcmQvLi9zcmMvc3R5bGUvbWFpbi5zY3NzPzFjYzQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/style/main.scss\n");

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
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;