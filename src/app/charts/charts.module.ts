import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng6O2ChartModule } from 'ng6-o2-chart';


const routes: Routes = [
  { path: '', component: ChartsComponent }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    Ng6O2ChartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChartsComponent]
})
export class ChartsModule { }
