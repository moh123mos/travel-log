import { eq } from "drizzle-orm";

import type { InsertLocation } from "../schema";

import db from "..";
import { location } from "../schema";

export async function findLocationsByUserId(userId: number) {
  return await db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}

export async function findLocationBySlug(slug: string) {
  return !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));
}

export async function insertLocationDB(data: InsertLocation, slug: string, userId: number) {
  return await db.insert(location).values({
    ...data,
    slug,
    userId,
  }).returning();
}
