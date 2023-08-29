import RandExp from "../lib/randexp";
import { expect, describe, it } from 'vitest'


// This is a simple "good enough" PRNG.
const initialSeed = Math.random() * Math.pow(2, 32) + Date.now();
const prng = () => {
  let seed = initialSeed;
  return (a:number, b:number) => {
    seed = Math.pow(seed, 2) % 94906249;
    return seed % (1 + b - a) + a;
  };
};

describe('Modify PRNG', () => {
  it('Should generate the same string with the same the PRNG seed', () => {
    let aRE = new RandExp(/.{100}/);
    aRE.randInt = prng();
    let a = aRE.gen();

    let bRE = new RandExp(/.{100}/);
    bRE.randInt = prng();
    let b = bRE.gen();

    let originalRandInt = RandExp.prototype.randInt;
    RandExp.prototype.randInt = prng();
    let c = RandExp.randexp(/.{100}/);
    RandExp.prototype.randInt = originalRandInt;

    let r = /.{100}/;
    Object.assign(r, {randInt: prng()});
    let d = RandExp.randexp(r);

    expect(a).toBe(b) // same seed should produce same output
    expect(a).toBe(c)// 'same seed should produce same output');
    expect(a).toBe(d) //'same seed should produce same output');
  });
});
