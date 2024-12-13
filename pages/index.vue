<script setup>
definePageMeta({
    auth: false,
    layout: "default",
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
        <div
            class="w-4/5 bg-red-200 mx-auto min-h-96 grid grid-cols-10 p-5 mt-12"
        >
            <!-- due div di larghezza 5colonne ognuno -->
            <div class="col-span-5 bg-blue-200">
                <span class="text-3xl font-serif">Cosa è ArtRate?</span>
                <span class="text-lg font-serif">
                    ArtRate è un sito web che permette agli utenti di votare e
                    commentare le opere d'arte più famose del mondo. Condividi
                    la tua opinione e scopri cosa pensano gli altri!
                </span>
            </div>
            <div class="col-span-5 bg-green-200">
                <span class="text-3xl font-serif">Come funziona?</span>
                <span class="text-lg font-serif">
                    ArtRate ti permette di votare le opere d'arte più famose del
                    mondo. Dopo aver votato, potrai vedere la media dei voti
                    degli altri utenti e leggere i loro commenti. Se vuoi
                    partecipare, registrati e inizia a votare!
                </span>
            </div>
        </div>
    </section>
</template>
