<script setup>
const query = ref({
    title: "",
    artist: "",
    yearFrom: "",
    yearTo: "",
    category: "",
    maxPaintings: 10,
});

const paintings = ref([]);

const categories = [
    { label: "Renaissance", value: "renaissance" },
    { label: "Baroque", value: "baroque" },
    { label: "Romanticism", value: "romanticism" },
    { label: "Impressionism", value: "impressionism" },
    { label: "Post-Impressionism", value: "post-impressionism" },
    { label: "Cubism", value: "cubism" },
    { label: "Surrealism", value: "surrealism" },
    { label: "Abstract Expressionism", value: "abstract-expressionism" },
    { label: "Contemporary", value: "contemporary" },
    { label: "Expressionism", value: "Expressionism" },
    { label: "Pop Art", value: "pop-art" },
    { label: "Art Nouveau", value: "art-nouveau" },
    { label: "Realism", value: "realism" },
    { label: "Fauvism", value: "fauvism" },
    { label: "Dadaism", value: "dadaism" },
    { label: "Bauhaus", value: "bauhaus" },
    { label: "Art Deco", value: "art-deco" },
    { label: "Minimalism", value: "minimalism" },
];

const handleSearch = async () => {
    const data = await $fetch("/api/protected/painting/search", {
        method: "GET",
        params: {
            title: query.value.title,
            artist: query.value.artist,
            yearFrom: query.value.yearFrom,
            yearTo: query.value.yearTo,
            category: query.value.category,
            maxPainting: query.value.maxPaintings,
        },
    });
    paintings.value = data;
};

const { data } = await useFetch("/api/protected/painting/search", {
    method: "GET",
    params: {
        title: query.value.title,
        artist: query.value.artist,
        yearFrom: query.value.yearFrom,
        yearTo: query.value.yearTo,
        category: query.value.category,
        maxPainting: query.value.maxPaintings,
    },
});
paintings.value = data.value;
</script>
<template>
    <div class="mt-24 w-4/5 mx-auto p-0 rounded-xl grid grid-cols-4 gap-4 mb-8">
        <h1 class="font-extrabold text-3xl block col-span-4">Search:</h1>
        <div
            class="bg-white w-full p-5 rounded-xl grid grid-cols-3 gap-8 col-span-4 items-center"
        >
            <UInput
                class="lg:col-span-1 col-span-3 h-full"
                v-model="query.title"
                label="Title"
                placeholder="Title"
                variant="outline"
                size="lg"
                type="text"
            />
            <UInput
                class="lg:col-span-1 col-span-3 h-full"
                v-model="query.artist"
                label="Artist"
                placeholder="Artist"
                variant="outline"
                size="lg"
                type="text"
            />
            <div class="lg:col-span-1 col-span-3 flex items-center">
                <button
                    type="submit"
                    class="w-full bg-navy-blue-950 text-white font-medium py-2 rounded-md hover:bg-navy-blue-900 transition"
                    @click="handleSearch"
                >
                    Conferma
                </button>
            </div>
        </div>
        <h3 class="font-extrabold text-xl block col-span-4">Filters:</h3>
        <div
            class="bg-white w-full p-5 rounded-xl grid grid-cols-4 gap-12 col-span-4 items-center"
        >
            <div class="lg:col-span-2 col-span-4 grid grid-cols-3 gap-4">
                <UInput
                    class="lg:col-span-1 col-span-3 h-full"
                    v-model="query.yearFrom"
                    label="Year From"
                    placeholder="Year From"
                    variant="outline"
                    size="sm"
                    type="number"
                />
                <!-- Year To -->
                <UInput
                    class="lg:col-span-1 col-span-3 h-full"
                    v-model="query.yearTo"
                    label="Year To"
                    placeholder="Year To"
                    variant="outline"
                    size="sm"
                    type="number"
                />
                <!-- Category Multi-Select -->
                <USelect
                    class="lg:col-span-1 col-span-3 h-full rounded-xl"
                    v-model="query.category"
                    label="Category"
                    placeholder="Select Categories"
                    :options="categories"
                    variant="outline"
                    size="sm"
                />
            </div>
            <!-- Go Button -->
            <div
                class="lg:col-span-1 col-span-4 lg:col-end-5 flex items-center"
            >
                <button
                    type="submit"
                    class="w-full bg-navy-blue-950 text-white text-xs font-medium py-2 rounded-md hover:bg-navy-blue-900 transition"
                    @click="handleSearch"
                >
                    Go
                </button>
            </div>
        </div>
        <PaintingCard
            v-for="(painting, index) in paintings"
            :key="index"
            :painting="painting"
        />
    </div>
</template>
