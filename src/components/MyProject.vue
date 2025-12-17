<script setup>
import { ref, toValue } from 'vue'
import { useProjectStore } from '@/stores/projectStore.ts'

const { project } = defineProps(['project'])

const goldStar = '&#x2B50;'
const emptyStar = '&#x2606;'

const { setUrl, markDone: markAsDone } = useProjectStore()

const isDone = ref(project.isdone)
async function markDone(projectId) {
  await markAsDone(projectId)
}

const link = ref('')
async function setProjectUrl(projectId) {
  await setUrl(projectId, toValue(link))
}
</script>

<template>
  <details class="nested">
    <summary class="nested-summary">
      <span class="nested-summary-content">
        {{ project.title }}
        <span
          class="difficulty"
          v-html="goldStar.repeat(project.level).padEnd(goldStar.length * 4, emptyStar)"
        />
        <label v-if="!isDone" class="is-done-mark">
          <input type="checkbox" name="isDone" v-model="isDone" @click="markDone(project.id)" />
        </label>
        <span v-else>&#x2705;</span>
      </span>
    </summary>
    <div v-html="project.description" />
    <p class="text strong">Testing considerations</p>
    <ul>
      <li v-for="test in project.testing" :key="test">
        {{ test }}
      </li>
    </ul>
    <p>Result/Progress</p>
    <form v-if="!project.projecturl" @submit.prevent="setProjectUrl(project.id)">
      <input type="url" name="stack-blitz-url" class="result-progress" v-model="link" />
    </form>
    <a :href="project.projecturl" target="_blank" rel="noopener noreferrer" v-else>{{
      project.projecturl
    }}</a>
  </details>
</template>

<style scoped>
.nested {
  margin-inline-start: 48px;

  & .nested-summary {
    & .nested-summary-content {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;

      & .difficulty::first-letter {
        color: gold;
      }
    }
  }

  & .result-progress {
    width: 100%;

    &:not(:user-valid) {
      border: 1px solid red;
    }
  }
}
</style>
