import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchKeyComponent } from './filter-search-key.component';

describe('FilterSearchKeyComponent', () => {
  let component: FilterSearchKeyComponent;
  let fixture: ComponentFixture<FilterSearchKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSearchKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSearchKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
