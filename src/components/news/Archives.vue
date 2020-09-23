<template>
  <base-info-card title="Archives">
    <ul class="pl">
      <li
        v-for="archive in archives"
        :key="archive"
        class="mb-3"
        v-text="archive"
      />
    </ul>
  </base-info-card>
</template>

<script>
  export default {
    name: 'NewsArchives',

    data: () => ({
      archives: [
        'November 2019 (8)',
        'October 2019 (8)',
        'August 2018 (8)',
        'December 2017 (8)',
      ],
    }),
  }
</script>
