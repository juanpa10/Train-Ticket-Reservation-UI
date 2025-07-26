import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrainComponent } from './list-train.component';

describe('ListTrainComponent', () => {
  let component: ListTrainComponent;
  let fixture: ComponentFixture<ListTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
