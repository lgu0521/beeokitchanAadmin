export interface FranChiseDTO {
  id: string;
  datetime: string;
  step: string;
  description: string;
}

export interface FranChiseCreateDTO extends Omit<FranChiseDTO, "id"> {
  id?: string;
}

export interface FranChiseDeleteDTO {
  id: string;
}
