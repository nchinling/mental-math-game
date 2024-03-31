import { Injectable, inject } from "@angular/core";
import { Question } from "../models";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";


const URL_API_MATH_GAME_SERVER = 'http://localhost:8080/api'

@Injectable()
export class PlayService {
    http=inject(HttpClient)
    router = inject(Router)
    question!: string

    getQuestion(): Observable<Question> {

        // const form = new HttpParams()
        //   .set("username", username)
        //   .set("password", password)
    
        // const headers = new HttpHeaders()
        //   .set("Content-Type", "application/x-www-form-urlencoded")
    
        return this.http.get<Question>(`${URL_API_MATH_GAME_SERVER}/generate-question`).pipe(
        //   tap(response => {
        //     this.question = response.question;

        //   })
        );
        // return this.http.get<String>(`${URL_API_MATH_GAME_SERVER}/generate-question`)
      }


}