<template>
  
  <div class="top-bar">
    <img src="@/assets/bunt_logo.png" alt="Logo" class="logo" />
    <span class="app-name">Bunt</span>
  </div>
  <HomePageContent />
   
</template>

<script>
import { defineComponent, ref } from "vue";

import HomePageContent from "./views/HomePageContent.vue";

export default defineComponent({
  components: {
 
HomePageContent
  },
  name: "App",
 
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
}
body {
  font-family: 'Poppins', sans-serif;
  color: #3F3F3F;
  margin: 0px;
}





.my-custom-dropzone {
  flex-grow: 1; /* Make the dropzone take up all the available space */
  background-color: #f0f6ff;
  border-radius: 12px;
  padding: 21%;
  text-align: center;
  height: 150px;
}

/* DropZone message styles */
.my-custom-dropzone-message {
  font-size: 14px;
  color: #363861;
}

</style>