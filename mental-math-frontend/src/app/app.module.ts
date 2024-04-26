import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayComponent } from './components/play.component';
import { NavbarComponent } from './components/navbar.component';
import { MainComponent } from './components/main.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopScoreService } from './service/topscore.service';
import { PlayService } from './service/play.service';
import { QuestionComponent } from './components/question.component';
import { RankingComponent } from './components/ranking.component';



const appRoutes: Routes = [
  { path: '', component: MainComponent, title: 'Welcome to Math Dash' },
  { path: 'play', component: PlayComponent, title: 'Play' },
  { path: 'question', component: QuestionComponent, title: 'Question' },
  { path: 'rank', component: RankingComponent, title: 'Rank' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    NavbarComponent,
    MainComponent,
    QuestionComponent,
    RankingComponent,
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true}),
  ],
  exports: [RouterModule],
  providers: [TopScoreService,PlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
