import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as TestRoutes,TestModule} from './test-menu/test.module'
import { routes as SettingsRoutes, SettingsModule } from './settings-menu/settings.module';


const routes: Routes = [
  {path: 'app-test-menu', children: TestRoutes},
  {path: 'app-settings-menu', children: SettingsRoutes}
];

@NgModule({
  declarations:[],
  imports: [
    RouterModule.forRoot(routes),
    TestModule,
    SettingsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
