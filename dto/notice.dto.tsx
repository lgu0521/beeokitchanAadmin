export type NoticeDTO = {
  id: string;
  title: string;
  content: string;
  datetime: string;
  isNotice: boolean;
};

export interface NoticeCreateDTO extends Omit<NoticeDTO, "id"> {
  id?: string,
}

export interface NoticeDeleteDTO {
  id: string
}

export type NoticeCurrentAndAfterAndBefroeListDTO = {
  after?: NoticeDTO;
  before?: NoticeDTO;
};
