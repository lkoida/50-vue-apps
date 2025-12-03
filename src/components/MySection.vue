<script setup>
const props = defineProps(['section', 'data'])
const emit = defineEmits(['set:checked'])

const goldStar = '&#x2B50;'
const emptyStar = '&#x2606;'
const difficultyMap = {
  easy: `${goldStar}${emptyStar.repeat(3)}`,
  medium: `${goldStar.repeat(2)}${emptyStar.repeat(2)}`,
  hard: `${goldStar.repeat(3)}${emptyStar.repeat(1)}`,
  'very-hard': `${goldStar.repeat(4)}`,
}

function markDone(projectId, section) {
  emit('set:checked', { projectId, section })
}
</script>

<template>
  <details class="section">
    <summary>{{ props.section }}</summary>

    <details class="nested" v-for="project of data" :key="project.id">
      <summary class="nested-summary">
          <span class="nested-summary-content">
            {{ project.title }} <span class="difficulty" v-html="difficultyMap[project.difficulty]"/>
            <label v-if="!project.isDone" class="is-done-mark">
          <input
            type="checkbox"
            name="isDone"
            v-model="project.isDone"
            @click="markDone(project.id, section)"
          />
        </label>
        <span v-else>&#x2705;</span>
          </span>
      </summary>
      <p>{{ project.description }}</p>
      <p class="text strong">Testing considerations</p>
      <ul>
        <li v-for="test in project.testing" :key="test">
          {{ test }}
        </li>
      </ul>
    </details>
  </details>
</template>

<style scoped>
.section {
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
  }
}
</style>
