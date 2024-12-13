<script setup>
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/",
    },
    layout: "login",
});
const route = useRoute();
const router = useRouter();
const email = route.query.email;

const checkVerification = async () => {
    try {
        const response = await $fetch("/api/auth/check-verification", {
            method: "GET",
            params: { email: email },
        });

        if (response.verified === true) {
            router.push("/login"); // Redirigi alla pagina di login dopo la verifica
        }
    } catch (error) {
        console.error("Error checking verification status:", error);
    }
};

// Polling per verificare lo stato dell'utente ogni 5 secondi
onMounted(() => {
    const intervalId = setInterval(checkVerification, 5000);

    // Pulisci l'intervallo quando il componente viene distrutto
    onUnmounted(() => {
        clearInterval(intervalId);
    });
});
</script>

<template>
    <div>
        <h1
            class="text-4xl font-sans font-black mb-6 text-center text-gray-800"
        >
            Verify your email
        </h1>
        <p class="text-center text-gray-600">
            We have sent an email to <strong>{{ email }}</strong> with a
            verification link. Please check your inbox and click the link to
            verify your email address. You will be redirected to the login page
            once your email is verified.
        </p>
    </div>
</template>
