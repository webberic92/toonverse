import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElGatoDiabloComponent } from './elgatodiablo.component';

describe('ElGatoDiabloComponent', () => {
  let component: ElGatoDiabloComponent;
  let fixture: ComponentFixture<ElGatoDiabloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElGatoDiabloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElGatoDiabloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
