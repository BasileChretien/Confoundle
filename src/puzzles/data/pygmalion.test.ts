import { describe, expect, it } from "vitest";
import { pygmalion } from "./pygmalion";
import {
  differenceOn,
  exposureGapOn,
  matchedTiers,
  pairAt,
  showsExposure,
  unmatchedTiers,
} from "../../engine/charts/delivered";

/**
 * Chen et al. (2019), Nature Human Behaviour, PMC7494051, read at source
 * through the NCBI efetch full-text endpoint, then reconciled against the
 * trial-level CSVs the authors published on GitHub.
 *
 * The paper reports mixed-model coefficients and no cell means, so the four
 * means this card draws were computed from those files. That makes the
 * reconciliation below the load-bearing part of this test: the recomputed
 * paired differences have to reproduce the published coefficients, or the means
 * are describing something other than what the paper analysed.
 *
 * The other half of the file is a set of PROHIBITIONS on the prose, and they
 * matter more here than on most cards. The whole design rests on the setup
 * withholding one column and the reveal supplying it, so a temperature that
 * leaked into the framing would empty the puzzle without breaking anything a
 * type checker or a schema could see. Those guards self-test before they are
 * trusted, because a guard that matches nothing passes silently.
 */
const raw = pygmalion.setup.data;
if (raw.type !== "delivered") throw new Error("expected delivered data");
const data = raw;

/**
 * The published mixed-model coefficients, Study 3, from the Results section.
 * The card draws raw paired means; these are what those means have to agree
 * with in sign, size and standard error.
 */
const PUBLISHED = {
  doctors: { b: -31.92, se: 2.89, p: "< .001" },
  patients: { b: -3.7, se: 1.53, p: "= .02" },
};

/** Recomputed from the authors' released files, quoted in the provenance. */
const RECOMPUTED = {
  doctors: { d: -32.2, se: 2.74 },
  patients: { d: -3.88, se: 1.46 },
};

/**
 * Both bodies are optional in the schema. These accessors THROW rather than
 * defaulting to an empty string, because several checks below are requirements
 * on what the prose must SAY, and a silent "" would fail them loudly while a
 * silent "" behind `?? ""` would pass the prohibitions by having no prose.
 */
const revealBody = (): string => {
  const b = pygmalion.reveal.body?.en;
  if (!b) throw new Error("reveal body is missing, so the checks below prove nothing");
  return b;
};

const lessonBody = (): string => {
  const b = pygmalion.lesson.body?.en;
  if (!b) throw new Error("lesson body is missing, so the checks below prove nothing");
  return b;
};

