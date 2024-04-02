import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopScoreService } from '../service/topscore.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  
  nameForm!: FormGroup
  fb = inject(FormBuilder)
  router = inject(Router)
  topScoreSvc = inject(TopScoreService)

  ngOnInit(): void {
   
    this.nameForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+')]),
    })
  }
  

  getQuestion(){
    if (this.nameForm.valid) {
      const userName = this.nameForm.get('name')?.value;
      console.log('Submitted Name:', userName);
      this.topScoreSvc.name = userName
    } else {
      console.log('Invalid Form');
    }
    this.router.navigate(['/question'])
  }

}
