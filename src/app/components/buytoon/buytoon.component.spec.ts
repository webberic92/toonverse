import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytoonComponent } from './buytoon.component';

describe('BuytoonComponent', () => {
  let component: BuytoonComponent;
  let fixture: ComponentFixture<BuytoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuytoonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuytoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
