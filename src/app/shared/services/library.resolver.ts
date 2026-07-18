import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ILibrary } from "../models/library";
import { LibrariesService } from "./libraries.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class LibraryResolver implements Resolve<ILibrary | ILibrary[]> {
    private _libraryService = inject(LibrariesService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ILibrary | ILibrary[] | Observable<ILibrary | ILibrary[]> | Promise<ILibrary | ILibrary[]> {
        let libraryId = route.paramMap.get('libraryID');
        if (libraryId) {
            return this._libraryService.fetchLibraryById(libraryId)
        } else {
            return this._libraryService.fetchLibraryArr();
        }
    }
}