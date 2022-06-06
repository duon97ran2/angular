import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';





const MaterialComponents = [MatSidenavModule, MatButtonModule, MatGridListModule, MatTooltipModule, MatExpansionModule, MatListModule, MatCardModule, MatTableModule]

@NgModule({
  exports: [MaterialComponents]
})
export class MaterialModule { }
