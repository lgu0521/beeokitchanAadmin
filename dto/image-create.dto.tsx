export interface TmpImageBlock {
  imageFile: FileList;
}
export interface ImageBlock {
  storageRef: string;
  downloadUrl: string;
  fileName: string;
}

export interface ImageBlocks {
  imageFileList: ImageBlock[];
}
