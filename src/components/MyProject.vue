<script setup>
import { ref, toValue } from 'vue'
import { useProjectStore } from '@/stores/projectStore.ts'

const { project } = defineProps(['project'])

const goldStar = '&#x2B50;'
const emptyStar = '&#x2606;'

const { setUrl, markDone: markAsDone } = useProjectStore()

const isDone = ref(Boolean(project.isdone))
async function markDone(projectId) {
  await markAsDone(projectId)
}

const link = ref(project.projecturl)
const isSubmitted = ref(Boolean(project.projecturl))
async function setProjectUrl(projectId) {
  await setUrl(projectId, toValue(link))
  isSubmitted.value = true
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
        <span v-if="isDone">&#x2705;</span>
      </span>
    </summary>
    <div v-html="project.description" />
    <label class="is-done-mark">
      <span>Mark as done</span>
      <input type="checkbox" name="isDone" v-model="isDone" @click="markDone(project.id)" />
    </label>
    <p class="text strong">Testing considerations</p>
    <ul>
      <li v-for="test in project.testing" :key="test">
        {{ test }}
      </li>
    </ul>
    <p>Result/Progress</p>
    <form v-if="!(link && isSubmitted)" @submit.prevent="setProjectUrl(project.id)">
      <input type="url" name="stack-blitz-url" class="result-progress" v-model="link" />
    </form>
    <a v-else :href="project.projecturl" target="_blank" rel="noopener noreferrer">{{ link }}</a>
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

  &[open]::details-content {
    background: color-mix(in oklch shorter hue, var(--accent-dark), white 30%);
    color: black;
    letter-spacing: 0.1em;
    line-height: 1.5;
    padding: 0.5em;
    border: thin solid grey;
  }
  & .result-progress {
    width: 100%;

    &:not(:user-valid) {
      border: 1px solid red;
    }
  }
}
</style>
