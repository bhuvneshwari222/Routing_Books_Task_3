import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ILibrary } from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {
  librariesArr = [
    {
      libraryId: "LIB101",
      libraryName: "Central City Library",
      libraryType: "Public",
      isMembershipRequired: true,
      totalBooks: 25000,
      establishedYear: 1985,
      description:
        "One of the largest public libraries offering thousands of books, digital resources, and reading spaces for students and professionals.",
      libraryImage: "https://content3.jdmagicbox.com/v2/comp/mangalore/k8/0824px824.x824.000143109016.w9k8/catalogue/city-central-library-kodialbail-mangalore-reading-libraries-X0cgxqMYSM.jpg"
    },
    {
      libraryId: "LIB102",
      libraryName: "Knowledge Hub Library",
      libraryType: "Private",
      isMembershipRequired: true,
      totalBooks: 15000,
      establishedYear: 2001,
      description:
        "A modern private library specializing in technology, business, and competitive exam preparation books.",
      libraryImage: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a25vd2xlZGdlJTIwaHVifGVufDB8fDB8fHww"
    },
    {
      libraryId: "LIB103",
      libraryName: "National Digital Library",
      libraryType: "Digital",
      isMembershipRequired: false,
      totalBooks: 100000,
      establishedYear: 2015,
      description:
        "An online digital library providing free access to e-books, research papers, and educational resources.",
      libraryImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFoEuGH-XXh--vg9EOLGn0O8npmfEwuHxjoBvzX9ayVvq0Lohnfm6tlRc&s=10"
    },
    {
      libraryId: "LIB104",
      libraryName: "University Learning Center",
      libraryType: "Academic",
      isMembershipRequired: true,
      totalBooks: 40000,
      establishedYear: 1998,
      description:
        "An academic library offering textbooks, journals, research papers, and study materials for university students.",
      libraryImage: "https://www.alliance.edu.in/siteassets/images/Alliance-209.jpg"
    }
  ];

  setFirstLibrarySub$ : Subject<boolean> = new Subject<boolean>();

  constructor() { }

  fetchLibraryArr(): Observable<ILibrary[]>{
    return of(this.librariesArr)
  }

  fetchLibraryById(id: string): Observable<ILibrary>{
    let library = this.librariesArr.find(l => l.libraryId === id)!;
    return of(library)
  }
}
