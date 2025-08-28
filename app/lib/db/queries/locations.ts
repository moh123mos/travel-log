import { eq } from "drizzle-orm";

import db from "..";
import { location } from "../schema";

export async function findLocationBySlug(slug: string) {
  return !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));
}
