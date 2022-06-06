import { TestBed } from '@angular/core/testing';

import { CanAccessAdminGuard } from './can-access-admin.guard';

describe('CanAccessAdminGuard', () => {
  let guard: CanAccessAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAccessAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
