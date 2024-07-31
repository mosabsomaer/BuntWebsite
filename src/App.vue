<template>
  <router-link :to="{ name: 'home' }" class="no-underline">
    <div class="top-bar">
      <img src="@/assets/bunt_logo.png" alt="Logo" class="logo" />
      <span class="app-name">Bunt</span>
    </div>
  </router-link>

<div class="bottom-line"></div>
  <router-view />
  <footer class="foot">
    <div class="footer-content">
      <div class="company-info">
        <p><strong>Bunt</strong></p>
        <p>We are a leading provider of printing services, offering reliable and efficient solutions for all your
          printing needs.</p>
        <p>Location: Benghazi / Libya</p>
      </div>
      <div class="footer-links">
        <router-link to="/" class="link" @click.native="scrollToTop">Home</router-link>
        <router-link to="/terms" class="link" @click.native="scrollToTop">Terms of Service</router-link>
        <router-link to="/privacy" class="link" @click.native="scrollToTop">Privacy Policy</router-link>
      </div>
      <div class="powered-by">
        <p>Powered by <a href="https://cloudconvert.com" target="_blank" class="link">Cloud Convert</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, ref } from "vue";

import HomePageContent from "./views/HomePageContent.vue";



export default defineComponent({
  components: {
    HomePageContent
  },
  name: "App", 
  
  methods: {
  
    scrollToTop() {
      window.scrollTo({ top: 0 });
    }
  }

});
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

.top-bar {
  background-color: #FFD84D;
  display: flex;
  align-items: center;
  padding: 10px;
  height: 40px;
}

.logo {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}

.app-name {
  font-size: 21px;
  font-weight: 600;
  color: #807A66;
  text-decoration: none;
  border: none;
}

body {
  font-family: 'Poppins', sans-serif;
  color: #3F3F3F;
  margin: 0px;
}

.no-underline {
  text-decoration: none;
}


.foot {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4d5dff;
  padding: 10px 35px;
  color: white;
  margin-top: 30vh;
}


.footer-content {
  display: flex;
  flex-direction: column;
  align-items: normal;
}

.company-info,
.footer-links,
.powered-by {
  margin: 10px 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
}

.link {
  color: #ffffff;
  text-decoration: none;
  margin: 5px 0;
}

.link:hover {
  text-decoration: underline;
}

.company-info strong {
  font-size: 1.2em;
}

.company-info p,
.powered-by p {
  margin: 5px 0;
}




.router-link {
  display: inline-block;
  width: 50%;
  text-align: center;
  padding: 10px 0;
  text-decoration: none;
  color: rgb(73, 73, 73);
  position: relative;
}

.router-link:hover {
  background-color: #f0f0f0;
  color: gray;
}



.router-link::after {
  content: '';
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: rgb(160, 160, 160); /* Black line between links */
  top: 0;
  right: 0;
}
.router-link {
  border-bottom: 1px solid rgb(147, 147, 147); /* Add a bottom border to each link */
}
</style>