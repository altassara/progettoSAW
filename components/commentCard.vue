<template>
    <div class="w-full bg-white shadow-md rounded-2xl p-4 flex flex-col gap-4">
        <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
                <img
                    src="/profilePictureStock.jpg"
                    alt="Foto utente"
                    class="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p class="text-lg font-semibold text-gray-800">John Doe</p>
                    <p class="text-sm text-gray-500">15/12/2024</p>
                </div>
            </div>
            <div class="flex items-center justify-center gap-1">
                <span class="text-sm font-extralight">1.2k</span>
                <IconsHeart class="w-7 h-7 text-yellow-400" />
            </div>
        </div>

        <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">
                Very nice painting!!
            </h3>
            <div class="text-green-800 text-lg font-semibold">
                <span>9.6/10</span>
            </div>
        </div>
    </div>
</template>
