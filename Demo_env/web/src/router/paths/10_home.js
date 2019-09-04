export default {
  routes: [
    {
      title: 'home',
      path: '/',
      name: 'home',
      component: function(resolve) {
        require(['@/components/index.vue'], resolve)
      },
    },
    {
      title: 'header',
      path: '/header',
      name: 'header',
      component: function(resolve) {
        require(['@/components/header.vue'], resolve)
      },
    },
    {
      title: 'detail',
      path: '/:idolId(\\d+)',
      name: 'detail',
      component: function(resolve) {
        require(['@/components/detail.vue'], resolve)
      },
    },
    {
      title: 'product',
      path: '/product',
      name: 'product',
      component: function(resolve) {
        require(['@/components/product.vue'], resolve)
      },
    },
    {
      title: 'products',
      path: '/products',
      name: 'products',
      component: function(resolve) {
        require(['@/components/products.vue'], resolve)
      },
    },
    {
      title: 'my',
      path: '/my',
      name: 'my',
      component: function(resolve) {
        require(['@/components/my.vue'], resolve)
      },
    },

  ],
};
