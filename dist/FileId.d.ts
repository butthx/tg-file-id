declare class FileId {
    version: number;
    subVersion: number;
    dcId: number;
    typeId: number;
    fileType: string | number;
    fileReference?: string;
    url?: string;
    id: bigint;
    accessHash: bigint;
    volumeId?: bigint;
    localId?: number | bigint;
    photoSizeSource?: 'legacy' | 'thumbnail' | 'dialogPhoto' | 'stickerSetThumbnail';
    photoSizeSourceId?: number;
    secret?: bigint | number;
    dialogId?: number | bigint;
    dialogAccessHash?: number | bigint;
    isSmallDialogPhoto?: boolean;
    stickerSetId?: number | bigint;
    stickerSetAccessHash?: number | bigint;
    thumbType?: string;
    thumbTypeId?: number;
    constructor();
    static fromFileId(fileId: string): FileId;
    toFileId(): string;
    toFileUniqId(): string;
    getOwnerId(): number;
}
export default FileId;
