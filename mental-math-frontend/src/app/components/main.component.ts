import { Component, inject } from '@angular/core';
import { TopScoreData } from '../models';
import { TopScoreService } from '../service/topscore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  topScoreData$!:Observable<TopScoreData[]>
  topScoreSvc = inject(TopScoreService)

  ngOnInit():void{
    this.topScoreData$ = this.topScoreSvc.getTopScoreData();

  }

}
