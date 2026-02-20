<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <p>check out my github: <a href="https://github.com/hhofund" target="_blank">@hhofund</a></p>
  </div>
</template>
<script>
export default {
  name: "AboutView",
  data(){
    return {
      title: "About",
      description: "simple website built with vue. thanks for visiting.",
    }
  },
}
</script>