import { Component, OnInit, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Question } from '../models';
import { PlayService } from '../service/play.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question$!: Promise<Question>
  // question$!: Promise<String>
  playSvc = inject(PlayService)

  ngOnInit(): void {
    // this.question=this.playSvc.getQuestion()
    this.question$=firstValueFrom(this.playSvc.getQuestion())

  }

}
