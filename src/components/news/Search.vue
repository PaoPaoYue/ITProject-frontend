<template>
  <div>
    <base-text-field
      append-icon="mdi-magnify"
      label="Search articles"
    />

    <base-info-card title="About Us">
      <base-img
        :src="require('@/assets/conference.jpg')"
        class="mb-4"
        color="grey lighten-1"
        height="196"
        tile
        width="100%"
      />

      <base-body>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, distinctio tempore? Nihil nemo quae ex cum.
      </base-body>
    </base-info-card>
  </div>
</template>

<script>
  export default {
    name: 'NewsSearch',
  }
</script>
