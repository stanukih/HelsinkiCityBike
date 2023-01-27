import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StantionAddPageComponent } from './stantion-add-page.component';

describe('StantionAddPageComponent', () => {
  let component: StantionAddPageComponent;
  let fixture: ComponentFixture<StantionAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StantionAddPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StantionAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
