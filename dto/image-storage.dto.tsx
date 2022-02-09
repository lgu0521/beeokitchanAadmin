export type ImageStoreageDTO = {
  storageRef: string;
  fileName: string;
  downloadUrl: string;
};

export interface ImageStoreageWithOrderDTO extends ImageStoreageDTO {
  order: number;
};
