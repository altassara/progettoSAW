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
const router = useRouter();

const email = ref("");
const password = ref("");
const name = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

const handleSignUp = async () => {
    if (password.value !== confirmPassword.value) {
        console.error("Passwords do not match");
        password.value = "";
        confirmPassword.value = "";
        return;
    }
    isLoading.value = true;
    try {
        const { error } = await useFetch("/api/auth/signup", {
            method: "POST",
            body: {
                email: email.value,
                password: password.value,
                name: name.value,
            },
        });
        if (error.value) {
            console.error("SIGNUP FAILED", error);
        } else {
            router.push({
                path: "/verify-pending",
                query: { email: email.value },
            });
        }
    } catch (err) {
        console.error("An error occurred during sign-up:", err);
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
        Sign Up
    </h1>
    <form @submit.prevent="handleSignUp" class="space-y-4">
        <UInput
            type="text"
            v-model="name"
            color="white"
            variant="outline"
            placeholder="Name"
            size="lg"
            class="w-full rounded-md"
            required
        />
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
        <UInput
            type="password"
            v-model="confirmPassword"
            color="white"
            variant="outline"
            placeholder="Confirm Password"
            size="lg"
            class="w-full rounded-md"
            required
        />
        <button
            type="submit"
            class="w-full bg-navy-blue-950 text-white font-medium py-2 rounded-md hover:bg-navy-blue-900 transition"
        >
            Sign up
        </button>
        <NuxtLink to="/login">
            <button
                class="w-full bg-white text-navy-blue-950 font-medium py-2 mt-4 rounded-md hover:bg-gray-300 transition border border-navy-blue-950"
            >
                Go back to Login
            </button>
        </NuxtLink>
    </form>
    <div
        v-if="isLoading"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
    >
        <div
            class="w-16 h-16 border-8 border-gray-300 border-t-blue-950 rounded-full animate-spin"
        ></div>
    </div>
</template>
