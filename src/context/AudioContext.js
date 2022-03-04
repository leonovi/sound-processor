"use strict";
exports.__esModule = true;
exports.useAudioContext = exports.AudioContext = void 0;
var react_1 = require("react");
exports.AudioContext = (0, react_1.createContext)(null);
var useAudioContext = function () { return (0, react_1.useContext)(exports.AudioContext); };
exports.useAudioContext = useAudioContext;
