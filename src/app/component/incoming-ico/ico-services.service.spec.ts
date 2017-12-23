import { TestBed, inject } from '@angular/core/testing';

import { IcoServicesService } from './ico-services.service';

describe('IcoServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IcoServicesService]
    });
  });

  it('should be created', inject([IcoServicesService], (service: IcoServicesService) => {
    expect(service).toBeTruthy();
  }));
});
