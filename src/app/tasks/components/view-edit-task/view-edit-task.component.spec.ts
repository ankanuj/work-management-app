import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditTaskComponent } from './view-edit-task.component';

describe('ViewEditTaskComponent', () => {
  let component: ViewEditTaskComponent;
  let fixture: ComponentFixture<ViewEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEditTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
