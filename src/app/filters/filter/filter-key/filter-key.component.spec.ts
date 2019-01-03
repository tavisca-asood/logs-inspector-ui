import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterKeyComponent } from './filter-key.component';

describe('FilterKeyComponent', () => {
  let component: FilterKeyComponent;
  let fixture: ComponentFixture<FilterKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
