import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

import { HttpChiffreService } from './httpChiffre.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('HttpChiffreService', () => {
  let service: HttpChiffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpChiffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
