import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchBoxComponent,
    HeaderUserComponent
  ],
  exports:[

  ]
})
export class SharedModule { }
