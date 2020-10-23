<template>
  <base-section id="404">
    <base-heading title="404" />

    <base-subheading
      class="primary--text"
      title="Ops!"
    />

    <base-subheading
      title="Looks like this page doesn't exist"
    />
    <base-subheading
      title="Redirecting to home page..."
    />
    <base-img
      :src="require('@/assets/logo.svg')"
      class="mx-auto mb-12"
      contain
      height="350"
      width="250"
    />

    <div class="text-center">
      <base-btn :to="{ name: 'Home' }">
        Bring me to home
      </base-btn>
    </div>
  </base-section>
</template>

<script>
  export default {
    name: 'FourOhFour',

    provide: {
      heading: { align: 'center' },
    },

    mounted() {
      setTimeout(()=>{
        if (this.$route.name === 'FourOhFour')
          this.$router.push('/')
      }, 2000);
    },
  }
</script>
