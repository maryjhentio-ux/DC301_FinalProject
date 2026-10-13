import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CollectionPage from '../pages/CollectionPage.vue'
import CategoriesPage from '../pages/CategoriesPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ItemFormPage from '../pages/ItemFormPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/collection',
    name: 'collection',
    component: CollectionPage,
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesPage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
  {
    path: '/items/new',
    name: 'item-new',
    component: ItemFormPage,
  },
  {
    path: '/items/:id/edit',
    name: 'item-edit',
    component: ItemFormPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router