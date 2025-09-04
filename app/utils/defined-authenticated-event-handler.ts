import type { H3Event, H3EventContext } from "h3";

import type { UserWithId } from "~/lib/auth";

type AuthenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: UserWithId;
  };
};
export function definedAuthenticatedEventHandler<T>(handler: (event: AuthenticatedEvent) => T) {
  return async (event: H3Event) => {
    if (!event.context.user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      }));
    }

    return handler(event as AuthenticatedEvent);
  };
}
