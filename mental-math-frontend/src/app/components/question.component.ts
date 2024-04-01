import { Component, OnInit, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MarkedQuestion, Question } from '../models';
import { PlayService } from '../service/play.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question$!: Promise<Question>
  markedQuestion$!: Promise<MarkedQuestion>
  playSvc = inject(PlayService)
  points: number = 0
  router = inject(Router)
  disableSubmitButton: boolean = false;
  endMessage!: string
  countdownInterval: any;
  remainingTime: number = 10; 
  timeUp: boolean = false;

  answerForm!: FormGroup
  fb = inject(FormBuilder)

  ngOnInit(): void {
    // this.question=this.playSvc.getQuestion()
    this.question$=firstValueFrom(this.playSvc.getQuestion())
    this.answerForm = this.fb.group({
      answer: this.fb.control<string>('', [Validators.required]),
    })

    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval); // Stop the countdown when time is up
        console.log('Time limit exceeded. Submission stopped.');
        this.disableSubmitButton = true;
        this.endMessage = "Game over!";
        this.timeUp = true; 
      }
    }, 1000); // Update the remaining time every second

    // const timer = setTimeout(() => {
    //   console.log('Time limit exceeded. Submission stopped.');
    //   this.disableSubmitButton = true;
    //   this.endMessage = "Game over!"
    // }, 10000); // 10 seconds in milliseconds

  }
  
  submitAnswer(){
    
    const answer = this.answerForm.get('answer')?.value
    console.info('Answer submitted is: ', answer)
    // this.markedQuestion$=firstValueFrom(this.playSvc.checkAnswer(answer))
    // this.question$=firstValueFrom(this.playSvc.getQuestion())
    this.answerForm.get('answer')?.reset();
    this.markedQuestion$ = firstValueFrom(this.playSvc.checkAnswer(answer))
    .then((markedQuestion: MarkedQuestion) => {
        // Check if the answer is correct and update points
        if (markedQuestion.markedQuestion === "Correct!") {
            this.points++;
        }
        return markedQuestion;
    })
    .catch((error) => {
        console.error("Error:", error);
        return { markedQuestion: 'Error' };
    });

    this.question$ = firstValueFrom(this.playSvc.getQuestion());
    
  }

  redirectToPlay() {
    this.router.navigate(['/play']);
  }

  ngOnDestroy(): void {
    // Clear the countdown interval when the component is destroyed
    clearInterval(this.countdownInterval);
  }

}
