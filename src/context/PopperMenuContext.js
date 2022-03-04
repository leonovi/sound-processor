"use strict";
exports.__esModule = true;
exports.usePopperMenuContext = exports.PopperMenuContext = void 0;
var react_1 = require("react");
exports.PopperMenuContext = (0, react_1.createContext)(null);
var usePopperMenuContext = function () { return (0, react_1.useContext)(exports.PopperMenuContext); };
exports.usePopperMenuContext = usePopperMenuContext;
