<template>
  <base-info-card title="Posts Categories">
    <ul class="pl">
      <li
        v-for="category in categories"
        :key="category"
        class="mb-3"
        v-text="category"
      />
    </ul>
  </base-info-card>
</template>

<script>
  export default {
    name: 'NewsCategories',

    data: () => ({
      categories: [
        'Tech Blog',
        'Project Presentation',
        'Video Description',
        'Parper Display',
      ],
    }),
  }
</script>
