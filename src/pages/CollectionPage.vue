<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCollection } from '../composables/useCollection'

const { state, deleteItem } = useCollection()
const route = useRoute()
const router = useRouter()

const search = ref('')
const category = ref('')
const condition = ref('')
const sortBy = ref('newest')
const notice = ref('')

watch(
  () => route.query.category,
  value => {
    category.value = typeof value === 'string' ? value : ''
  },
  { immediate: true },
)

const categories = computed(() =>
  [...new Set(state.items.map(item => item.category))].sort()
)

const filteredItems = computed(() => {
  let result = state.items.filter(item => {
    const query = search.value.trim().toLowerCase()

    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)

    const matchesCategory =
      !category.value || item.category === category.value

    const matchesCondition =
      !condition.value || item.condition === condition.value

    return matchesSearch && matchesCategory && matchesCondition
  })

  result = [...result]

  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => Number(b.price) - Number(a.price))
  } else if (sortBy.value === 'price-low') {
    result.sort((a, b) => Number(a.price) - Number(b.price))
  } else {
    result.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
  }

  return result
})

function money(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value)
}

function removeItem(item) {
  if (!window.confirm(`Delete "${item.name}" from your collection?`)) {
    return
  }

  if (deleteItem(item.id)) {
    notice.value = `${item.name} was deleted successfully.`
  }
}

function clearFilters() {
  search.value = ''
  category.value = ''
  condition.value = ''
  sortBy.value = 'newest'
  router.replace({ name: 'collection' })
}
</script>

<template>
  <section class="page-header">
    <span class="eyebrow">YOUR PERSONAL ARCHIVE</span>
    <h1>My Collection</h1>
    <p>Every piece matters. Browse, search, and manage your collection.</p>
  </section>

  <div v-if="notice" class="notice" role="status">
    {{ notice }}
    <button type="button" @click="notice = ''" aria-label="Dismiss message">
      ✕
    </button>
  </div>

  <section class="toolbar">
    <div class="search-field">
      <span>⌕</span>
      <input
        v-model="search"
        type="search"
        placeholder="Search name, category, description..."
        aria-label="Search collection"
      />
    </div>

    <select v-model="category" aria-label="Filter by category">
      <option value="">All categories</option>
      <option v-for="name in categories" :key="name" :value="name">
        {{ name }}
      </option>
    </select>

    <select v-model="condition" aria-label="Filter by condition">
      <option value="">All conditions</option>
      <option>New</option>
      <option>Like New</option>
      <option>Good</option>
      <option>Fair</option>
      <option>For Repair</option>
    </select>

    <select v-model="sortBy" aria-label="Sort collection">
      <option value="newest">Newest first</option>
      <option value="name">Name A–Z</option>
      <option value="price-high">Highest price</option>
      <option value="price-low">Lowest price</option>
    </select>

    <button class="button button-outline" type="button" @click="clearFilters">
      Clear
    </button>
  </section>

  <div class="collection-summary">
    <span>
      Showing <strong>{{ filteredItems.length }}</strong> of
      <strong>{{ state.items.length }}</strong> collection records
    </span>

    <RouterLink to="/items/new" class="button button-primary">
      + Add New Item
    </RouterLink>
  </div>

  <div v-if="filteredItems.length" class="item-grid">
    <article v-for="item in filteredItems" :key="item.id" class="item-card">
      <div class="item-image">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.name"
          @error="$event.target.style.display = 'none'"
        />
        <span v-else class="placeholder-symbol">◇</span>
        <span class="category-pill">{{ item.category }}</span>
      </div>

      <div class="item-info">
        <div class="item-title-row">
          <h3>{{ item.name }}</h3>
          <span class="condition-dot">{{ item.condition }}</span>
        </div>

        <p class="item-description">
          {{ item.description || 'No description added.' }}
        </p>

        <div class="item-details">
          <span>Quantity: {{ item.quantity }}</span>
          <strong>{{ money(Number(item.price) * Number(item.quantity)) }}</strong>
        </div>

        <div class="item-actions">
          <RouterLink
            :to="{ name: 'item-edit', params: { id: item.id } }"
            class="button button-outline button-small"
          >
            ✎ Edit
          </RouterLink>

          <button
            type="button"
            class="button button-danger button-small"
            @click="removeItem(item)"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  </div>

  <div v-else class="empty-state">
    <span class="empty-symbol">⌕</span>
    <h3>No matching items found</h3>
    <p>Try another search, clear the filters, or add a new item.</p>
    <button class="button button-outline" @click="clearFilters">
      Clear Filters
    </button>
    <RouterLink to="/items/new" class="button button-primary">
      + Add Item
    </RouterLink>
  </div>
</template>
