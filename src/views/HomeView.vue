<template>
  <div>
    <SearchBar v-model="searchText" @search="doSearch"/>
    <div class="controls">
      <select v-model="regionFilter" class="select">
        <option value="">All regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <button class="btn" @click="sortBy = 'name'">Sort by Name</button>
      <button class="btn" @click="sortBy = 'population'">Sort by Population</button>
    </div>
    <p v-if="isLoading" class="muted">Loading countries...</p>
    <p v-else-if="errorMsg" class="error">{{errorMsg}}</p>
    <p v-else class="muted">
      Showing {{filteredList.length}} result(s)
      <span v-if="searchedWord">for "{{searchedWord}}"</span>
    </p>
    <div v-if="!isLoading && !errorMsg && filteredList.length === 0" class="empty">
      No results.
    </div>
    <div class="grid">
      <CountryCard
        v-for="item in filteredList"
        :key="item.cca3"
        :country="item"
        :data-country="item.name.common"
      />
    </div>
  </div>
</template>
<script setup>
import {ref, onMounted, computed} from "vue";
import SearchBar from "../components/SearchBar.vue";
import CountryCard from "../components/CountryCard.vue";

const searchText = ref("");
const searchedWord = ref("");
const countryList = ref([]);
const isLoading = ref(false);
const errorMsg = ref("");
const sortBy = ref("name");
const regionFilter = ref("");

const filteredList = computed(() => {
  let list = [...countryList.value];
  if (regionFilter.value) {
    list = list.filter(c => c.region === regionFilter.value);
  }
  if (sortBy.value === "population") {
    list.sort((a, b) => b.population - a.population);
  } else {
    list.sort((a, b) => a.name.common.localeCompare(b.name.common));
  }
  return list;
});

async function loadAll(){
  isLoading.value = true;
  errorMsg.value = "";
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca3,capital,region,population,flags"
    );
    if (!res.ok) throw new Error("something went wrong");
    const json = await res.json();
    countryList.value = json.slice(0, 30);
  }catch (err){
    errorMsg.value = "Could not load countries.";
  } finally {
    isLoading.value = false;
  }
}

async function doSearch(){
  const typed = searchText.value.trim();
  searchedWord.value = typed;

  if (typed === ""){
    loadAll();
    return;
  }

  isLoading.value = true;
  errorMsg.value = "";
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(typed)}`
    );
    if (!res.ok) {
      countryList.value = [];
      return;
    }
    const json = await res.json();
    countryList.value = json.slice(0, 30);
  } catch (err){
    errorMsg.value = "Search failed.";
  } finally {
    isLoading.value = false;
  }
}
onMounted(loadAll);
</script>
<style scoped>
.controls{
  display: flex;
  gap: 10px;
  margin: 12px 0;
  flex-wrap: wrap;
}
.select{
  padding: 8px 12px;
  border: 1px solid #d9dceb;
  border-radius: 10px;
  outline: none;
}
.btn{
  padding: 8px 12px;
  border: 1px solid #d9dceb;
  border-radius: 10px;
  background: white;
  cursor: pointer;
}
.btn:hover{
  background: #f3f4f6;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.muted{
  color: #6b7280;
}
.error{
  color: #b91c1c;
}
.empty{
  background: white;
  border: 1px solid #e7e9f1;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
}
</style>