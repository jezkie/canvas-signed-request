import { TestBed } from '@angular/core/testing';

import { SignedRequestService } from './signed-request.service';

describe('SignedRequestService', () => {
  let service: SignedRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignedRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
