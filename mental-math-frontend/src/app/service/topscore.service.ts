import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { interval, lastValueFrom, tap, map, Observable } from "rxjs";
import { TopScoreData } from "../models";

const URL_API_MATH_GAME_SERVER = 'http://localhost:8080/api'

@Injectable()
export class TopScoreService {

    http = inject(HttpClient)

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