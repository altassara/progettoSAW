<script setup>
const painting = ref(null);
const error = ref("");
const route = useRoute();

try {
    const { data } = await useFetch(`/api/protected/painting`, {
        method: "GET",
        params: {
            slug: route.params.slug,
        },
    });
    painting.value = data.value;
} catch (err) {
    console.error("An error occurred during fetching user data:", err);
    error.value = err.message;
}

const getRatingColor = computed(() => {
    if (!painting.value?.rating) return "rgb(255, 0, 0)"; // Default: Rosso se rating non è definito

    const rating = painting.value.rating;
    const maxColorValue = 200;
    const red = Math.round(maxColorValue - (rating / 10) * maxColorValue); // Più alto il rating, meno rosso
    const green = Math.round((rating / 10) * maxColorValue); // Più alto il rating, più verde
    return `rgb(${red}, ${green}, 0)`; // Colore dinamico
});
</script>

<template>
    <section
        class="bg-gray-200 bg-cover bg-center flex flex-col justify-center items-start min-h-screen"
    >
        <div
            class="w-4/5 mx-auto min-h-96 grid grid-cols-10 p-5 mt-24 2xl:mt-0"
        >
            <!-- due div di larghezza 5colonne ognuno -->
            <div
                class="col-span-10 lg:col-span-5 bg-cover bg-center aspect-square rounded-xl"
                :style="{
                    backgroundImage: `url(${painting?.imageUrl})`,
                    paddingTop: '100%',
                }"
                data-tilt
            ></div>
            <div
                class="col-span-10 lg:col-span-5 lg:pl-5 flex flex-col justify-start items-start gap-1"
            >
                <h2 class="text-5xl font-extrabold">
                    {{ painting.title ?? "" }}
                </h2>
                <div>
                    <span class="block text-2xl font-light mt-3">
                        {{ painting.artist ?? "" }}
                    </span>
                    <span class="block text-2xl font-light">
                        {{ painting.year ?? "" }}
                    </span>
                </div>
                <span class="block text-xl font-extralight">
                    {{ painting.description ?? "" }}
                </span>
                <span class="block text-2xl font-bold">
                    <span class="font-light text-xl">Average grade: </span>
                    <span :style="{ color: getRatingColor }">
                        {{ painting.rating }}</span
                    >
                </span>
            </div>
        </div>
    </section>
</template>
