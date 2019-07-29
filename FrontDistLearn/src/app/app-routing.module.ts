import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as TestRoutes,TestModule} from './test-menu/test.module'
import { routes as SettingsRoutes, SettingsModule } from './settings-menu/settings.module';
import { routesIn as AuthRoutesIn,routesUp as AuthRoutesUp, AuthModule } from './authorization/auth.module';


const routes: Routes = [
  {path: 'app-test-menu', children: TestRoutes},
  {path: 'app-settings-menu', children: SettingsRoutes},
  {path: 'login', children: AuthRoutesIn},
  {path: 'sign-up', children: AuthRoutesUp}

];

@NgModule({
  declarations:[],
  imports: [
    RouterModule.forRoot(routes),
    TestModule,
    SettingsModule,
    AuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
