import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'root_path', component: () => import('../views/workspaces/index.vue'), meta: { layout: 'application' } },
    { path: '/admin', name: 'admin_path', component: () => import('../views/admin/index.vue'), meta: { layout: 'application' } },
    { path: '/login', name: 'login_path', component: () => import('../views/authentication/login.vue'), meta: { layout: 'authentication' } },
    { path: '/reset_password', name: 'reset_password_path', component: () => import('../views/authentication/resetPassword.vue'), meta: { layout: 'authentication' } },
    { path: '/signup', name: 'signup_path', component: () => import('../views/authentication/signup.vue'), meta: { layout: 'authentication' } },
    { path: '/confirm/:confirmation_token', name: 'confirm_path', component: () => import('../views/authentication/confirm.vue'), meta: { layout: 'authentication' } },
    { path: '/account', name: 'account_path', component: () => import('../views/authentication/account.vue'), meta: { layout: 'application' } },
    { path: '/workspaces', name: 'workspaces_path', component: () => import('../views/workspaces/index.vue'), meta: { layout: 'application' } },
    { path: '/workspaces/new', name: 'new_workspace_path', component: () => import('../views/workspaces/new.vue'), meta: { layout: 'application' } },
    { path: '/:workspaceId/edit', name: 'edit_workspace_path', component: () => import('../views/workspaces/edit.vue'), meta: { layout: 'application' } },
    {
      path: '/:workspaceId',
      component: () => import('../views/workspaces/show.vue'),
      meta: { layout: 'application' },
      children: [
        { path: '', name: 'templates_path', component: () => import('../views/templates/index.vue'), meta: { layout: 'application' } },
        { path: 'users', name: 'users_path', component: () => import('../views/users/index.vue'), meta: { layout: 'application' } },
        { path: 'users/new', name: 'new_user_path', component: () => import('../views/users/new.vue'), meta: { layout: 'application' } },
        { path: 'users/:userId/edit', name: 'edit_user_path', component: () => import('../views/users/edit.vue'), meta: { layout: 'application' } },
        { path: 'users/:userId', name: 'user_path', component: () => import('../views/users/show.vue'), meta: { layout: 'application' } },
        { path: 'templates/new', name: 'new_template_path', component: () => import('../views/templates/new.vue'), meta: { layout: 'application' } },
        { path: ':templateId/edit', name: 'edit_template_path', component: () => import('../views/templates/edit.vue'), meta: { layout: 'application' } },
        {
          path: ':templateId',
          component: () => import('../views/templates/show.vue'),
          meta: { layout: 'application' },
          children: [
            { path: '', name: 'entities_path', component: () => import('../views/entities/index.vue'), meta: { layout: 'application' } },
            { path: 'new', name: 'new_entity_path', component: () => import('../views/entities/new.vue'), meta: { layout: 'application' } },
            { path: ':entityId/edit', name: 'edit_entity_path', component: () => import('../views/entities/edit.vue'), meta: { layout: 'application' } },
            { path: ':entityId', name: 'entity_path', component: () => import('../views/entities/show.vue'), meta: { layout: 'application' } }
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
