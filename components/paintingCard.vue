<script setup>
defineProps({
    painting: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div
        class="bg-navy-blue-200 lg:col-span-1 col-span-4 md:col-span-2 relative w-full pt-[100%] overflow-hidden rounded-xl"
        :style="{
            backgroundImage: 'url(' + painting.imageUrl + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }"
    >
        <NuxtLink :to="`/painting/${painting.slug}`">
            <div class="absolute inset-0 flex justify-center items-end">
                <div
                    class="bg-gray-200 w-full m-4 p-2 rounded-xl bg-opacity-90"
                >
                    <h3 class="text-lg font-bold">{{ painting.title }}</h3>
                    <p class="text-sm font-extralight">
                        {{ painting.artist }}, {{ painting.year }}
                    </p>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>
