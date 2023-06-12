export type User = {
    user_id: string,
    username: string,
    register_date: string,
    expiration_date: string | null,
    card_number: string,
    role_id: string,
    pin_code: string,
    hashed_password: string,
}

export type RawUser = {
    username: string,
    expiration_date: string | null,
    card_number: string,
    role_id: string,
    raw_password: string,
}