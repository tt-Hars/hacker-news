import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowComponent } from './row.component';
import { GetNewsService } from '../services/get-news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';


describe('RowComponent', () => {
  let component: RowComponent;
  let fixture: ComponentFixture<RowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowComponent ],
      imports: [HttpClientTestingModule],
      providers: [GetNewsService, {
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                paramMap: {
                    get(): number {
                        return 1;
                    },
                },
            },
        },
    }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // fixture.detectChanges();
    // component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should emit data to table component', () => {
    spyOn(component.emittedaction, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#upvote-news');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.emittedaction.emit).toHaveBeenCalledWith(Object);
  });
});
