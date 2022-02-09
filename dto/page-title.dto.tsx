export interface PageTitleDTO {
    id?: string,
    title: string,
    content_1: string,
    content_2?: string
}

export interface PageTitleModifyDTO extends Omit<PageTitleDTO, "id">{
    id: string
}