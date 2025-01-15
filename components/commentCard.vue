<script setup>
defineProps({
    review: {
        type: Object,
        required: true,
    },
});

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};
</script>

<template>
    <div
        class="w-full bg-white shadow-md rounded-2xl p-4 flex flex-col gap-4 mt-4"
    >
        <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
                <img
                    :src="review.user.image || '/profilePictureStock.jpg'"
                    alt="Foto utente"
                    class="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p class="text-lg font-semibold text-gray-800">
                        {{ review.user.email }}
                    </p>
                    <p class="text-sm text-gray-500">
                        {{ formatDate(review.updatedAt) }}
                    </p>
                </div>
            </div>
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
