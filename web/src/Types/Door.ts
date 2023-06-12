export type Door = {
    door_id: string,
    door_location: string,
    access_level: number,
    last_opened: string,
}

export type RawDoor = {
    door_location: string,
    access_level: number,
}