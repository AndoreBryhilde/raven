import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
    {
      path: '/',
      meta: { requiresAuth: true },
      component: () => import('../views/Home.vue'),
      children: [
        { path: '/', name: 'welcome', component: () => import('../views/Welcome.vue') },
      ],
    },
  ],
});

export default router;
