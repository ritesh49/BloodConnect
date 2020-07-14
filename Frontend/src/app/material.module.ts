import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog'
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';



const modules = [
  MatInputModule,
  MatButtonModule,
  MatChipsModule,
  MatCardModule,
  MatStepperModule,
  MatGridListModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatIconModule,
  MatFormFieldModule,
  MatPaginatorModule,
  BrowserAnimationsModule,
  MatExpansionModule,
  MatDialogModule,
  MatTabsModule
];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialModule {}
