import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestMenuComponent } from './test-menu.component';
import { TestQuesComponent } from './test-ques/test-ques.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  {path: '', component: TestMenuComponent},
  {path: 'app-test-ques/:id', component: TestQuesComponent}
]


@NgModule({
  declarations: [
    TestMenuComponent,
    TestQuesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class TestModule { }
