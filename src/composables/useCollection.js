
import { reactive, watch } from 'vue'

const STORAGE_KEY = 'personal-collection-inventory-v1'

const sampleItems = [
  {
    id: 'item-1',
    name: 'The Hobbit',
    category: 'Books',
    description: 'A fantasy adventure novel.',
    quantity: 2,
    price: 450,
    condition: 'Good',
    image: '',
    dateAdded: '2026-09-01',
  },
  {
    id: 'item-2',
    name: 'Classic Robot Figure',
    category: 'Figures',
    description: 'A collectible robot figure.',
    quantity: 1,
    price: 850,
    condition: 'Like New',
    image: '',
    dateAdded: '2026-09-03',
  },
  {
    id: 'item-3',
    name: 'Vintage Trading Card',
    category: 'Trading Cards',
    description: 'A card kept in a protective sleeve.',
    quantity: 5,
    price: 120,
    condition: 'Good',
    image: '',
    dateAdded: '2026-09-05',
  },
  {
    id: 'item-4',
    name: 'Retro Headphones',
    category: 'Electronics',
    description: 'A personal electronics collectible.',
    quantity: 1,
    price: 1200,
    condition: 'Fair',
    image: '',
    dateAdded: '2026-09-08',
  },
]

function loadItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved !== null) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (error) {
    console.error('Could not load collection:', error)
  }

  return sampleItems.map(item => ({ ...item }))
}

const state = reactive({
  items: loadItems(),
})

watch(
  () => state.items,
  (items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Could not save collection:', error)
    }
  },
  { deep: true },
)

export function useCollection() {
  function addItem(item) {
    const newItem = {
      ...item,
      id: globalThis.crypto?.randomUUID?.()
        ?? `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      dateAdded: new Date().toISOString().slice(0, 10),
    }

    state.items.unshift(newItem)
    return newItem
  }

  function updateItem(id, changes) {
    const index = state.items.findIndex(item => item.id === id)

    if (index === -1) return false

    state.items[index] = {
      ...state.items[index],
      ...changes,
      id: state.items[index].id,
    }

    return true
  }

  function deleteItem(id) {
    const index = state.items.findIndex(item => item.id === id)

    if (index === -1) return false

    state.items.splice(index, 1)
    return true
  }

  function getItem(id) {
    return state.items.find(item => item.id === id)
  }

  function resetSamples() {
    state.items = sampleItems.map(item => ({ ...item }))
  }

  return {
    state,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    resetSamples,
  }
}
