import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("authStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("Csrf-Token", csrf);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("Csrf-Token", csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    navigateTo("/");
  }

  return {
    init,
    loading,
    signIn,
    user,
    signOut,
  };
});
