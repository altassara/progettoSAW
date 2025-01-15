<template class="relative">
    <div class="h-screen grid grid-cols-1 lg:grid-cols-10">
        <div
            class="col-span-1 lg:col-span-7 flex items-center justify-center bg-gray-100"
        >
            <div class="max-w-md lg:w-4/5">
                <slot />
            </div>
        </div>
        <div class="hidden lg:flex col-span-3 bg-gray-300">
            <img
                src="/loginBackground.png"
                alt="Random"
                class="object-cover w-full h-full"
            />
        </div>
    </div>
</template>
