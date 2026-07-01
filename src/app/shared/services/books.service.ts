import { Injectable } from '@angular/core';
import { Ibook, IBookResp } from '../models/books';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  booksArr: Ibook[] = [
    {
      bookId: "BK101",
      bookName: "Atomic Habits",
      bookStatus: "Available",
      isBestSeller: true,
      rating: 4.9,
      genre: "Self Help",
      publishYear: 2018,
      description: "A practical guide to building good habits, breaking bad ones, and making small changes that lead to remarkable results.",
      coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuj7lFru3u1BhDMZIfwA14SKTyaKzZ7NEsiViMFUi8tw&s=10"
    },
    {
      bookId: "BK102",
      bookName: "The Alchemist",
      bookStatus: "Available",
      isBestSeller: true,
      rating: 3.8,
      genre: "Fiction",
      publishYear: 1988,
      description: "A young shepherd embarks on a journey to discover his personal legend and the true meaning of life.",
      coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_rzlNgAF-bc1yy0rwmY6HlDEBILJu_fHsKGoeW-_6FQ&s=10"
    },
    {
      bookId: "BK103",
      bookName: "Clean Code",
      bookStatus: "Out_of_Stock",
      isBestSeller: false,
      rating: 2.4,
      genre: "Programming",
      publishYear: 2008,
      description: "A must-read guide for software developers to write clean, maintainable, and efficient code.",
      coverImage: "https://stancalau.ro/images/articles/clean-code-book-review/CleanCode.jpg"
    },
    {
      bookId: "BK104",
      bookName: "Rich Dad Poor Dad",
      bookStatus: "Available",
      isBestSeller: true,
      rating: 3.7,
      genre: "Finance",
      publishYear: 1997,
      description: "A personal finance classic that teaches the importance of financial education and investing.",
      coverImage: "https://www.eourmart.com/cdn/shop/products/RichDadPoorDad2.png?v=1662552670&width=1445"
    }
  ];

  setFirstBookSub$ : Subject<boolean> = new Subject<boolean>()

  constructor() { }

  fetchBooksArr(): Observable<Ibook[]> {
    return of(this.booksArr);
  }

  fetchBookById(bookId: string): Observable<Ibook> {
    let book = this.booksArr.find(b => b.bookId === bookId)!
    return of(book);
  }

  addBook(newBook: Ibook): Observable<IBookResp<Ibook>> {
    this.booksArr.unshift(newBook);
    return of({
      msg: `The new Book ${newBook.bookName} is added successfully!!!`,
      data: newBook
    })
  }

  updateBook(updatedBook: Ibook): Observable<IBookResp<Ibook>>{
    let getIndex = this.booksArr.findIndex(b => b.bookId === updatedBook.bookId);
    this.booksArr[getIndex] = updatedBook;
    return of({
      msg: `The book ${updatedBook.bookName} with id ${updatedBook.bookId} is updated successfully!!!`,
      data: updatedBook
    })
  }

  removeBook(bookId: string):Observable<IBookResp<Ibook>>{
    let getIndex = this.booksArr.findIndex(b => b.bookId === bookId);
    let removedBook = this.booksArr.splice(getIndex,1);
    return of({
      msg: `The book ${removedBook[0].bookName} with id ${removedBook[0].bookId} is removed successfully!!!`,
      data: removedBook[0]
    })
  }
}
