<script setup>
import { ref, computed } from "vue";

const { data: authData, getSession } = useAuth();
const sessionData = toRef(authData, "user");

const userData = ref(sessionData.value.user);
const error = ref("");
const successMessage = ref(null);
const loading = ref(false);
const isModalOpen = ref(false);
const imageSrc = ref(""); // Sorgente immagine caricata

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageSrc.value = URL.createObjectURL(file);
        closeModal();
    }
};

const deleteImage = () => {
    imageSrc.value = "";
    closeModal();
};

// Computed property per formattare la data
const formattedDateOfBirth = computed({
    get() {
        return userData.value.dateOfBirth
            ? new Date(userData.value.dateOfBirth).toISOString().split("T")[0]
            : "";
    },
    set(value) {
        userData.value.dateOfBirth = new Date(value).toISOString();
    },
});

try {
    const { data } = await useFetch(`/api/protected/user`, {
        method: "GET",
        params: {
            email: userData.value.email,
        },
    });
    userData.value = data.value;
} catch (err) {
    console.error("An error occurred during fetching user data:", err);
    error.value = err.message;
}

const handleUpdateUser = async () => {
    try {
        loading.value = true;
        await $fetch(`/api/protected/user`, {
            method: "PUT",
            body: { userUpdated: userData.value },
        });
        successMessage.value = "User updated successfully!";
        error.value = null;
        loading.value = false;
        setTimeout(() => {
            successMessage.value = null;
        }, 2500);
    } catch (err) {
        console.error("An error occurred during updating user data:", err);
        error.value = err.message;
        successMessage.value = null;
        loading.value = false;
        setTimeout(() => {
            error.value = null;
        }, 2500);
    }
    getSession();
};
</script>

<template>
    <div
        class="bg-white mt-24 w-4/5 mx-auto p-6 rounded-xl grid grid-cols-10 gap-4"
    >
        <!-- Colonna della foto profilo -->
        <div
            class="border-2 border-gray-300 rounded-xl col-span-10 lg:col-span-3 flex justify-center items-center w-full aspect-w-1 aspect-h-1"
        >
            <img
                :src="imageSrc || ''"
                alt="Profile"
                class="max-w-full max-h-full cursor-pointer"
                @click="openModal"
            />
        </div>

        <div class="col-span-10 lg:col-span-7">
            <transition
                name="fade"
                enter-active-class="transition-opacity duration-500"
                leave-active-class="transition-opacity duration-500"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <UAlert
                    v-if="successMessage"
                    class="bg-green-100 text-green-700 p-2 rounded mb-4"
                    icon="i-heroicons-command-line"
                    variant="soft"
                    title="Updated!"
                    :description="successMessage"
                />
            </transition>

            <transition
                name="fade"
                enter-active-class="transition-opacity duration-500"
                leave-active-class="transition-opacity duration-500"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="error"
                    class="bg-red-100 text-red-700 p-2 rounded mb-4"
                >
                    {{ error }}
                </div>
            </transition>

            <!-- Email -->
            <div class="mb-4">
                <p class="font-extrabold text-2xl xl:text-4xl">
                    {{ userData.email }}
                </p>
            </div>

            <form
                class="grid grid-cols-2 gap-4"
                @submit.prevent="handleUpdateUser"
            >
                <!-- Campo Nome -->
                <div class="col-span-1">
                    <label
                        for="name"
                        class="block text-xs font-extralight text-gray-700"
                        >Name</label
                    >
                    <UInput
                        type="text"
                        v-model="userData.name"
                        color="white"
                        variant="outline"
                        placeholder="name"
                        size="lg"
                        class="w-full rounded-md"
                        required
                    />
                </div>

                <!-- Campo Cognome -->
                <div class="col-span-1">
                    <label
                        for="surname"
                        class="block text-xs font-extralight text-gray-700"
                        >Surname</label
                    >
                    <UInput
                        type="text"
                        v-model="userData.surname"
                        color="white"
                        variant="outline"
                        placeholder="surname"
                        size="lg"
                        class="w-full rounded-md"
                    />
                </div>

                <!-- Campo Data di nascita -->
                <div class="col-span-1">
                    <label
                        for="dateOfBirth"
                        class="block text-xs font-extralight text-gray-700"
                        >Date of birth</label
                    >
                    <UInput
                        type="date"
                        v-model="formattedDateOfBirth"
                        color="white"
                        variant="outline"
                        placeholder="Date of Birth"
                        size="lg"
                        class="w-full rounded-md"
                    />
                </div>

                <!-- Campo Password -->
                <div class="col-span-1">
                    <label
                        for="password"
                        class="block text-xs font-extralight text-gray-700"
                        >Password</label
                    >
                    <UInput
                        type="password"
                        v-model="userData.password"
                        color="white"
                        variant="outline"
                        placeholder="Password"
                        size="lg"
                        class="w-full rounded-md"
                        disabled
                    />
                </div>

                <!-- Bottone di salvataggio -->
                <div class="col-span-1">
                    <button
                        type="submit"
                        class="w-full bg-navy-blue-950 text-white font-medium py-2 rounded-md hover:bg-navy-blue-900 transition"
                    >
                        Conferma
                    </button>
                </div>

                <!-- Bottone di reset -->
                <div class="col-span-1">
                    <button
                        class="w-full bg-white text-red-900 font-medium py-2 rounded-md hover:bg-gray-300 transition border border-red-900"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    </div>
    <!-- Modal -->
    <transition
        name="fade"
        enter-active-class="transition-opacity duration-500"
        leave-active-class="transition-opacity duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-if="isModalOpen"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div class="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                <h2 class="text-xl font-bold mb-4">Gestisci Immagine</h2>
                <div class="flex gap-4 items-center mb-4">
                    <!-- Contenitore immagine -->
                    <div
                        class="border-2 border-gray-300 rounded-xl w-40 h-40 flex justify-center items-center"
                    >
                        <img
                            :src="imageSrc || ''"
                            alt="Profile"
                            class="max-w-full max-h-full cursor-pointer"
                        />
                    </div>

                    <!-- Bottoni Carica ed Elimina immagine affiancati -->
                    <div class="flex flex-col gap-2 w-auto flex-grow">
                        <!-- Bottone per caricare immagine -->
                        <label
                            class="w-full bg-navy-blue-950 text-white font-medium py-2 rounded-md hover:bg-navy-blue-900 transition text-center"
                        >
                            Carica Immagine
                            <input
                                type="file"
                                accept="image/*"
                                class="hidden"
                                @change="uploadImage"
                            />
                        </label>

                        <!-- Bottone per eliminare immagine -->
                        <button
                            @click="deleteImage"
                            class="w-full bg-white text-red-900 font-medium py-2 rounded-md hover:bg-gray-300 transition border border-red-900"
                        >
                            Elimina Immagine
                        </button>
                    </div>
                </div>
                <button
                    @click="closeModal"
                    class="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    Chiudi
                </button>
            </div>
        </div>
    </transition>
</template>
