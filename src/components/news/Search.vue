<template>
  <div>
    <base-text-field
      append-icon="mdi-magnify"
      label="Search articles"
    />

    <base-info-card title="About Me">
      <base-img
        :src="require('@/assets/home-hero.jpg')"
        class="mb-4"
        color="grey lighten-1"
        height="196"
        tile
        width="100%"
      />

      <base-body>
        Description yourself shortly: For example: 
        I am a perfect software engineer, or a bad product manager
      </base-body>
    </base-info-card>
  </div>
</template>

<script>
  export default {
    name: 'NewsSearch',
  }
</script>
