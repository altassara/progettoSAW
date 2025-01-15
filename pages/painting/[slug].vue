<script setup>
const painting = ref(null);
const error = ref("");
const route = useRoute();
const isModalOpen = ref(false);
const rating = ref(0);
const review = ref("");

const averageVote = ref(0);

const reviewData = ref([]);

const { data: authData } = useAuth();
const sessionData = toRef(authData, "user");

const userData = ref(sessionData.value.user);

try {
    const { data } = await useFetch(`/api/protected/painting`, {
        method: "GET",
        params: {
            slug: route.params.slug,
        },
    });
    painting.value = data.value;

    const { data: data2 } = await useFetch(`/api/protected/review/searchAll`, {
        method: "GET",
        params: {
            paintingId: painting.value._id,
        },
    });
    reviewData.value = data2.value;

    if (reviewData.value.length > 0) {
        averageVote.value =
            reviewData.value.reduce((acc, review) => acc + review.rating, 0) /
            reviewData.value.length;
    } else {
        averageVote.value = 0;
    }
} catch (err) {
    console.error("An error occurred during fetching user data:", err);
    error.value = err.message;
}

const getRatingColor = computed(() => {
    if (!averageVote.value) return "rgb(255, 0, 0)";

    const rating = averageVote.value;
    const maxColorValue = 200;
    const red = Math.round(maxColorValue - (rating / 10) * maxColorValue); // Più alto il rating, meno rosso
    const green = Math.round((rating / 10) * maxColorValue); // Più alto il rating, più verde
    return `rgb(${red}, ${green}, 0)`;
});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const submitReview = async () => {
    try {
        await $fetch(`/api/protected/review`, {
            method: "POST",
            body: {
                painting: painting.value.title,
                user: userData.value.email,
                rating: rating.value,
                description: review.value,
            },
        });

        const data = await $fetch(`/api/protected/review/searchAll`, {
            method: "GET",
            params: {
                paintingId: painting.value._id,
            },
        });
        reviewData.value = data;

        averageVote.value =
            reviewData.value.reduce((acc, review) => acc + review.rating, 0) /
            reviewData.value.length;

        closeModal();
    } catch (err) {
        console.error("An error occurred during submitting review:", err);
    }
};

onMounted(() => {
    VanillaTilt.init(document.querySelector("[data-tilt]"), {
        max: 10, //default 25
        speed: 400,
    });
});
</script>

<template>
    <section
        class="bg-gray-200 bg-cover bg-center flex flex-col justify-center items-start min-h-screen"
    >
        <div
            class="w-4/5 mx-auto min-h-96 grid grid-cols-10 p-5 mt-24 2xl:mt-0"
        >
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
                    <span class="block text-2xl font-normal mt-3">
                        {{ painting.artist ?? "" }}
                    </span>
                    <span class="block text-2xl font-normal">
                        {{ painting.year ?? "" }}
                    </span>
                </div>
                <span class="block text-xl font-normal">
                    {{ painting.category ?? "" }}
                </span>
                <span class="block text-xl font-extralight">
                    {{ painting.description ?? "" }}
                </span>
                <span class="block text-2xl font-bold">
                    <span class="font-light text-xl">Average grade: </span>
                    <span :style="{ color: getRatingColor }">
                        {{ averageVote }}</span
                    >
                </span>
                <div
                    class="w-full bg-white mt-4 flex justify-center items-center py-5 rounded-xl border-2 border-navy-blue-900 hover:bg-gray-300"
                    @click="openModal"
                >
                    <IconsPlus class="text-navy-blue-900 w-12 h-12" />
                </div>
                <CommentCard
                    v-for="(review, index) in reviewData"
                    :key="index"
                    :review="review"
                />
            </div>
        </div>
    </section>
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
            <div class="bg-white rounded-xl w-4/5 p-8 max-w-lg" @click.stop>
                <h2 class="text-2xl font-bold mb-4">Leave a Review</h2>

                <form @submit.prevent="submitReview">
                    <!-- Rating input -->
                    <div class="mb-4">
                        <label
                            for="rating"
                            class="block text-xl font-medium mb-2"
                        >
                            Your Rating
                        </label>
                        <UInput
                            v-model="rating"
                            type="number"
                            id="rating"
                            name="rating"
                            min="1"
                            max="10"
                            class="w-full rounded-lg"
                            placeholder="Rate from 1 to 10"
                            size="xl"
                            required
                        />
                    </div>

                    <!-- Review textarea -->
                    <div class="mb-6">
                        <label
                            for="review"
                            class="block text-xl font-medium mb-2"
                        >
                            Your Review
                        </label>
                        <textarea
                            v-model="review"
                            id="review"
                            name="review"
                            rows="4"
                            class="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Write your review here"
                            required
                        ></textarea>
                    </div>

                    <!-- Bottom buttons -->
                    <div class="flex justify-end gap-4">
                        <button
                            type="button"
                            class="w-full bg-white text-red-900 text-xs font-medium py-2 rounded-md hover:bg-gray-300 transition border border-red-900"
                            @click="closeModal"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            class="w-full bg-navy-blue-950 text-white text-xs font-medium py-2 rounded-md hover:bg-navy-blue-900 transition"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>
