<template>
  <base-section>
    <v-container class="py-0" >
      <!--
      <base-section-heading title="Welcome To Your Profile">
      </base-section-heading>
      -->
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
                  v-model="keyword"
                  append-icon="mdi-magnify"
                  label="Search articles"
                  @click:append="()=>{}"
                />
              </v-form>


              <router-link :to="{name: 'Profile'}" class="text-decoration-none">
                <v-container class="py-2 pl-0 pr-0">
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
                <v-container class="py-2 pl-0 pr-0">
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
                <v-container class="py-2 pl-0 pr-0">
                  <v-card
                    elevation="0"
                    class="mx-auto"
                    max-width="1200"
                  >
                    <v-container class="py-2 pl-5">
                      <news-author v-bind="author" />
                    </v-container>
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
  }),
  methods: {
  }
}
</script>
