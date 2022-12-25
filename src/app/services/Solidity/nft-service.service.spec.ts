import { TestBed } from '@angular/core/testing';

import NftServiceService from "./nft.service"
describe('NftServiceService', () => {
  let service: typeof NftServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
