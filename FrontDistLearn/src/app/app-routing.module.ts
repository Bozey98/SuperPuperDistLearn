import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as TestRoutes,TestModule} from './test-menu/test.module'
import { routes as SettingsRoutes, SettingsModule } from './settings-menu/settings.module';
import { routes as ResultRoutes, ResultsModule } from './results/results.module';
import { routesIn as AuthRoutesIn,routesUp as AuthRoutesUp, AuthModule } from './authorization/auth.module';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: 'app-test-menu', children: TestRoutes, canActivate: [AuthGuard]},
  {path: 'app-settings-menu', children: SettingsRoutes, canActivate: [AuthGuard]},
  {path: 'login', children: AuthRoutesIn},
  {path: 'sign-up', children: AuthRoutesUp},
  {path: 'results', children: ResultRoutes, canActivate: [AuthGuard]}

];

@NgModule({
  declarations:[],
  imports: [
    RouterModule.forRoot(routes),
    TestModule,
    SettingsModule,
    AuthModule,
    ResultsModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
