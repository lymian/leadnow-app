import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGerenteComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardGerenteComponent;
  let fixture: ComponentFixture<DashboardGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGerenteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
