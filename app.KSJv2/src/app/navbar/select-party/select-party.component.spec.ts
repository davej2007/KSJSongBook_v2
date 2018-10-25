import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPartyComponent } from './select-party.component';

describe('SelectPartyComponent', () => {
  let component: SelectPartyComponent;
  let fixture: ComponentFixture<SelectPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
