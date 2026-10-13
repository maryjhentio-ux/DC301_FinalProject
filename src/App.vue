<script setup>
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <div class="app-shell">
    <AppNavbar />

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="footer">
      <p>Personal Collection Inventory</p>
      <p>Organize your collection, your way.</p>
    </footer>
  </div>
</template>

