import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BlogComponent} from "./blog/blog.component";


const routes: Routes = [
  { path: '', component:BlogComponent },
  // { path: '',   redirectTo: 'blog/', pathMatch: 'full' },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
