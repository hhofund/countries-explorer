<template>
  <article class="card" @click="isOpen = !isOpen">
    <img
      class="flag"
      :src="country.flags?.png"
      :alt="country.name.common + ' flag'"
      loading="lazy"
    />
    <h3 class="name">{{country.name.common}}</h3>
    <div class="info">
      <p><strong>Capital:</strong> {{capitalCity}}</p>
      <p><strong>Region:</strong> {{country.region || "—" }}</p>
      <p><strong>Population:</strong> {{formattedPop}}</p>
    </div>
    <div v-if="isOpen" class="extra">
      <p><strong>Full name:</strong> {{country.name.official}}</p>
    </div>
  </article>
</template>
<script setup>
import { computed, ref } from "vue"

const props = defineProps({
  country: Object,
});

const isOpen = ref(false);

const capitalCity = computed(() =>
  props.country.capital?.length > 0 ? props.country.capital[0] : "—"
);

const formattedPop = computed(() =>
  typeof props.country.population === "number"
    ? props.country.population.toLocaleString()
    : "—"
);
</script>
<style scoped>
.card{
  background: white;
  border: 1px solid #e7e9f1;
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  transition: transform 0.2s;
}
.card:hover{
  transform: scale(1.03);
}
.card:active{
  transform: scale(0.97);
}
.flag{
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eef0f7;
}
.name{
  margin: 10px 0 8px;
  font-size: 18px;
}
.info p{
  margin: 6px 0;
  color: #374151;
}
.extra{
  margin-top: 10px;
  border-top: 1px solid #e7e9f1;
  padding-top: 10px;
  color: #374151;
}
</style>