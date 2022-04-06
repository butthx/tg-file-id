"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Util_1 = require("./Util");
const FileUniqId_1 = require("./FileUniqId");
class FileId {
    constructor() {
        this.version = 0;
        this.subVersion = 0;
        this.dcId = 0;
        this.typeId = 0;
        this.fileType = '';
        this.id = BigInt(0);
        this.accessHash = BigInt(0);
        this.volumeId = BigInt(0);
        this.localId = 0;
    }
    static fromFileId(fileId) {
        try {
            let decoded = (0, index_1.decodeFileId)(fileId);
            let inst = new FileId();
            inst.version = decoded.version;
            inst.subVersion = decoded.subVersion;
            inst.dcId = decoded.dcId;
            inst.typeId = decoded.typeId;
            inst.fileType = decoded.fileType;
            if (decoded.hasReference) {
                inst.fileReference = decoded.fileReference;
            }
            if (decoded.hasWebLocation) {
                inst.url = decoded.url;
                return inst;
            }
            inst.id = decoded.id;
            inst.accessHash = decoded.access_hash;
            if (decoded.typeId <= 2) {
                inst.volumeId = decoded.volumeId;
                inst.localId = decoded.localId;
                inst.photoSizeSourceId = decoded.photoSizeSource;
                switch (inst.photoSizeSourceId) {
                    case Util_1.default.PHOTOSIZE_SOURCE_LEGACY:
                        inst.secret = decoded.secret;
                        inst.photoSizeSource = 'legacy';
                        break;
                    case Util_1.default.PHOTOSIZE_SOURCE_THUMBNAIL:
                        inst.thumbType = decoded.thumbnailType;
                        inst.photoSizeSource = 'thumbnail';
                        inst.thumbTypeId = decoded.thumbTypeId;
                        break;
                    case Util_1.default.PHOTOSIZE_SOURCE_DIALOGPHOTO_SMALL:
                    case Util_1.default.PHOTOSIZE_SOURCE_DIALOGPHOTO_BIG:
                        inst.photoSizeSource = 'dialogPhoto';
                        inst.dialogId = decoded.dialogId;
                        inst.dialogAccessHash = decoded.dialogAccessHash;
                        inst.isSmallDialogPhoto = decoded.photoSizeSource === Util_1.default.PHOTOSIZE_SOURCE_DIALOGPHOTO_SMALL;
                        break;
                    case Util_1.default.PHOTOSIZE_SOURCE_STICKERSET_THUMBNAIL:
                        inst.photoSizeSource = 'stickerSetThumbnail';
                        inst.stickerSetId = decoded.stickerSetId;
                        inst.stickerSetAccessHash = decoded.stickerSetAccessHash;
                        break;
                }
            }
            return inst;
        }
        catch (e) {
            console.log(e);
            throw new Error("Invalid fileId");
        }
    }
    toFileId() {
        var _a;
        let type = this.typeId;
        if (this.fileReference)
            type |= Util_1.default.FLAGS.FILE_REFERENCE_FLAG;
        if (this.url)
            type |= Util_1.default.FLAGS.WEB_LOCATION_FLAG;
        let out = '';
        out += Util_1.default.to32bitBuffer(type);
        out += Util_1.default.to32bitBuffer(this.dcId);
        if (this.fileReference) {
            let tlString = Util_1.default.packTLString(Buffer.from(this.fileReference, 'hex'));
            out += tlString.toString('binary');
        }
        if (this.url) {
            let tlString = Util_1.default.packTLString(Buffer.from(this.url));
            out += tlString.toString('binary');
            if (this.accessHash) {
                out += Util_1.default.to64bitBuffer(this.accessHash);
            }
            return Util_1.default.base64UrlEncode(Util_1.default.rleEncode(out));
        }
        out += Util_1.default.to64bitBuffer(this.id);
        out += Util_1.default.to64bitBuffer(this.accessHash);
        if (this.typeId <= 2 && this.volumeId && this.photoSizeSourceId) {
            out += Util_1.default.to64bitBuffer(this.volumeId);
            if (this.version >= 4) {
                out += Util_1.default.to32bitBuffer(this.photoSizeSourceId);
            }
            switch (this.photoSizeSource) {
                case "legacy":
                    // @ts-ignore
                    out += Util_1.default.to64bitBuffer(this.secret);
                    break;
                case "thumbnail":
                    // @ts-ignore
                    out += Util_1.default.to32bitBuffer(this.thumbTypeId);
                    out += (_a = this.thumbType) === null || _a === void 0 ? void 0 : _a.padEnd(4, "\0");
                    break;
                case "dialogPhoto":
                    // @ts-ignore
                    out += Util_1.default.to64bitBuffer(this.dialogId);
                    // @ts-ignore
                    out += Util_1.default.to64bitBuffer(this.dialogAccessHash);
                    break;
                case "stickerSetThumbnail":
                    // @ts-ignore
                    out += Util_1.default.to64bitBuffer(this.stickerSetId);
                    // @ts-ignore
                    out += Util_1.default.to64bitBuffer(this.stickerSetAccessHash);
                    break;
            }
            // @ts-ignore
            out += Util_1.default.to32bitSignedBuffer(this.localId);
        }
        if (this.version >= 4) {
            out += String.fromCharCode(this.subVersion);
        }
        out += String.fromCharCode(this.version);
        return Util_1.default.base64UrlEncode(Util_1.default.rleEncode(out));
    }
    toFileUniqId() {
        return FileUniqId_1.default.fromFileIdInstance(this).toFileUniqId();
    }
    getOwnerId() {
        if (this.typeId === Util_1.default.TYPES.indexOf('sticker') && (this.version === 4 || this.version === 2)) {
            console.log(this.id);
            let tmp = Buffer.alloc(8);
            tmp.writeBigInt64LE(this.id & BigInt('72057589742960640'));
            return tmp.readUInt32LE(4);
        }
        return 0;
    }
}
exports.default = FileId;
// php
// 030000020400000019010004dd26603be3db1e55adc51b7970f5af5e51915875ccdc0000bb0800003d1de0517f8effa2ffeee2411e04
//node
// 030000020400000019010004dd26603be3db1e55adc51b7970f5af5e51915875ccdc0000bb0800003d1de05100000000000000001e04
//# sourceMappingURL=FileId.js.map