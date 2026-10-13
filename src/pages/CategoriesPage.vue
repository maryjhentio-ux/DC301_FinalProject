<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCollection } from '../composables/useCollection'

const router = useRouter()
const { state } = useCollection()

const categories = computed(() => {
  const counts = {}

  state.items.forEach((item) => {
    const category = item.category || 'Other'
    counts[category] = (counts[category] || 0) + 1
  })

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count
  }))
})

function viewCollection(category) {
  router.push({
    path: '/collection',
    query: { category }
  })
}
</script>

<template>
  <main class="page-container">
    <p class="eyebrow">ORGANIZE YOUR ITEMS</p>
    <h1>Categories</h1>
    <p>Browse your personal collection by category.</p>

    <section v-if="categories.length" class="category-grid">
      <button
        v-for="category in categories"
        :key="category.name"
        class="category-card"
        type="button"
        @click="viewCollection(category.name)"
      >
        <div class="category-icon"></div>
        <h2>{{ category.name }}</h2>
        <p>
          {{ category.count }}
          {{ category.count === 1 ? 'item' : 'items' }}
        </p>
        <span class="view-link">View items →</span>
      </button>
    </section>

    <section v-else class="empty-state">
      <h2>No categories yet</h2>
      <p>Add your first item to see its category here.</p>
      <button
        class="button button-primary"
        type="button"
        @click="router.push('/items/new')"
      >
        + Add Item
      </button>
    </section>
  </main>
</template>

<style scoped>
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.category-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.category-icon {
  font-size: 2rem;
}

.category-card h2 {
  font-size: 1.25rem;
  color: var(--text-dark, #1f2937);
  margin: 0;
}

.category-card p {
  color: var(--text-muted, #6b7280);
  font-size: 0.95rem;
  margin: 0;
}

.view-link {
  color: var(--button-blue, #0ea5e9);
  font-weight: 600;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
  background: var(--card-bg, #ffffff);
  border-radius: 8px;
  margin-top: 2rem;
  border: 1px solid var(--border-color, #e5e7eb);
}

.empty-state h2 {
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: var(--text-muted, #6b7280);
  margin-bottom: 1.5rem;
}
</style>