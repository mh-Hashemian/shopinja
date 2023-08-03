<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
</script>

<template>
  <Header />
  <main class="container mt-5 px-3">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped></style>
