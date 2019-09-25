import { TestBed } from '@angular/core/testing';

import { PagarCService } from './pagar-c.service';

describe('PagarCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagarCService = TestBed.get(PagarCService);
    expect(service).toBeTruthy();
  });
});
