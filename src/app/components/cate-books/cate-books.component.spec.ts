import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateBooksComponent } from './cate-books.component';

describe('CateBooksComponent', () => {
  let component: CateBooksComponent;
  let fixture: ComponentFixture<CateBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
