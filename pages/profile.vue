<script setup>
const { data } = useAuth();

const email = ref(data?.user?.email);
const name = ref(data?.user?.name);
const surname = ref(data?.user?.surname);
const dateOfBirth = ref(data?.user?.dateOfBirth);
const password = ref("");
</script>

<template>
    <div
        class="bg-white mt-24 w-4/5 mx-auto p-6 rounded-lg grid grid-cols-10 gap-4"
    >
        <!-- Colonna della foto profilo -->
        <div class="col-span-3 flex justify-center items-center">
            <img
                src=""
                alt="Profile"
                class="border-2 border-gray-300 w-full h-full rounded-lg"
            />
        </div>

        <!-- Colonne per i dettagli dell'utente -->
        <div class="col-span-7">
            <!-- Email -->
            <div class="mb-4">
                <p class="font-extrabold text-2xl xl:text-4xl">
                    {{ data?.user?.email }}
                </p>
            </div>

            <!-- Form per i dati dell'utente -->
            <form class="grid grid-cols-2 gap-4">
                <!-- Campo Nome -->
                <div class="col-span-1">
                    <label
                        for="name"
                        class="block text-xs font-extralight text-gray-700"
                        >Name</label
                    >
                    <UInput
                        type="text"
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
                        for="name"
                        class="block text-xs font-extralight text-gray-700"
                        >Surname</label
                    >
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        placeholder="surname"
                        size="lg"
                        class="w-full rounded-md"
                        required
                    />
                </div>

                <!-- Campo Telefono -->
                <div class="col-span-1">
                    <label
                        for="name"
                        class="block text-xs font-extralight text-gray-700"
                        >Date of birth</label
                    >
                    <UInput
                        type="date"
                        color="white"
                        variant="outline"
                        placeholder="Password"
                        size="lg"
                        class="w-full rounded-md"
                        required
                    />
                </div>

                <div class="col-span-1">
                    <label
                        for="name"
                        class="block text-xs font-extralight text-gray-700"
                        >Password</label
                    >
                    <UInput
                        type="password"
                        color="white"
                        variant="outline"
                        placeholder="Password"
                        size="lg"
                        class="w-full rounded-md"
                        required
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
</template>
