import {tests} from './tests.setup';
import assert from 'assert';
import RandExp from "../lib/randexp";
import { describe, it } from 'vitest'


const match = (regexp:any, str:string, bad:string) => {
  let err = `Generated string '${str}' ` +
            (bad ? 'matches' : 'does not match') +
            ` regexp '${regexp.source}'`;
  let t = regexp.test(str);
  assert.ok(bad !== t, err);
};


for (let type in tests) {
  describe(type, () => {
    for (let row in tests[type]) {
      let t = tests[type][row];
      it(t.desc, () => {
        let regs = t.regexp;
        if (!Array.isArray(regs)) { regs = [regs]; }

        for (let reg of regs) {
          let rand = new RandExp(reg);

          // Generate several times.
          for (let k = 0; k < 5; k++) {
            match(reg, rand.gen(), t.bad || false);
            match(reg, RandExp.randexp(reg), t.bad || false);
          }
        }
      });
    }
  });
}

describe('Call with a string', () => {
  it('Returns a correctly generated string', () => {
    let r = new RandExp('\\d{4}');
    assert.equal(r.gen().length, 4);
  });

  describe('With options', () => {
    it('Detects options and sets them', () => {
      let r = new RandExp('hello', 'i');
      assert.ok(r.ignoreCase);
      assert.ok(!r.multiline);
    });
  });
});

describe('Call shorthand randexp method with a string', () => {
  it('Returns a correctly generated string', () => {
    let r = RandExp.randexp('\\d{4}');
    assert.strictEqual(r.length, 4);
  });
});

describe('Call without a string or regular expression', () => {
  it('Throws an error', () => {
    assert.throws(() => {
      let r = new RandExp({} as any);
      r.gen();
    }, /Expected a regexp or string/);
  });
});

describe('Followed by groups', () => {
  it('Generate nothing, for now', () => {
    assert.strictEqual(RandExp.randexp(/hi(?= no one)/), 'hi');
    assert.strictEqual(RandExp.randexp(/hi(?! no one)/), 'hi');
  });
});
