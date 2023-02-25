import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from './barralateral/barralateral.component';

@NgModule({
  declarations: [BarralateralComponent],
  exports: [BarralateralComponent],
  imports: [CommonModule],
})
export class SharedModule {}
