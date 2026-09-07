export interface TCreateArea {
    name: string;
    code: string;
    district?: string;
}

export interface TUpdateArea {
    name?: string;
    code?: string;
    district?: string;
}