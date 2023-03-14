import { expect } from 'chai';

import { readTypes } from '../../src/csrd/index';

describe('csrd file access', () => {
  it('should return types when read', () => {
    const types = readTypes();

    expect(types).to.be.instanceOf(Array)
      .and.have.length.greaterThan(0);
  });

  it('should return expected type names', () => {
    const typeNames = readTypes().map(t => t.name);
    typeNames.sort();
    expect(typeNames).to.eql(['ADEPT', 'EXPLORER', 'SPEAKER', 'WARRIOR']);
  });
});