describe("pygmalion: the numbers reconcile with the source", () => {
  it("draws the four means computed from the authors' trial-level files", () => {
    expect(pairAt(data, "doctors").values.map((v) => v.mean)).toEqual([39.8, 7.6]);
    expect(pairAt(data, "patients").values.map((v) => v.mean)).toEqual([32.77, 28.89]);
  });

  it("reproduces the published coefficients from those means", () => {
    // Sign first: both differences must point the same way the paper's do.
    expect(Math.sign(-differenceOn(data, "doctors"))).toBe(Math.sign(PUBLISHED.doctors.b));
    expect(Math.sign(-differenceOn(data, "patients"))).toBe(Math.sign(PUBLISHED.patients.b));

    // Then size. The residual is the site, colour and trial-number covariates
    // the published models carry and a raw paired mean does not, so the bar is
    // "inside one standard error of the published estimate" rather than equal.
    const doctorGap = Math.abs(-differenceOn(data, "doctors") - PUBLISHED.doctors.b);
    const patientGap = Math.abs(-differenceOn(data, "patients") - PUBLISHED.patients.b);
    expect(doctorGap).toBeLessThan(PUBLISHED.doctors.se);
    expect(patientGap).toBeLessThan(PUBLISHED.patients.se);

    // And the values quoted in the provenance are the ones the data yields.
    expect(-differenceOn(data, "doctors")).toBeCloseTo(RECOMPUTED.doctors.d, 2);
    expect(-differenceOn(data, "patients")).toBeCloseTo(RECOMPUTED.patients.d, 2);
  });

  it("keeps the temperatures the methods section describes", () => {
    const doctors = pairAt(data, "doctors").values.map((v) => v.exposure);
    const patients = pairAt(data, "patients").values.map((v) => v.exposure);
    expect(doctors).toEqual([48, 43]);
    expect(patients).toEqual([48, 48]);
    expect(exposureGapOn(data, "doctors")).toBe(5);
    expect(exposureGapOn(data, "patients")).toBe(0);
  });

  it("makes the patients the matched tier and the doctors the rigged one", () => {
    expect(matchedTiers(data)).toEqual(["patients"]);
    expect(unmatchedTiers(data)).toEqual(["doctors"]);
  });

  /**
   * The setup headline and the commit question both say the doctors' drop is
   * more than eight times the patients'. That is a claim about the authored
   * numbers, so it is checked against them rather than trusted.
   */
  it("earns the 'eight times' the framing claims", () => {
    const ratio = differenceOn(data, "doctors") / differenceOn(data, "patients");
    expect(ratio).toBeGreaterThan(8);
    expect(ratio).toBeLessThan(9);
    expect(pygmalion.setup.headline.en).toMatch(/eight times/);
    expect(pygmalion.setup.question.en).toMatch(/eight times/);
  });

  it("states each tier's drop on the figure as the derived one", () => {
    // 32.2 and 3.9 are printed in the tier notes; they must be the numbers the
    // bars actually produce, to one decimal.
    expect(pairAt(data, "doctors").note?.en).toContain(
      differenceOn(data, "doctors").toFixed(1),
    );
    expect(pairAt(data, "patients").note?.en).toContain(
      differenceOn(data, "patients").toFixed(1),
    );
  });
});

describe("pygmalion: the setup withholds exactly one column", () => {
  it("shows the exposure on the reveal beat and not on the setup beat", () => {
    expect(pygmalion.setup.initialView.kind).toBe("asmeasured");
    expect(pygmalion.reveal.view.kind).toBe("asdelivered");
    expect(showsExposure(pygmalion.setup.initialView.kind)).toBe(false);
    expect(showsExposure(pygmalion.reveal.view.kind)).toBe(true);
  });

  /**
   * The guard the design depends on. A temperature anywhere in the setup gives
   * the answer away, and nothing else in this repository would notice.
   */
  it("never puts a temperature in the setup prose", () => {
    const temperature = /\b(4[0-9]|5[0-9])\s*(degrees|deg|°|C\b)/i;

    // Self-test in both directions before trusting it. A guard that matches
    // nothing passes every string it is ever shown.
    expect("the probe was set to 48 degrees").toMatch(temperature);
    expect("43°C on the treated patch").toMatch(temperature);
    expect("48 °C").toMatch(temperature);
    expect("sixty volunteers rated every burn from 0 to 100").not.toMatch(temperature);

    for (const s of [
      pygmalion.setup.headline.en,
      pygmalion.setup.framing.en,
      pygmalion.setup.question.en,
      pygmalion.setup.initialView.caption?.en ?? "",
      data.label.en,
      data.metricLabel.en,
      ...pygmalion.choices.flatMap((c) => [c.label.en, c.sublabel?.en ?? ""]),
    ])
      expect(s).not.toMatch(temperature);
  });

  /**
   * The mirror of the guard above: the reveal has to actually supply what the
   * setup withheld, or the puzzle never pays out.
   */
  it("supplies both temperatures in the reveal prose", () => {
    const explanation = pygmalion.reveal.explanation.en;
    expect(explanation).toMatch(/48 degrees/);
    expect(explanation).toMatch(/43 degrees/);
    expect(explanation).toMatch(/five degrees/i);
  });

  it("never claims in the setup that the creams were identical", () => {
    // The reader is not told this until the reveal either. Saying it in the
    // setup would collapse the trap into a single obvious answer.
    const identical = /identical|the same (cream|jelly|jar)|both.*petroleum/i;
    expect("both creams were identical").toMatch(identical);
    expect("the same jar of petroleum jelly").toMatch(identical);
    expect(pygmalion.setup.framing.en).not.toMatch(identical);
    expect(pygmalion.reveal.explanation.en).toMatch(identical);
  });
});

