<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCollection } from '../composables/useCollection'

const { addItem, updateItem, getItem } = useCollection()

const router = useRouter()
const route = useRoute()

const isEditing = ref(false)
const error = ref('')

const form = ref({
  name: '',
  category: 'Books',
  condition: 'Good',
  description: '',
  image: '',
  price: 0,
  quantity: 1,
})

onMounted(() => {
  if (route.params.id) {
    const item = getItem(route.params.id)

    if (item) {
      isEditing.value = true
      form.value = { ...item }
    } else {
      router.push('/collection')
    }
  }
})

function saveItem() {
  if (!form.value.name.trim()) {
    error.value = 'Please enter an item name.'
    return
  }

  if (isEditing.value) {
    updateItem(route.params.id, form.value)
  } else {
    addItem(form.value)
  }

  router.push('/collection')
}
</script>

<template>
  <main class="page-container">
    <h1>{{ isEditing ? 'Edit Item' : 'Add New Item' }}</h1>
    <p>Record an item in your personal collection.</p>

    <form class="item-form" @submit.prevent="saveItem">
      <label>
        Item Name
        <input
          v-model="form.name"
          type="text"
          placeholder="Enter item name"
          required
        />
      </label>

      <label>
        Category
        <select v-model="form.category">
          <option>Books</option>
          <option>Toys</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Accessories</option>
          <option>Other</option>
        </select>
      </label>

      <label>
        Condition
        <select v-model="form.condition">
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Poor</option>
        </select>
      </label>

      <label>
        Price (PHP)
        <input
          v-model.number="form.price"
          type="number"
          min="0"
          placeholder="0"
        />
      </label>

      <label>
        Quantity
        <input
          v-model.number="form.quantity"
          type="number"
          min="1"
          placeholder="1"
        />
      </label>

      <label>
        Description
        <textarea
          v-model="form.description"
          placeholder="Describe your item"
          rows="4"
        ></textarea>
      </label>

      <label>
        Image URL (optional)
        <input
          v-model="form.image"
          type="url"
          placeholder="https://example.com/image.jpg"
        />
      </label>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="form-actions">
        <button type="submit" class="button button-primary">
          {{ isEditing ? 'Save Changes' : 'Add Item' }}
        </button>

        <button
          type="button"
          class="button button-outline"
          @click="router.push('/collection')"
        >
          Cancel
        </button>
      </div>
    </form>
  </main>
</template>