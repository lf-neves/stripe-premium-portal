import { setupTestData } from "./setupTestData";

export { faker } from "@faker-js/faker";
export { default as request } from "supertest";

type TestData = Awaited<ReturnType<typeof setupTestData>>;
export { setupTestData, type TestData };
