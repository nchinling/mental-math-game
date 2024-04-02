import { Component, ElementRef, OnInit, inject} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MarkedQuestion, Question, SaveScoreResponse } from '../models';
import { PlayService } from '../service/play.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopScoreService } from '../service/topscore.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question$!: Promise<Question>
  markedQuestion$!: Promise<MarkedQuestion>
  saveScore$!: Promise<SaveScoreResponse>
  playSvc = inject(PlayService)
  topScoreSvc = inject(TopScoreService)
  points: number = 0
  router = inject(Router)
  disableSubmitButton: boolean = false;
  endMessage!: string
  countdownInterval: any;
  remainingTime: number = 10; 
  timeUp: boolean = false;
  name!:string

  answerForm!: FormGroup
  fb = inject(FormBuilder)

  ngOnInit(): void {
    // this.question=this.playSvc.getQuestion()
    // this.question$=firstValueFrom(this.playSvc.getQuestion())
    this.loadQuestion();
    this.answerForm = this.fb.group({
      answer: this.fb.control<string>('', [Validators.required]),
    })

    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval); 
        console.log('Time limit exceeded. Submission stopped.');
        this.disableSubmitButton = true;
        this.endMessage = "Game over!";
        this.timeUp = true; 
        this.saveScore$ = firstValueFrom(this.topScoreSvc.saveScore(this.points))
      }
    }, 1000); 

  }
  
  submitAnswer(){
    
    const answer = this.answerForm.get('answer')?.value
    console.info('Answer submitted is: ', answer)
    // this.markedQuestion$=firstValueFrom(this.playSvc.checkAnswer(answer))
    // this.question$=firstValueFrom(this.playSvc.getQuestion())
    this.markedQuestion$ = firstValueFrom(this.playSvc.checkAnswer(answer))
    this.markedQuestion$.then((markedQuestion: MarkedQuestion) => {
        // Check if the answer is correct and update points
        if (markedQuestion.markedQuestion === "Correct!") {
            this.points++;
        }
        // this.question$ = firstValueFrom(this.playSvc.getQuestion());
        this.loadQuestion();
    })
    .catch((error) => {
        console.error("Error:", error);
        return { markedQuestion: 'Error' };
    });
    this.answerForm.get('answer')?.reset();
   
    
  }

  loadQuestion() {
    this.question$ = firstValueFrom(this.playSvc.getQuestion());
  }

  redirectToPlay() {
    this.router.navigate(['/play']);
  }

  ngOnDestroy(): void {
    // Clear the countdown interval when the component is destroyed
    clearInterval(this.countdownInterval);
  }

  ngAfterViewInit() {
    // Focus on the input element after view initialization
    // this.answerInput.nativeElement.focus();

  }

}