describe("pygmalion: the answer bands survive a hedge audit", () => {
  it("has exactly one correct choice and one intuitive trap", () => {
    expect(pygmalion.choices.filter((c) => c.isCorrect)).toHaveLength(1);
    expect(pygmalion.choices.filter((c) => c.isIntuitiveTrap)).toHaveLength(1);
    expect(pygmalion.choices.find((c) => c.isCorrect)?.id).toBe("not-told");
  });

  /**
   * The rule this card was designed against: no two bands may share the
   * direction the setup licenses. The three wrong bands take a
   * pharmacological, a psychological and a statistical direction, and the
   * correct one says the question cannot be answered yet. Checking the ids is
   * the cheapest way to make a later edit that collapses two of them fail here
   * rather than in review.
   */
  it("keeps the four bands pointing in four different directions", () => {
    expect(pygmalion.choices.map((c) => c.id)).toEqual([
      "better-dose", // more drug reached the skin
      "knew-what-they-took", // expectation, in the people who had one
      "too-few", // no difference to explain
      "not-told", // the figure cannot answer it
    ]);
  });

  /**
   * The dangerous band. Expectation really is at work in this experiment, so
   * the reveal owes the player who chose it an explanation rather than a bare
   * "wrong", and that explanation has to appear in the reveal itself.
   */
  it("credits the expectation answer in the reveal instead of just refusing it", () => {
    const explanation = pygmalion.reveal.explanation.en;
    expect(explanation).toMatch(/[Ee]xpectation was in the room/);
    expect(explanation).toMatch(/not what made the doctors' drop eight times bigger/);
  });
});

describe("pygmalion: the card states its limits", () => {
  it("says the effect depended on the order in the counterbalanced study", () => {
    const body = revealBody();
    expect(body).toMatch(/reversed the order/i);
    expect(body).toMatch(/vanished|disappeared/i);
    expect(body).toMatch(/reference experience/i);
  });

  it("says who the participants were rather than implying they were clinicians", () => {
    expect(revealBody()).toMatch(/undergraduates rather than clinicians/i);
  });

  it("carries the objective measures, since the subjective ones alone would not settle it", () => {
    const body = revealBody();
    expect(body).toMatch(/skin conductance/i);
    expect(body).toMatch(/facial action units|faces showed less pain/i);
  });

  /**
   * The overclaim this card is most at risk of. The doctors' 32 points were
   * bought with heat, and a card that let a reader carry that number away as
   * the size of an expectancy effect would be worse than not shipping.
   */
  it("never offers the doctors' drop as the size of the effect", () => {
    const claim = /expectation.{0,60}(32|thirty-two)|(32|thirty-two).{0,40}points of (belief|expectation)/i;
    expect("expectation was worth 32 points").toMatch(claim);
    expect(pygmalion.reveal.explanation.en).not.toMatch(claim);
    expect(pygmalion.lesson.takeaway.en).not.toMatch(claim);
    expect(pygmalion.share.explainer.en).not.toMatch(claim);
  });

  it("names the Rosenthal classroom study and says it does not hold up", () => {
    const body = lessonBody();
    expect(body).toMatch(/Rosenthal/);
    expect(body).toMatch(/does not survive close reading|small, fragile/i);
  });

  it("separates the skill from the three neighbours it sits between", () => {
    const body = lessonBody();
    for (const neighbour of [/Hawthorne/, /nocebo/i, /[Dd]etection bias/]) {
      expect(body).toMatch(neighbour);
    }
  });
});
