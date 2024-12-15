<script setup>
import VanillaTilt from "vanilla-tilt";

definePageMeta({
    auth: false,
    layout: "default",
});

onMounted(() => {
    VanillaTilt.init(document.querySelector("[data-tilt]"), {
        max: 10, //default 25
        speed: 400,
    });
});
</script>

<template>
    <section
        class="bg-gray-800 bg-cover bg-center flex flex-col justify-center items-start min-h-screen"
        style="background-image: url('/mainBackground.jpg')"
    >
        <span class="lg:text-9xl text-7xl font-serif text-white ml-[10%]"
            >ArtRate</span
        >
        <span
            class="text-lg -my-3 max-w-72 lg:-my-5 lg:max-w-full font-serif text-white ml-[10%]"
        >
            Rate world's most famous paintings and share your opinion
        </span>
    </section>
    <section
        class="bg-gray-200 bg-cover bg-center flex flex-col justify-center items-start min-h-screen"
    >
        <div class="w-4/5 mx-auto min-h-96 grid grid-cols-10 p-5 mt-12">
            <!-- due div di larghezza 5colonne ognuno -->
            <div
                class="col-span-10 lg:col-span-5 bg-cover bg-center aspect-square rounded-xl"
                style="
                    background-image: url('/Composition2.jpg');
                    padding-top: 100%;
                "
                data-tilt
            ></div>
            <div
                class="col-span-10 lg:col-span-5 lg:pl-5 flex flex-col justify-start items-start gap-3"
            >
                <h2 class="text-5xl font-extrabold">
                    Composition with red blue and yellow
                </h2>
                <div>
                    <span class="block text-2xl font-light mt-3">
                        Piet Mondrian
                    </span>
                    <span class="block text-2xl font-light"> 1930 </span>
                </div>
                <span class="block text-2xl mt-3 font-extralight">
                    Join our very big and funny community and share your opinion
                    on the world's most famous art works!
                </span>
                <CommentCard />
                <CommentCard />
                <CommentCard />
            </div>
        </div>
    </section>
</template>
