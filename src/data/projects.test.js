import { test, expect } from "bun:test";
import { PROJECTS, AWARDS } from "./projects";

test("preserves the portfolio project order without the Documents section", () => {
  expect(PROJECTS.map(project => project.id)).toEqual(["wtc", "gully-gangs", "boogie-games", "signed-away", "russ", "malloc"]);
});

test("preserves every supplied screenshot and trailer", () => {
  expect(PROJECTS.map(project => project.shots.length)).toEqual([7, 5, 2, 5, 4, 3]);
  expect(PROJECTS.filter(project => project.shots.some(shot => shot.p === "video")).map(project => project.id)).toEqual(["wtc", "gully-gangs", "signed-away"]);
});

test("every project shows a What I did section (mock content until real details arrive)", () => {
  expect(PROJECTS.map(project => project.did?.length ?? 0)).toEqual([2, 2, 2, 2, 2, 2]);
  expect(PROJECTS.every(project => (project.did ?? []).every(item => item.shot < project.shots.length))).toBe(true);
});

test("preserves whole-cover presentation", () => {
  expect(PROJECTS.find(project => project.id === "gully-gangs")?.shots[0]).toMatchObject({ p: "img", fit: "contain" });
  expect(PROJECTS.find(project => project.id === "russ")?.shots[0]).toMatchObject({ p: "img", fit: "contain" });
  expect(PROJECTS.find(project => project.id === "boogie-games")?.shots[1]).toMatchObject({ p: "img", fit: "contain" });
});

test("keeps the two award results the user stated for What The Creature!", () => {
  expect(AWARDS).toEqual([
    { ceremony: "Gem Awards", category: "Best Student Game", result: "Winner", game: "What The Creature!", won: true },
    { ceremony: "FICCI BAF Awards", category: "", result: "Runner-up", game: "What The Creature!", won: false },
  ]);
});