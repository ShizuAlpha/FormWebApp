import { TestBed } from '@angular/core/testing';

import { CopyFormService } from './copy-form.service';

describe('CopyFormService', () => {
  let service: CopyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
