import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsgroupComponent } from './tipsgroup.component';

describe('TipsgroupComponent', () => {
  let component: TipsgroupComponent;
  let fixture: ComponentFixture<TipsgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
