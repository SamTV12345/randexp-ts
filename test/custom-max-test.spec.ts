import assert from 'assert'
import RandExp from '../lib/randexp'
import { expect,afterEach, describe, it } from 'vitest'


describe('Modify max', () => {
  it('Should generate infinite repetitionals with new max', () => {
    let re = new RandExp(/.*/);
    re.max = 0;
    let output = re.gen();
    assert.strictEqual(output, '');

    let r = /.*/;
    Object.assign(r, {max: 0})
    output = RandExp.randexp(r);
    assert.strictEqual(output, '');

    afterEach(() => {
      delete RandExp.prototype.max;
    });
    RandExp.prototype.max = 0;
    re = new RandExp(/.*/);
    output = re.gen();
    expect(output).toBe('');
  });
});
