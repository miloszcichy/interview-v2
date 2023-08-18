import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { UserApi } from './service/user/user.api';
import { PermissionsApi } from './service/permissions/permissions.api';
import { ContentApi } from './service/content/content.api';
import { DecodeService } from './service/decode/decode.service';
import { PrioritiesApi } from './service/description/priorities.api';


@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent],
  providers: [UserApi, PermissionsApi, ContentApi, DecodeService, PrioritiesApi]
})
export class AppModule { }
