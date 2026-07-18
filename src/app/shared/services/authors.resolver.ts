import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IAuthor } from "../models/authors";
import { Observable } from "rxjs";
import { AuthorsService } from "./authors.service";


@Injectable({
    providedIn: 'root'
})
export class AuthorsResolver implements Resolve<IAuthor | IAuthor[]>{
    private _authorsService = inject(AuthorsService)

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAuthor | IAuthor[] | Observable<IAuthor | IAuthor[]> | Promise<IAuthor | IAuthor[]> {
        let authorId = route.paramMap.get('authorID');
        if(authorId){
            return this._authorsService.fetchAuthorById(authorId);
        }else{
            return this._authorsService.authorsArr;
        }
    }
}