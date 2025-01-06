<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "#imports";

const { data, signOut } = useAuth();

// Simula il caricamento per evitare glitch visivi
const isLoggedIn = ref(false);
const isMenuOpen = ref(false); // Stato del menu

if (data) {
    isLoggedIn.value = !!data.value?.user;
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
    <div
        class="my-3 flex flex-col items-center w-4/5 fixed top-0 left-[10%] bg-gray-100 rounded-xl z-10 transition-all"
    >
        <!-- Navbar principale -->
        <div
            class="flex justify-between items-center h-16 w-full px-6 text-navy-blue-950"
        >
            <!-- Logo/Scritta -->
            <nuxt-link to="/" class="text-3xl font-black">SAW</nuxt-link>

            <!-- Login / User Info -->
            <div class="flex items-center space-x-4">
                <nuxt-link
                    v-if="!isLoggedIn"
                    to="/login"
                    class="py-1 px-2 font-bold text-navy-blue-950 rounded hover:bg-gray-200 transition"
                >
                    Login
                </nuxt-link>
                <div v-else class="flex items-center space-x-1">
                    <nuxt-link
                        to="/profile"
                        class="flex items-center py-1 px-2 font-bold rounded text-sm hover:bg-gray-200"
                    >
                        <span class="hidden lg:block">
                            {{ data?.user?.email || "User" }}
                        </span>
                        <IconsUser
                            class="ml-1 w-4 h-4 inline-block font-bold text-navy-blue-950"
                        />
                    </nuxt-link>
                    <button
                        @click="() => signOut({ callbackUrl: '/login' })"
                        class="py-1 px-2 rounded hover:bg-gray-200 transition"
                    >
                        <IconsSignout
                            class="w-4 h-4 inline-block font-bold text-red-900"
                        />
                    </button>
                </div>

                <!-- Hamburger Icon -->
                <button @click="toggleMenu" class="block focus:outline-none">
                    <svg
                        v-if="!isMenuOpen"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Dropdown Menu -->
        <div
            class="overflow-hidden transition-[max-height] duration-500 ease-in w-full rounded-b-2xl"
            :class="{ 'max-h-0': !isMenuOpen, 'max-h-96': isMenuOpen }"
        >
            <div
                class="flex lg:flex-row flex-col lg:space-x-4 lg:items-center items-start py-4 ml-4 bg-gray-100 text-navy-blue-950"
            >
                <nuxt-link
                    to="/"
                    class="py-1 px-2 hover:bg-gray-200 rounded transition"
                    >Home</nuxt-link
                >
                <nuxt-link
                    to="/"
                    class="py-1 px-2 hover:bg-gray-200 rounded transition"
                    >About</nuxt-link
                >
                <nuxt-link
                    to="/"
                    class="py-1 px-2 hover:bg-gray-200 rounded transition"
                    >Services</nuxt-link
                >
                <nuxt-link
                    to="/"
                    class="py-1 px-2 hover:bg-gray-200 rounded transition"
                    >Portfolio</nuxt-link
                >
            </div>
        </div>
    </div>
</template>
