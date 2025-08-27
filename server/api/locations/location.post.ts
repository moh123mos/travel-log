import db from "~/lib/db";
import { insertLocation, location } from "~/lib/db/schema";

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

  const [created] = await db.insert(location).values({
    ...result.data,
    slug: result.data.name.toLocaleLowerCase().replaceAll(" ", "-").trim(),
    userId: event.context.user.id,
  }).returning();

  return created;
});
