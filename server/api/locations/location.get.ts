import { findLocationsByUserId } from "~/lib/db/queries/locations";
import { definedAuthenticatedEventHandler } from "~/utils/defined-authenticated-event-handler";

export default definedAuthenticatedEventHandler(async (event) => {
  // await new Promise(resolve => setTimeout(resolve, 2000));
  const locations = await findLocationsByUserId(event.context.user.id);
  return locations;
});
