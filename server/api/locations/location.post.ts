import { customAlphabet } from "nanoid";
import slugify from "slug";

import db from "~/lib/db";
import { findLocationBySlug, insertLocationDB } from "~/lib/db/queries/locations";
import { insertLocation, location } from "~/lib/db/schema";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => insertLocation.safeParse(body));

  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  if (!result.success) {
    const statusMessage = result.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}`).join("; ");
    const data = result.error.issues.reduce((errors, issue) => {
      errors[issue.path.join("")] = issue.message;
      return errors;
    }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  let slug = slugify(result.data.name);
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const id = nanoid();
    slug = `${slug}-${id}`;
    existing = !!(await findLocationBySlug(slug));
  }

  const [created] = await insertLocationDB(result.data, slug, event.context.user.id);

  return created;
});
