/// <reference types="node" />
import { FileIdInfo, UniqFileIdInfo } from "./types/FileIdInfo";
declare class Util {
    static FLAGS: {
        FILE_REFERENCE_FLAG: number;
        WEB_LOCATION_FLAG: number;
    };
    static PHOTOSIZE_SOURCE_LEGACY: number;
    static PHOTOSIZE_SOURCE_THUMBNAIL: number;
    static PHOTOSIZE_SOURCE_DIALOGPHOTO_SMALL: number;
    static PHOTOSIZE_SOURCE_DIALOGPHOTO_BIG: number;
    static PHOTOSIZE_SOURCE_STICKERSET_THUMBNAIL: number;
    static UNIQUE_WEB: number;
    static UNIQUE_PHOTO: number;
    static UNIQUE_DOCUMENT: number;
    static UNIQUE_SECURE: number;
    static UNIQUE_ENCRYPTED: number;
    static UNIQUE_TEMP: number;
    static TYPES: string[];
    static UNIQUE_TYPES: string[];
    private static rleDecode;
    static rleEncode(input: string): string;
    private static posmod;
    private static readTLString;
    static packTLString(input: Buffer): Buffer;
    static base64UrlDecode(string: string): Buffer;
    static base64UrlEncode(input: Buffer | string): string;
    static to64bitBuffer(input: bigint): string;
    static to32bitBuffer(input: number): string;
    static to32bitSignedBuffer(input: number): string;
    static decodeFileId(fileId: string): FileIdInfo;
    static decodeUniqueFileId(input: string): UniqFileIdInfo;
}
export default Util;
