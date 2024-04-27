import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TopScoreData } from '../models';
import { TopScoreService } from '../service/topscore.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  topScoreData$!:Observable<TopScoreData[]>
  topScoreSvc = inject(TopScoreService)

  ngOnInit(): void {
    this.topScoreData$ = this.topScoreSvc.getTopScoreData()
    
    this.topScoreData$.subscribe(
      (data: TopScoreData[]) => {
        if (data.length === 0) {
          console.log("Data is empty.");
        } else {
          console.log("Data returned:", data);
        }
      },
      (error) => {
        console.error("Error fetching top scores:", error);
      }
    );

  }

}
