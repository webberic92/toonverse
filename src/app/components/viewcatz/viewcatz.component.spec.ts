import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcatzComponent } from './viewcatz.component';

describe('ViewcatzComponent', () => {
  let component: ViewcatzComponent;
  let fixture: ComponentFixture<ViewcatzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcatzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcatzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
