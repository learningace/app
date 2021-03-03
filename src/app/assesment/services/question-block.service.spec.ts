import { TestBed } from '@angular/core/testing';

import { QuestionBlockService } from './question-block.service';

describe('QuestionBlockService', () => {
  let service: QuestionBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
