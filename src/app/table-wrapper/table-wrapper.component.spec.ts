import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableWrapperComponent } from './table-wrapper.component';
import { GetNewsService } from '../services/get-news.service';
import { ActivatedRoute } from '@angular/router';

describe('TableWrapperComponent', () => {
  let component: TableWrapperComponent;
  let fixture: ComponentFixture<TableWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWrapperComponent ],
      imports: [HttpClientTestingModule],
      providers: [GetNewsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the table header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.d-flex .news-detail-row--comments-count').textContent).toContain('Comments');
    expect(compiled.querySelector('.d-flex .news-detail-row--votes').textContent).toContain('Vote Count');
    expect(compiled.querySelector('.d-flex .news-detail-row--upvote').textContent).toContain('UpVote');
    expect(compiled.querySelector('.d-flex .news-detail-row--details').textContent).toContain('News Details');
  });
});
