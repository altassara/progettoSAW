<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "#imports";

const { data, signOut } = useAuth();

// Simula il caricamento per evitare glitch visivi
const isLoggedIn = ref(false);

if (data) {
    isLoggedIn.value = !!data.value?.user;
}
</script>

<template>
    <div class="my-3 flex justify-center items-center h-20 rounded-2xl py-6 w-4/5 fixed top-0 left-[10%] bg-navy-blue-900 z-10">
        <div class="text-white flex space-x-4">
            <nuxt-link
                to="/"
                class="py-2 px-4 hover:bg-navy-blue-700 rounded transition"
                >Home</nuxt-link
            >
            <nuxt-link
                to="/"
                class="py-2 px-4 hover:bg-navy-blue-700 rounded transition"
                >About</nuxt-link
            >
            <nuxt-link
                to="/"
                class="py-2 px-4 hover:bg-navy-blue-700 rounded transition"
                >Services</nuxt-link
            >
            <nuxt-link
                to="/"
                class="py-2 px-4 hover:bg-navy-blue-700 rounded transition"
                >Portfolio</nuxt-link
            >
            <nuxt-link
                to="/"
                class="py-2 px-4 hover:bg-navy-blue-700 rounded transition"
                >Shop</nuxt-link
            >
            <nuxt-link
                to="/"
                class="py-2 px-4 hover:bg-navy-blue-700 rounded transition"
                >Contact</nuxt-link
            >
            <!-- Se non loggato, mostra il pulsante Login -->
            <nuxt-link
                v-if="!isLoggedIn"
                to="/login"
                class="py-2 px-4 bg-white text-navy-blue-900 rounded hover:bg-gray-300 transition"
                >Login</nuxt-link
            >
            <!-- Se loggato, mostra il nome utente e il pulsante Logout -->
            <div v-else class="flex space-x-2 items-center">
                <span class="py-2 px-4 bg-navy-blue-700 rounded text-sm">
                    {{ data?.user?.name || "User" }}
                </span>
                <button
                @click="() => signOut({ callbackUrl: '/login' })"
                    class="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Sign Out
                </button>
            </div>
        </div>
    </div>
</template>