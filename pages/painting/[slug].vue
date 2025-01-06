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
                    backgroundImage: `url(${painting.imageUrl})`,
                    paddingTop: '100%',
                }"
                data-tilt
            ></div>
            <div
                class="col-span-10 lg:col-span-5 lg:pl-5 flex flex-col justify-start items-start gap-3"
            >
                <h2 class="text-5xl font-extrabold">
                    {{ painting.title }}
                </h2>
                <div>
                    <span class="block text-2xl font-light mt-3">
                        {{ painting.artist }}
                    </span>
                    <span class="block text-2xl font-light">
                        {{ painting.year }}
                    </span>
                </div>
                <span class="block text-2xl mt-3 font-extralight">
                    {{ painting.description }}
                </span>
            </div>
        </div>
    </section>
</template>
