"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUniqId = exports.FileId = exports.decodeUniqFileId = exports.decodeFileId = void 0;
const Util_1 = require("./Util");
const FileId_1 = require("./FileId");
exports.FileId = FileId_1.default;
const FileUniqId_1 = require("./FileUniqId");
exports.FileUniqId = FileUniqId_1.default;
exports.decodeFileId = Util_1.default.decodeFileId;
exports.decodeUniqFileId = Util_1.default.decodeUniqueFileId;
//# sourceMappingURL=index.js.map