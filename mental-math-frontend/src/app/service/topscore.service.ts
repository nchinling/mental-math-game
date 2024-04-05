import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { interval, lastValueFrom, tap, map, Observable } from "rxjs";
import { SaveScoreResponse, TopScoreData } from "../models";

const URL_API_MATH_GAME_SERVER = 'http://localhost:8080/api'

@Injectable()
export class TopScoreService {

    http = inject(HttpClient)
    name = "";

    getTopScoreData(): Observable<TopScoreData[]> {
        console.info('>>>>>>sending to Game server...');
        return this.http.get<any[]>(`${URL_API_MATH_GAME_SERVER}/topscore`).pipe(
          map((resp: any[]) => resp.map(item => ({
            name: item.name,
            score: item.score,
            level: item.level,
            date: new Date(item.date)
          })))
        );
    }

    saveScore(score: number): Observable<SaveScoreResponse>{
      console.info('>>>> saving score in game server...')
      // const body = new HttpParams()
      // .set("id", 1)
      // .set("score", score)
      // .set("name", this.name)
      // .set("level", 1)
      const payload = {
        score: score,
        name: this.name,
        level: 1
      };
      // const body = new HttpParams()
      // .set("id", 1)
      // .set("score", score)
      // .set("name", this.name)
      // .set("level", 1)
      const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      
      return this.http.post<SaveScoreResponse>(`${URL_API_MATH_GAME_SERVER}/save-score`, payload, {headers})

    }


    // getTopScoreData(): Promise<TopScoreData[]> {
    //     const topScoreDataRequest: Promise<TopScoreData>[] = [];
    //     console.info('>>>>>>sending to Game server...')
    //     return lastValueFrom(
    //         this.http.get<TopScoreData[]>(`${URL_API_MATH_GAME_SERVER}/topscore`)
    //         .pipe(
    //             map(resp => ({ name: resp.name, score: resp.score, 
    //                         level: resp.level, date:resp.date
    //                         }))
    //         )
    //     )
    // }
}