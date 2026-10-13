<script setup>
import { computed } from 'vue'
import { useCollection } from '../composables/useCollection'

const { state } = useCollection()

const totalItems = computed(() =>
  state.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
)

const totalTypes = computed(() => state.items.length)

const totalValue = computed(() =>
  state.items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  )
)

const categoryCount = computed(() =>
  new Set(state.items.map(item => item.category)).size
)

const recentItems = computed(() =>
  [...state.items].slice(0, 4)
)

function money(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value)
}
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <span class="eyebrow">YOUR PERSONAL COLLECTION</span>
      <h1>Every collection has a <span>story.</span></h1>
      <p>
        Keep your favorite things organized in one place.
        Discover what you own, track its value, and grow your collection.
      </p>

      <div class="hero-actions">
        <RouterLink to="/collection" class="button button-primary">
          Explore Collection →
        </RouterLink>
        <RouterLink to="/items/new" class="button button-outline">
          + Add New Item
        </RouterLink>
      </div>
    </div>

    <div class="hero-art" aria-label="Decorative collection illustration">
      <div class="art-circle"></div>
      <div class="art-card art-card-back">✦</div>
      <div class="art-card art-card-front">
        <span class="art-symbol">◇</span>
        <span class="art-caption">YOUR COLLECTION</span>
        <strong>One of a kind.</strong>
      </div>
      <span class="floating-star star-one">✦</span>
      <span class="floating-star star-two">✧</span>
    </div>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <div>
        <span class="eyebrow">AT A GLANCE</span>
        <h2>Your collection overview</h2>
      </div>
      <RouterLink to="/collection" class="text-link">
        View all items →
      </RouterLink>
    </div>

    <div class="stats-grid">
      <article class="stat-card">
        <div class="stat-icon icon-purple">▦</div>
        <p>Total Quantity</p>
        <strong>{{ totalItems }}</strong>
        <span>Pieces in your collection</span>
      </article>

      <article class="stat-card">
        <div class="stat-icon icon-orange">◇</div>
        <p>Unique Items</p>
        <strong>{{ totalTypes }}</strong>
        <span>Different collection records</span>
      </article>

      <article class="stat-card">
        <div class="stat-icon icon-green">₱</div>
        <p>Estimated Value</p>
        <strong class="value-number">{{ money(totalValue) }}</strong>
        <span>Based on quantity and unit price</span>
      </article>

      <article class="stat-card">
        <div class="stat-icon icon-blue">▤</div>
        <p>Categories</p>
        <strong>{{ categoryCount }}</strong>
        <span>Types of collectibles</span>
      </article>
    </div>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <div>
        <span class="eyebrow">RECENTLY COLLECTED</span>
        <h2>Your latest items</h2>
      </div>
      <RouterLink to="/collection" class="text-link">
        See collection →
      </RouterLink>
    </div>

    <div v-if="recentItems.length" class="item-grid">
      <RouterLink
        v-for="item in recentItems"
        :key="item.id"
        :to="{ name: 'item-edit', params: { id: item.id } }"
        class="item-card"
      >
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
          <h3>{{ item.name }}</h3>
          <p>{{ item.condition }} · Qty {{ item.quantity }}</p>
          <strong>{{ money(Number(item.price) * Number(item.quantity)) }}</strong>
        </div>
      </RouterLink>
    </div>

    <div v-else class="empty-state">
      <span class="empty-symbol">◇</span>
      <h3>Your collection starts here</h3>
      <p>Add your first item to see it on your dashboard.</p>
      <RouterLink to="/items/new" class="button button-primary">
        Add Your First Item
      </RouterLink>
    </div>
  </section>

  <section class="callout">
    <div>
      <span class="eyebrow">MADE FOR COLLECTORS</span>
      <h2>Something new to add?</h2>
      <p>Record your next favorite item and keep everything organized.</p>
    </div>
    <RouterLink to="/items/new" class="button button-light">
      Add to Collection →
    </RouterLink>
  </section>
</template>