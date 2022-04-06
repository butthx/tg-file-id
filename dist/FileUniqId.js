"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Util_1 = require("./Util");
class FileUniqId {
    constructor() {
        this.type = 0;
    }
    static fromFileId(fileId) {
        let result = (0, index_1.decodeFileId)(fileId);
        return FileUniqId.buildFromDecode(result);
    }
    static buildFromDecode(decoded) {
        let inst = new FileUniqId();
        inst.id = decoded.id;
        inst.volumeId = decoded.volumeId;
        inst.localId = decoded.localId;
        inst.url = decoded.url;
        inst.type = decoded.typeId;
        return inst;
    }
    static fromFileUniqId(fileUniqId) {
        let result = (0, index_1.decodeUniqFileId)(fileUniqId);
        return FileUniqId.buildFromDecode(result);
    }
    static fromFileIdInstance(instance) {
        let inst = new FileUniqId();
        inst.id = instance.id;
        inst.volumeId = instance.volumeId;
        inst.localId = instance.localId;
        inst.url = instance.url;
        inst.type = instance.typeId;
        return inst;
    }
    toFileUniqId() {
        let out = Util_1.default.to32bitBuffer(this.type);
        if (this.type === Util_1.default.UNIQUE_WEB && this.url) {
            out += Util_1.default.packTLString(Buffer.from(this.url));
        }
        else if (this.type === Util_1.default.UNIQUE_PHOTO && this.volumeId && this.localId) {
            out += Util_1.default.to64bitBuffer(this.volumeId);
            out += Util_1.default.to32bitSignedBuffer(this.localId);
        }
        else if (this.id) {
            out += Util_1.default.to64bitBuffer(this.id);
        }
        return Util_1.default.base64UrlEncode(Util_1.default.rleEncode(out));
    }
}
exports.default = FileUniqId;
//# sourceMappingURL=FileUniqId.js.map