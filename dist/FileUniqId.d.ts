import FileId from "./FileId";
import { UniqFileIdInfo, FileIdInfo } from "./types/FileIdInfo";
declare class FileUniqId {
    type: number;
    id?: bigint;
    volumeId?: bigint;
    localId?: number | bigint;
    url?: string;
    static fromFileId(fileId: string): FileUniqId;
    static buildFromDecode(decoded: FileIdInfo | UniqFileIdInfo): FileUniqId;
    static fromFileUniqId(fileUniqId: string): FileUniqId;
    static fromFileIdInstance(instance: FileId): FileUniqId;
    toFileUniqId(): string;
}
export default FileUniqId;
