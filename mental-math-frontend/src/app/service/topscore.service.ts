import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { interval, lastValueFrom, tap, map, Observable, firstValueFrom } from "rxjs";
import { SaveScoreResponse, TopScoreData } from "../models";

const URL_API_MATH_GAME_SERVER = 'http://localhost:8080/api'

@Injectable()
export class TopScoreService {

    http = inject(HttpClient)
    name = "";

    // getTopScoreData(): Promise<TopScoreData[]> {
    //     // const topScoreData: Promise<TopScoreData>[] = [];
    //     console.info('>>>>>>sending to Game server...');
    //     const headers = new HttpHeaders()
    //     .set("Content-Type", "application/json")
    //     const response = firstValueFrom(this.http.get<TopScoreData[]>(`${URL_API_MATH_GAME_SERVER}/topscore`, {headers}).pipe(
    //       map(resp => resp.map(item => ({
    //         name: item.name,
    //         score: item.score,
    //         level: item.level,
    //         date: new Date(item.date)
    //           })))
    //         )
    //       );
    //     console.log('Response from server:', response); 
    //     return response;
    // }

      getTopScoreData(): Observable<TopScoreData[]> {
      console.info('>>>>>>sending to Game server...');
      const headers = new HttpHeaders().set("Content-Type", "application/json");
  
      return this.http.get<TopScoreData[]>(`${URL_API_MATH_GAME_SERVER}/topscore`, { headers }).pipe(
        map((data: TopScoreData[]) =>
          data.map(item => ({
            // id: item.id,
            name: item.name,
            score: item.score,
            level: item.level,
            date: new Date(item.date)
          }))
        )
      );
    }

    // getTopScoreData(): Promise<TopScoreData[]> {
    //   console.info('>>>>>>sending to Game server...');
    //   const headers = new HttpHeaders().set("Content-Type", "application/json");
  
    //   try {
    //     const response = await firstValueFrom(
    //       this.http.get<TopScoreData[]>(`${URL_API_MATH_GAME_SERVER}/topscore`, { headers }).pipe(
    //         map((resp: TopScoreData[]) =>
    //           resp.map(item => ({
    //             // id: item.id, // Assuming you have an 'id' property in your data model
    //             name: item.name,
    //             score: item.score,
    //             level: item.level,
    //             // Assuming the response eventually includes a 'date' property
    //             // If not, remove this line or adjust accordingly
    //             date: new Date(item.date)
    //           }))
    //         )
    //       )
    //     );
  
    //     console.log('Response from server:', response); // Log the response data
    //     return response; // Return the response data
    //   } catch (error) {
    //     console.error('Error fetching top score data:', error); // Log any errors
    //     throw error; // Re-throw the error
    //   }
    // }

   

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