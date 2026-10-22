import { test, expect } from "bun:test";
import { PROJECTS } from "./projects";

test("preserves the portfolio project order with Malloc immediately before Documents", () => {
  expect(PROJECTS.map(project => project.id)).toEqual(["wtc", "gully-gangs", "boogie-games", "signed-away", "russ", "malloc", "documents"]);
});

test("preserves every supplied screenshot and trailer", () => {
  expect(PROJECTS.map(project => project.shots.length)).toEqual([7, 5, 2, 5, 4, 3, 3]);
  expect(PROJECTS.filter(project => project.shots.some(shot => shot.p === "video")).map(project => project.id)).toEqual(["wtc", "gully-gangs", "signed-away"]);
});

test("preserves whole-cover presentation", () => {
  expect(PROJECTS.find(project => project.id === "gully-gangs")?.shots[0]).toMatchObject({ p: "img", fit: "contain" });
  expect(PROJECTS.find(project => project.id === "russ")?.shots[0]).toMatchObject({ p: "img", fit: "contain" });
  expect(PROJECTS.find(project => project.id === "boogie-games")?.shots[1]).toMatchObject({ p: "img", fit: "contain" });
});