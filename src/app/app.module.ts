import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { AccessComponent } from './access/access.component';
import { BannerComponent } from './access/banner/banner.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './home/posts/posts.component';

import { AccessService } from './access/access.service';
import { AuthGuard } from './auth-guard.service';
import { AddPostComponent } from './home/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PostsComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    AccessService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
