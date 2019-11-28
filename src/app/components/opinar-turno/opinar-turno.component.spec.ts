import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinarTurnoComponent } from './opinar-turno.component';

describe('OpinarTurnoComponent', () => {
  let component: OpinarTurnoComponent;
  let fixture: ComponentFixture<OpinarTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinarTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
