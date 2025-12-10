import { TestBed } from '@angular/core/testing';

import { PadariaApiService } from './padaria-api.service';

describe('PadariaApiService', () => {
  let service: PadariaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PadariaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
