import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './result-menu/results.component';

export const routes: Routes = [
  {path:'', component: ResultsComponent},

]

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ResultsModule { }


