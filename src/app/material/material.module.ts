import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';





const MaterialComponents = [MatSidenavModule, MatTooltipModule, MatExpansionModule, MatListModule, MatCardModule, MatTableModule]

@NgModule({
  exports: [MaterialComponents]
})
export class MaterialModule { }
