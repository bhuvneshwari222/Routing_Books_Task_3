export interface Ibook {
    bookId: string;
    bookName: string;
    bookStatus: string;
    isBestSeller: boolean;
    rating: number;
    genre: string;
    publishYear: number;
    description: string;
    coverImage: string;
}

export interface IBookResp<T>{
    msg: string,
    data: T
}