import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIntroComponent } from './admin-intro.component';

describe('AdminIntroComponent', () => {
  let component: AdminIntroComponent;
  let fixture: ComponentFixture<AdminIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
