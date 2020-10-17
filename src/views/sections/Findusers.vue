<template>
  <base-section>
    <v-container class="py-0" >
          <v-row
            class="mb-3"
            no-gutters
          >
            <v-spacer></v-spacer>
            <v-col cols="12" sm="1">
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row
            class="mb-3"
            no-gutters
          >
            <v-spacer></v-spacer>
            <v-col cols="12" sm="10">
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

            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row
            class="mb-3"
            no-gutters
          >
            <v-spacer></v-spacer>
            <v-col cols="12" sm="1">
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

    </v-container>
  </base-section>
</template>

<script>


export default {
  name: 'Findusers',
  components: {
    NewsAuthor: () => import('@/components/news/Author'),
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
        }
      }
      this.loading = false
    }   
  }
}
</script>
