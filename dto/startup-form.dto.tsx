export interface StartUpFormDTO{
    name: string,
    phonenumber: string,
    area: string,
    experience: string,
    openday: string,
    money: string;
}

export interface StartUpFormListDTO extends StartUpFormDTO{
    id: string
}