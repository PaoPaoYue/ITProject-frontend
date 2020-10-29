<template>
  <base-section>
    <v-container class="py-0" >
          <v-row
            class="mb-3"
            no-gutters
          >
<<<<<<< HEAD
            <v-spacer></v-spacer>
            <v-col cols="12" sm="1">
            </v-col>
            <v-spacer></v-spacer>
=======
>>>>>>> e46f19486da57e9c02c3aac82c45dadb9df846d3
          </v-row>
          <v-row
            class="mb-3"
            no-gutters
          >
            <v-spacer></v-spacer>
            <v-col cols="12" sm="10">
<<<<<<< HEAD
              <v-form>
                <base-text-field
                  v-model="name"
                  append-icon="mdi-magnify"
                  label="Search articles"
                  @click:append="searchUser"
                />
              </v-form>
              <base-info-card title="Search Results">
              </base-info-card>
              <router-link :to="{name: 'Profile'}" class="text-decoration-none">
                <v-container class="py-5 pl-0 pr-0">
                  <v-card
                    elevation="0"
                    class="mx-auto"
                    max-width="1200"
                  >
                  <news-author v-bind="author" />
                  </v-card>
                </v-container>
              </router-link>
              <v-divider>
              </v-divider>

              <router-link :to="{name: 'Profile'}" class="text-decoration-none">
                <v-container class="py-5 pl-0 pr-0">
                  <v-card
                    elevation="0"
                    class="mx-auto"
                    max-width="1200"
                  >
                      <news-author v-bind="author" />
                  </v-card>
                </v-container>
              
              </router-link>
              <v-divider>
              </v-divider>



              <router-link :to="{name: 'Profile'}" class="text-decoration-none">
                <v-container class="py-5 pl-0 pr-0">
                  <v-card
                    elevation="0"
                    class="mx-auto"
                    max-width="1200"
                  >
                      <news-author v-bind="author" />
                  </v-card>
                </v-container>
              </router-link>
              <v-divider>
              </v-divider>
=======
              <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="search">
                <base-text-field
                  v-model="name"
                  append-icon="mdi-magnify"
                  label="Search Users"
                  :rules="[rules.required, rules.max]"
                  @click:append="search"
                  
                />
              </v-form>

              <base-info-card title="Search Results"/>

              <template v-if="authors.length>0">
                <router-link 
                  :to="{name: 'Profile', params: { uid: author.uid }}" 
                  class="text-decoration-none"
                  v-for="(author, i) in authors"
                  :key="i"
                >
                  <v-container class="py-5 pl-0 pr-0">
                    <v-card
                      elevation="0"
                      class="mx-auto"
                      max-width="1200"
                    >
                      <news-author v-bind="author" />
                    </v-card>
                  </v-container>
                  <v-divider/>
                </router-link>
              </template>
              <v-fade-transition v-else>
                <NewsEmptyInfo />
              </v-fade-transition>
>>>>>>> e46f19486da57e9c02c3aac82c45dadb9df846d3

            </v-col>
            <v-spacer></v-spacer>
          </v-row>
<<<<<<< HEAD
          <v-row
            class="mb-3"
            no-gutters
          >
            <v-spacer></v-spacer>
            <v-col cols="12" sm="1">
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
=======
>>>>>>> e46f19486da57e9c02c3aac82c45dadb9df846d3

    </v-container>
  </base-section>
</template>

<script>


export default {
  name: 'Findusers',
  components: {
    NewsAuthor: () => import('@/components/news/Author'),
<<<<<<< HEAD
  },
  data: () => ({
    name: ''
  }),
  methods: {
    async searchUser () {
      this.loading = true
      this.$emit('message', 'loading...')
      if(this.name!=''){
        const [res, success]  = await this.$request.get("api/search/user", {name:this.name}).catch(err=>console.log(err))  
        if (success) {
          this.$emit('message', 'find results', 'success')
          //display the result
        }
        else {
          if (res.status === 422) {
            this.$emit('message', res.error.message, 'warn')
          }
          else {
            this.$emit('message', res.error, 'error')
          }
        }
      }else{
        const [res, success]  = await this.$request.get("api/search/user/all").catch(err=>console.log(err))

        if (success) {
          this.$emit('message', 'find results', 'success')
          //display the result
        }
        else {
          if (res.status === 422) {
            this.$emit('message', res.error.message, 'warn')
          }
          else {
            this.$emit('message', res.error, 'error')
          }
=======
    NewsEmptyInfo: () => import('@/components/news/EmptyInfo'),
  },
  data: () => ({
    name: '',
    valid: true,
    rules: {
      required: v=> !!v || 'This field must not be empty.',
      max: v => (v && v.length<=50) || 'Maximum 50 characters.',
    },
    authors: []
  }),
  methods: {
    async search () {
      if(this.loading || !this.$refs.form.validate()) return
      this.loading = true
      this.$emit('message', 'searching...')
      const [res, success]  = await this.$request.get("api/search/user", {name:this.name}).catch(err=>console.log(err))  
      if (success) {
        if (res.length == 0)
          this.$emit('message', 'no result', 'warn')
        else
          this.$emit('message', 'find results', 'success')
        this.authors = res
      }
      else {
        if (res.status === 422) {
          this.$emit('message', res.error.message, 'warn')
        }
        else {
          this.$emit('message', res.error, 'error')
>>>>>>> e46f19486da57e9c02c3aac82c45dadb9df846d3
        }
      }
      this.loading = false
    }   
  }
}
</script>
