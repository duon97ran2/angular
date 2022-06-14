import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';






const MaterialComponents = [MatAutocompleteModule, MatStepperModule, MatBadgeModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatGridListModule, MatTooltipModule, MatExpansionModule, MatListModule, MatCardModule, MatTableModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatIconModule]

@NgModule({
  exports: [MaterialComponents]
})
export class MaterialModule { }
