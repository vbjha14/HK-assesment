import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdNameTypeaheadComponent } from './id-name-typeahead.component';

describe('IdNameTypeaheadComponent', () => {
  let component: IdNameTypeaheadComponent;
  let fixture: ComponentFixture<IdNameTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdNameTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdNameTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
