export interface TCreateSchedule {
    areaId: string;
    startTime: string | Date;
    endTime: string | Date;
    date: string | Date;
    status?: string;
}

export interface TUpdateSchedule {
    areaId?: string;
    startTime?: string | Date;
    endTime?: string | Date;
    date?: string | Date;
    status?: string;
}