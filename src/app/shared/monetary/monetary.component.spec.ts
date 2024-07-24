import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryComponent } from './monetary.component';

describe('MonetaryComponent', () => {
  let component: MonetaryComponent;
  let fixture: ComponentFixture<MonetaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonetaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
