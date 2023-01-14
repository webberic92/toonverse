import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruittownComponent } from './fruittown.component';

describe('FruittownComponent', () => {
  let component: FruittownComponent;
  let fixture: ComponentFixture<FruittownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruittownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FruittownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
