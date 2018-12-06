import { TestBed } from '@angular/core/testing';

import { LoginRestService } from './login-rest.service';

describe('LoginRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRestService = TestBed.get(LoginRestService);
    expect(service).toBeTruthy();
  });
});
