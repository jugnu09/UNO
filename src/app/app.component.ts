import { Component } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UNO';
  data;
  public loggedIn: boolean;
  constructor( private socialAuthService: AuthService ) {}

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.data = userData;
        this.loggedIn = (userData!=null);
      }
    );
  }
  logout() {
    //this.socialAuthService.logout();
  }
}
