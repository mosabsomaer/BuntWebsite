<template>
    <div class="container">
      <h1 class="jj">404</h1>
     
      <h2 class="kk">Oops! Page not found.</h2>
      <p class="pp">The page you're looking for doesn't exist or has been moved.</p>
   
      <router-link to="/" class="btn">Go to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage'
  }
  </script>
  
  <style scoped>
  /* CSS styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #333;
  }
  
  .container {
    text-align: center;
    padding: 40px;
    background-color: #fff;
    border-radius: 8px;
    flex-direction: column; 
    align-items: center; 
  }
  
  .jj {
    font-size: 72px;
    font-weight: bold;
    color: #BFAD69;
    margin-bottom: 20px;
  }
  
  .kk {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .pp {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
  }
  
  .btn {
    display: inline-block;
    background-color: #4D5DFF;
    color: #fff;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #3c47c7;
  }
  </style>