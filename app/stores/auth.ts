import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export const useAuthStore = defineStore("authStore", () => {
  const loading = ref(false);
  async function signIn() {
    loading.value = true;
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
    loading.value = false;
    console.warn(data);
  }

  return {
    loading,
    signIn,
  };
});
