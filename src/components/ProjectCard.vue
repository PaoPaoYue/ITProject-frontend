<template>
  <base-card
    :to="{
      name: 'Project',
      params: { project: 'lorem-ipsum' }
    }"
    class="mx-3"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <base-img
      v-if="src"
      :aspect-ratio="1.4"
      :src="src"
      height="inherit"
    />
  </base-card>
</template>

<script>
  export default {
    name: 'ProjectCard',

    props: { src: String },
  }
</script>
