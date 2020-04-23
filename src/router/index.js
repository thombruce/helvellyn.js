import Vue from 'vue'
import VueRouter from 'vue-router'

import WorkspaceIndex from '../views/workspaces/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: WorkspaceIndex, name: 'root_path' },
    { path: '/admin', name: 'admin_path', component: () => import('../views/admin/index.vue') },
    { path: '/login', name: 'login_path', component: () => import('../views/authentication/login.vue'), meta: { layout: 'authentication' } },
    { path: '/reset_password', name: 'reset_password_path', component: () => import('../views/authentication/resetPassword.vue'), meta: { layout: 'authentication' } },
    { path: '/signup', name: 'signup_path', component: () => import('../views/authentication/signup.vue'), meta: { layout: 'authentication' } },
    { path: '/confirm/:confirmation_token', name: 'confirm_path', component: () => import('../views/authentication/confirm.vue'), meta: { layout: 'authentication' } },
    { path: '/account', name: 'account_path', component: () => import('../views/authentication/account.vue') },
    { path: '/workspaces', name: 'workspaces_path', component: WorkspaceIndex },
    { path: '/workspaces/new', name: 'new_workspace_path', component: () => import('../views/workspaces/new.vue') },
    { path: '/:workspaceId/edit', name: 'edit_workspace_path', component: () => import('../views/workspaces/edit.vue') },
    {
      path: '/:workspaceId',
      component: () => import('../views/workspaces/show.vue'),
      children: [
        { path: '', name: 'templates_path', component: () => import('../views/templates/index.vue') },
        { path: 'users', name: 'users_path', component: () => import('../views/users/index.vue') },
        { path: 'users/new', name: 'new_user_path', component: () => import('../views/users/new.vue') },
        { path: 'users/:userId/edit', name: 'edit_user_path', component: () => import('../views/users/edit.vue') },
        { path: 'users/:userId', name: 'user_path', component: () => import('../views/users/show.vue') },
        { path: 'templates/new', name: 'new_template_path', component: () => import('../views/templates/new.vue') },
        { path: ':templateId/edit', name: 'edit_template_path', component: () => import('../views/templates/edit.vue') },
        {
          path: ':templateId',
          component: () => import('../views/templates/show.vue'),
          children: [
            { path: '', name: 'entities_path', component: () => import('../views/entities/index.vue') },
            { path: 'new', name: 'new_entity_path', component: () => import('../views/entities/new.vue') },
            { path: ':entityId/edit', name: 'edit_entity_path', component: () => import('../views/entities/edit.vue') },
            { path: ':entityId', name: 'entity_path', component: () => import('../views/entities/show.vue') }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['login_path', 'signup_path', 'confirm_path', 'reset_password_path']
  const authRequired = !publicPages.includes(to.name)
  const loggedIn = localStorage.getItem('user-token')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
