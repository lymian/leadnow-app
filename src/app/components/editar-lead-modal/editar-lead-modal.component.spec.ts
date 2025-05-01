import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLeadModalComponent } from './editar-lead-modal.component';

describe('EditarLeadModalComponent', () => {
  let component: EditarLeadModalComponent;
  let fixture: ComponentFixture<EditarLeadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarLeadModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarLeadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
