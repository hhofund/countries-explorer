<template>
  <header class="topbar">
    <h1>Countries Explorer</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <main class="container">
    <RouterView/>
  </main>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<style>
nav {
  display: flex;
  gap: 16px;
}
nav a {
  text-decoration: none;
  color: black;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #ddd;
}
.container {
  padding: 20px;
}
</style>
