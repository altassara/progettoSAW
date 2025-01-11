<script setup lang="ts">
import { useAuth } from "#imports";

const {
    data,
    status,
    lastRefreshedAt,
    getCsrfToken,
    getProviders,
    signIn,
    signOut,
    getSession,
} = useAuth();

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/",
    },
    layout: "login",
});

const providers = await getProviders();
const csrfToken = await getCsrfToken();

const email = ref("");
const password = ref("");
const error = ref(false);

// TEMP: Due to a bug in Nuxt `$fetch` (and thus in `useFetch`),
// we need to transform `undefined` returned from `$fetch` to `null`.
// The issue seems to be in type coalescing happening under the hood of `$fetch`:
// `null` and `''` are both transformed into `undefined` which is not correct.
/*const { data: token } = await useAsyncData(
  '/api/token',
  async () => {
    const headers = useRequestHeaders(['cookie'])
    const result = await $fetch('/api/token', { headers })
    return result ?? null
  }
)*/

const handleSignIn = async () => {
    try {
        const response = await signIn("credentials", {
            callbackUrl: "/",
            email: email.value,
            password: password.value,
            redirect: true,
        });

        if (response?.error) {
            console.error("Login failed:", response.error);
            error.value = true;
        }
    } catch (err) {
        console.error("An error occurred during sign-in:", err);
    }
};
</script>

<template>
    <h1 class="text-4xl font-sans font-black mb-6 text-center text-gray-800">
        SAW
    </h1>
    <h1
        class="text-2xl font-sans font-extrabold mb-6 text-center text-gray-800"
    >
        Log in or Sign Up
    </h1>
    <span
        v-if="error"
        class="flex items-center text-center mt-4 text-gray-600 font-extralight text-xs"
    >
        check your credentials
    </span>
    <form @submit.prevent="handleSignIn" class="space-y-4">
        <UInput
            type="text"
            v-model="email"
            color="white"
            variant="outline"
            placeholder="Email"
            size="lg"
            class="w-full rounded-md"
            required
        />
        <UInput
            type="password"
            v-model="password"
            color="white"
            variant="outline"
            placeholder="Password"
            size="lg"
            class="w-full rounded-md"
            required
        />
        <button
            type="submit"
            class="w-full bg-navy-blue-950 text-white font-medium py-2 rounded-md hover:bg-navy-blue-900 transition"
        >
            Login
        </button>
        <NuxtLink to="/signup">
            <button
                class="mt-4 w-full bg-white text-navy-blue-950 font-medium py-2 rounded-md hover:bg-gray-300 transition border border-navy-blue-950"
            >
                Sign Up
            </button>
        </NuxtLink>
    </form>

    <span
        class="flex items-center text-center mt-4 text-gray-600 font-extralight"
    >
        <span class="flex-grow h-px bg-gray-300"></span>
        <span class="px-4">or</span>
        <span class="flex-grow h-px bg-gray-300"></span>
    </span>

    <div class="mt-4 text-center">
        <button
            @click="signIn('github', { callbackUrl: '/' })"
            class="w-full bg-gray-700 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition"
        >
            Login with GitHub
            <img
                src="/github-mark-white.svg"
                alt="GitHub logo"
                class="w-5 h-5 inline-block ml-1 mb-1"
            />
        </button>
    </div>
</template>
