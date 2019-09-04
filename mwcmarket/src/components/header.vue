<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid px-3">
      <router-link
        class="navbar-brand text-big font-weight-500 line-height-1"
        :to="{ name: 'home' }"
      >
        <img src="@/assets/img/logo.png" style="width:8%" /> &nbsp; MWC Market
      </router-link>

      <div class="navbar-collapse" id="landing-navbar-collapse">
        <div class="navbar-nav align-items-lg-center ml-auto">
          <div class="nav-item">
            <router-link class="btn btn-outline-white btn-round" :to="{ name: 'my' }">구매내역</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>