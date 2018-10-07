import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { getInfoService } from './getClassInfo.service';
import { AppRoutingModule } from './/app-routing.module';
import { SafePipe } from './safe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Ng6O2ChartModule } from 'ng6-o2-chart'; 



@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule, 
    HttpModule, 
    AppRoutingModule, 
    Ng6O2ChartModule ],
  declarations: [  
    AppComponent,
    LoginComponent,
    SignupComponent, 
    SafePipe,
    PageNotFoundComponent],
  providers:    [ getInfoService ],
  bootstrap:    [ AppComponent ]
})


export class AppModule { }
