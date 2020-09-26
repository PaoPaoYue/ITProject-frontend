<template>
  <div>
    <base-subheading
      :key="`${section}-subheading`"
      class="pa-6 primary darken-2 white--text"
      space="0"
      weight="light"
    >
      <strong class="text-uppercase font-weight-bold">Section</strong>
      &nbsp;—&nbsp;

      <span>src/views/sections/</span>

      <span
        class="text-capitalize font-weight-bold"
        v-text="camelCase(section)"
      />

      <span class="font-weight-bold">.vue</span>

      👇
    </base-subheading>

    <slot />
  </div>
</template>

<script>

  // Utilities
  import {
    camelCase,
  } from 'lodash'
  export default {
    name: 'SinkCallout',

    props: { section: String },

    methods: { camelCase },
  }
</script>
