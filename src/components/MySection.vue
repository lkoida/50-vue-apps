<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['section', 'data'])
const emit = defineEmits(['set:checked', 'set:url'])

const goldStar = '&#x2B50;'
const emptyStar = '&#x2606;'

function markDone(projectId) {
  emit('set:checked', { projectId })
}

const link = ref('')
function setProjectUrl(projectId) {
  emit('set:url', { projectId, link })
}
</script>

<template>
  <details class="section">
    <summary>{{ props.section }}</summary>

    <details class="nested" v-for="project of data" :key="project.id" :name="props.section">
      <summary class="nested-summary">
        <span class="nested-summary-content">
          {{ project.title }}
          <span
            class="difficulty"
            v-html="goldStar.repeat(project.level).padEnd(goldStar.length * 4, emptyStar)"
          />
          <label v-if="!project.isdone" class="is-done-mark">
            <input
              type="checkbox"
              name="isDone"
              v-model="project.isdone"
              @click="markDone(project.id)"
            />
          </label>
          <span v-else>&#x2705;</span>
        </span>
      </summary>
      <div v-html="project.description"/>
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

  & .nested {
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
}
</style>
