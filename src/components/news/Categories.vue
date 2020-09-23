<template>
  <base-info-card title="Post Categories">
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
        'Analytics Implementation',
        'Business Partnerships',
        'Growth Strategy',
        'Research Discussions',
      ],
    }),
  }
</script>
