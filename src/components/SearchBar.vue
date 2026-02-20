<template>
  <div class="bar">
    <input
      class="input"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search country (e.g. Sweden)"
    />
    <button class="btn" @click="$emit('search')">Search</button>
    <button class="btn two" @click="clearIt">Clear</button>
  </div>
</template>
<script>
export default{
  name: "SearchBar",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "search"],
  methods: {
    clearIt(){
      this.$emit("update:modelValue", "");
      this.$emit("search");
    },
  },
};
</script>
<style scoped>
.bar{
  display: flex;
  gap: 10px;
  align-items: center;
  background: white;
  border: 1px solid #e7e9f1;
  border-radius: 12px;
  padding: 12px;
}
.input{
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d9dceb;
  border-radius: 10px;
  outline: none;
}
.btn{
  padding: 10px 12px;
  border: 1px solid #16a34a;
  background: #16a34a;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}
.btn.two {
  background: white;
  color: #111827;
  border: 1px solid #d9dceb;
}
</style>