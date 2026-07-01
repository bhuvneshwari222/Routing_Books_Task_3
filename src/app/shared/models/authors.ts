export interface IAuthor {
    authorId: string
    authorName: string
    authorRole: string
    biography: string
    profileImage: string
    skills: string[]
    experienceYears: string
    isActive: boolean
    address: Address
    isAddressSame: boolean
}

export interface Address {
    current: Current
    permanent: Permanent
}

export interface Current {
    city: string
    state: string
    country: string
    zipcode: string
}

export interface Permanent {
    city: string
    state: string
    country: string
    zipcode: string
}

export interface IAuthorResp<T>{
    msg: string;
    data: T
}