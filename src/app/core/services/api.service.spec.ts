/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('Service: Api.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
    });
  });

  it('should ...', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
