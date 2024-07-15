<template>
   <button @click=sda()>click me</button>
</template>

<script>

export default{
  
  data() {
    return {

    };
  },
  methods:{
    sda(){
  this.$router.push('/privacy')
}
  },
  name: "urlLink",
  setup() {
   
   
    return {
    };
  },
}
</script>

<style scoped>

</style>
