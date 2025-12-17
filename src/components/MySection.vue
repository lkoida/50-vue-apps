<script setup lang="ts">
import MyProject from './MyProject.vue'

const props = defineProps(['section', 'data'])
</script>

<template>
  <details class="section">
    <summary>{{ props.section }}</summary>

    <MyProject
      class="nested"
      v-for="project of data"
      :project="project"
      :key="project.id"
      :name="props.section"
    />
  </details>
</template>

<style scoped>
.section {
  align-self: start;
  & summary {
    padding-block-start: 8px;
    height: 48px;
    border-bottom: 1px solid gray;
  }
  &:not(:last-of-type) {
    margin-block-end: 8px;
  }
}
</style>
