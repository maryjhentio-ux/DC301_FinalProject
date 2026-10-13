<template>
  <nav class="app-navbar">
    <div class="nav-container">
      <RouterLink to="/" class="brand">✦ My Collection</RouterLink>
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/collection">My Collection</RouterLink>
        <RouterLink to="/categories">Categories</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/items/new" class="button button-primary">+ Add Item</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.app-navbar {
  background-color: #1e3a8a;
  padding: 1rem 2rem;
}

.nav-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-links a {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover, .nav-links a.router-link-active {
  color: #ffffff;
  text-decoration: underline;
}
</style>