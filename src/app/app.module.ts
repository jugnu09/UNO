import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms'
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { environment} from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { PlayComponent } from './play/play.component';
import { CellPipe } from './shared/cell.pipe';
import { NumericDirective } from './directive/numeric.directive';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("963558376168-ed1e2mjum4asp279nmlj01dk4k4j7ilb.apps.googleusercontent.com")
      }
    ]
  );
  return config;
}

const routes : Routes = [
  { path : 'play', component: PlayComponent},
  { path : 'reports', component: ReportsComponent},
  { path : 'settings', component: SettingsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ReportsComponent,
    PlayComponent,
    CellPipe,
    NumericDirective
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp (environment.fireBaseConfig),
    ToastrModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
