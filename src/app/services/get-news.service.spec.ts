import { TestBed } from '@angular/core/testing';

import { GetNewsService } from './get-news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetNewsService', () => {
  let service: GetNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GetNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
