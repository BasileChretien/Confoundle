import { loadPuzzles } from "./puzzles";
import { loadItemBank } from "./puzzles/itemBank";

/**
 * What `main.tsx` does before it renders, done once for every test file.
 *
 * The puzzle registry and the Trap Hunt bank are behind dynamic imports so
 * they stay out of the app shell (see `puzzles/index.ts`). Their synchronous
 * accessors therefore throw until the load has resolved, which is correct for
 * the app and inconvenient for a suite where roughly forty files reach a view
 * or a helper that reads one of them.
 *
 * The alternative was a `beforeAll` in each of those files. That is the shape
 * this repo has already argued against twice, in `vitest.config.ts` and in
 * `declaredColors.test.ts`: a guard maintained by hand is maintained by the
 * person least likely to know it exists, and the forty-first file would simply
 * forget. Priming here means a new test never has to know the split happened.
 *
 * IT DOES NOT WEAKEN THE SPLIT. Nothing about loading these in the test
 * environment lets them back into the app graph; that is a separate property
 * and `shellSplit.test.ts` is what checks it. A test that wants the eager
 * modules directly still imports `puzzles/all` and `puzzles/testItems`, which
 * is what all of them do.
 */
await Promise.all([loadPuzzles(), loadItemBank()]);
