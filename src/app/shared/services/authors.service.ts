import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IAuthor, IAuthorResp } from '../models/authors';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  authorsArr: IAuthor[] = [
    {
      authorId: "AUT101",
      authorName: "James Clear",
      authorRole: "Author",
      biography: "James Clear is a writer and speaker focused on habits, decision-making, and continuous improvement.",
      profileImage: "https://assets.penguinrandomhouse.com/wp-content/uploads/2019/05/18130129/PRH-James-Clear-Interview-Article-Header-1080x1080-1.png",
      skills: [
        "Writing",
        "Public Speaking",
        "Productivity",
        "Personal Development"
      ],
      experienceYears: "12 Years",
      isActive: true,
      address: {
        current: {
          city: "Columbus",
          state: "Ohio",
          country: "USA",
          zipcode: "43004"
        },
        permanent: {
          city: "Hamilton",
          state: "Ohio",
          country: "USA",
          zipcode: "45011"
        }
      },
      isAddressSame: false
    },
    {
      authorId: "AUT102",
      authorName: "Paulo Coelho",
      authorRole: "Author",
      biography: "Brazilian novelist best known for inspirational fiction and philosophical storytelling.",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvoZR8PG4dSCW5Al6DqjGMQIvRNhqtxyQ7uU16CSMoKA&s=10",
      skills: [
        "Writing",
        "Storytelling",
        "Poetry"
      ],
      experienceYears: "35 Years",
      isActive: false,
      address: {
        current: {
          city: "Rio de Janeiro",
          state: "Rio de Janeiro",
          country: "Brazil",
          zipcode: "20000"
        },
        permanent: {
          city: "Rio de Janeiro",
          state: "Rio de Janeiro",
          country: "Brazil",
          zipcode: "20000"
        }
      },
      isAddressSame: true
    },
    {
      authorId: "AUT103",
      authorName: "Robert C. Martin",
      authorRole: "Author",
      biography: "Software engineer and author widely known as 'Uncle Bob' in the programming community.",
      profileImage: "https://upload.wikimedia.org/wikipedia/commons/4/47/Robert_C._Martin_surrounded_by_computers_%28cropped%29.jpg",
      skills: [
        "Software Development",
        "Programming",
        "Architecture",
        "Writing"
      ],
      experienceYears: "40 Years",
      isActive: true,
      address: {
        current: {
          city: "Chicago",
          state: "Illinois",
          country: "USA",
          zipcode: "60007"
        },
        permanent: {
          city: "Chicago",
          state: "Illinois",
          country: "USA",
          zipcode: "60007"
        }
      },
      isAddressSame: true
    },
    {
      authorId: "AUT104",
      authorName: "Robert Kiyosaki",
      authorRole: "Author",
      biography: "Entrepreneur and financial educator best known for books on personal finance and investing.",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpg8b5vle5KBHcxelV1uRpJJybHmBZLiK3-AjVf64PlJfHa0rh2LFKnjs&s=10",
      skills: [
        "Finance",
        "Investing",
        "Writing",
        "Business"
      ],
      experienceYears: "30 Years",
      isActive: false,
      address: {
        current: {
          city: "Phoenix",
          state: "Arizona",
          country: "USA",
          zipcode: "85001"
        },
        permanent: {
          city: "Phoenix",
          state: "Arizona",
          country: "USA",
          zipcode: "85001"
        }
      },
      isAddressSame: true
    }
  ];

  setFirstAuthorSub$: Subject<boolean> = new Subject<boolean>()

  constructor() { }

  fetchAuthorsArray(): Observable<IAuthor[]> {
    return of(this.authorsArr)
  }

  fetchAuthorById(id: string): Observable<IAuthor> {
    let author = this.authorsArr.find(a => a.authorId === id)!
    return of(author);
  }

  addAuthor(newAuthor: IAuthor): Observable<IAuthorResp<IAuthor>> {
    this.authorsArr.unshift(newAuthor);
    return of({
      msg: `The new author ${newAuthor.authorName} is added successfully`,
      data: newAuthor
    })
  }

  updateAuthor(updatedAuthor: IAuthor): Observable<IAuthorResp<IAuthor>> {
    let getIndex = this.authorsArr.findIndex(a => a.authorId === updatedAuthor.authorId)
    this.authorsArr[getIndex] = updatedAuthor;
    return of({
      msg: `The author ${updatedAuthor.authorName} with id ${updatedAuthor.authorId} is updated successfully!!!`,
      data: updatedAuthor
    })
  }

  removeAuthor(id: string): Observable<IAuthorResp<IAuthor>> {
    let getIndex = this.authorsArr.findIndex(a => a.authorId === id);
    let removedAuth = this.authorsArr.splice(getIndex, 1);
    return of({
      msg: `The author ${removedAuth[0].authorName} with id ${removedAuth[0].authorId} is removed successfully!!!`,
      data: removedAuth[0]
    })
  }
}
