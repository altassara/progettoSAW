<script setup>
defineProps({
    review: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div
        class="w-full bg-white shadow-md rounded-2xl p-4 flex flex-col gap-4 mt-4"
    >
        <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
                <img
                    src="/profilePictureStock.jpg"
                    alt="Foto utente"
                    class="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p class="text-lg font-semibold text-gray-800">
                        {{ review.user.email }}
                    </p>
                    <p class="text-sm text-gray-500">{{ review.updatedAt }}</p>
                </div>
            </div>
            <!-- <div class="flex items-center justify-center gap-1"> -->
            <!--     <span class="text-sm font-extralight">1.2k</span> -->
            <!--     <IconsHeart class="w-7 h-7 text-yellow-400" /> -->
            <!-- </div> -->
        </div>

        <div class="flex justify-between items-center">
            <h3 class="text-xl font-medium text-gray-800">
                {{ review.description }}
            </h3>
            <div class="text-green-800 text-lg font-semibold">
                <span>{{ review.rating }}/10</span>
            </div>
        </div>
    </div>
</template>
