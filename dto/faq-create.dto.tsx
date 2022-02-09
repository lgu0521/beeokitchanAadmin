export interface FaqDTO {
    id: string,
    order: number,
    title: string,
    content: string
}

export interface FaqCreateDTO extends Omit<FaqDTO, "id"> {
    id?: string,
}

export interface FaqDeleteDTO {
    id: string
}
