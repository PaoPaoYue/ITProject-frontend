<template>
  <base-section id="401">
    <base-heading title="401" />

    <base-subheading
      class="primary--text"
      title="Ops!"
    />

    <base-subheading
      title="Looks like you haven't login for a while"
    />
    <base-subheading
      title="Redirecting to login page..."
    />
    <base-img
      :src="require('@/assets/logo.svg')"
      class="mx-auto mb-12"
      contain
      height="350"
      width="250"
    />

    <div class="text-center">
      <base-btn :to="{ name: 'Login' }">
        Bring me to login
      </base-btn>
    </div>
  </base-section>
</template>

<script>
  export default {
    name: 'FourOhOne',

    provide: {
      heading: { align: 'center' },
    },

    mounted() {
      this.$store.dispatch('logout')
      setTimeout(()=>{
        if (this.$route.name === 'NotLogin')
          this.$router.push('login')
      }, 2000);
    },
  }
</script>
