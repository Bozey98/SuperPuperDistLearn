import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsMenuComponent } from './settings-menu.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { RouterModule, Routes} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {path:'', component: SettingsMenuComponent},
  {path:'app-edit-menu/:id', component: EditMenuComponent}
]


@NgModule({
  declarations: [
    SettingsMenuComponent,
    EditMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SettingsModule { }
