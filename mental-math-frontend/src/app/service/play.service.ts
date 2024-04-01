import { Injectable, inject } from "@angular/core";
import { MarkedQuestion, Question } from "../models";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";


const URL_API_MATH_GAME_SERVER = 'http://localhost:8080/api'

@Injectable()
export class PlayService {
    http=inject(HttpClient)
    router = inject(Router)
    question!: string

    getQuestion(): Observable<Question> {

        return this.http.get<Question>(`${URL_API_MATH_GAME_SERVER}/generate-question`).pipe(
        );
    }

    checkAnswer(answer: string): Observable<MarkedQuestion>{
      const form = new HttpParams()
      .set("answer", answer)

      const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      
      return this.http.post<MarkedQuestion>(`${URL_API_MATH_GAME_SERVER}/check-answer`, form.toString(), {headers})

    }


}