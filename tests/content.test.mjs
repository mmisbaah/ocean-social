import assert from "node:assert/strict";
import test from "node:test";
import { LESSONS } from "../app/raajje/lessons.js";

const STRANDS = ["culture", "place", "econ", "time", "citizen", "inquiry"];
const PLACES = ["Haa Alif", "Thulhaadhoo", "Malé", "Ari Atoll", "Laamu", "Huvadhoo", "Fuvahmulah", "Addu City"];

test("every grade has ten lessons covering all six strands", () => {
  for (let g = 1; g <= 6; g++) {
    const ls = LESSONS.filter((l) => l.grade === g);
    assert.equal(ls.length, 10, `Grade ${g}`);
    for (const s of STRANDS) assert.ok(ls.some((l) => l.strand === s), `Grade ${g} is missing ${s}`);
  }
});

test("lesson ids and question ids are unique", () => {
  assert.equal(new Set(LESSONS.map((l) => l.id)).size, LESSONS.length);
  const qids = LESSONS.flatMap((l) => l.quiz.map((q) => q.qid));
  assert.equal(new Set(qids).size, qids.length);
});

test("lessons have five pages and well-formed questions", () => {
  for (const l of LESSONS) {
    assert.equal(l.cards.length, 5, l.id);
    assert.ok(l.quiz.length >= 5, l.id);
    for (const q of l.quiz) {
      if (q.t === "mc") { assert.equal(q.a.length, 3, q.qid); assert.equal(new Set(q.a).size, 3, q.qid); }
      else if (q.t === "map") assert.ok(PLACES.includes(q.place), q.qid);
      else if (q.t === "order") assert.ok(q.items.length >= 3, q.qid);
      else if (q.t === "sort") assert.ok(q.items.every(([, b]) => b < q.bins.length), q.qid);
      else assert.fail(`unknown question type in ${q.qid}`);
    }
  }
});
