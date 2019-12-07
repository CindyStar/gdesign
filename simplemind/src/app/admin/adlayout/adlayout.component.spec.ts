import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdlayoutComponent } from './adlayout.component';

describe('AdlayoutComponent', () => {
  let component: AdlayoutComponent;
  let fixture: ComponentFixture<AdlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
