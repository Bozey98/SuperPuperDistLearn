import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { ReactiveFormsModule } from '@angular/forms'

export const routesUp: Routes = [
  {path: '', component: SignUpComponent} 
]

export const routesIn: Routes = [
  {path: '', component: LogInComponent},  
]

@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

