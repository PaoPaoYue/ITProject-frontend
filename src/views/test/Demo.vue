<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-1 font-weight-bold mb-3">
          AJAX Demo using Axios
        </h1>
        
        <p class="subheading font-weight-regular mb-3">
          accessing information provided by backend
        </p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="3">
          <v-btn color="primary" @click="fetchall">get all students</v-btn>
      </v-col>
      <v-col cols="6">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy" @submit.prevent="search">
          <v-text-field v-model="userid" :counter="2" :rules="useridRules" label="userid" required>
          </v-text-field>
          <v-btn :disabled="!valid" color="primary" @click="search">
            search student by id
          </v-btn>
        </v-form>
        
      </v-col>
      <v-col cols="3">
        <v-btn color="primary" @click="clean">
          clean result
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="mx-auto mt-3" width="600" tile>
        <v-subheader>STUDENTS</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="student in students" :key="student.id">
            <v-list-item-content>
              <v-list-item-title v-html="student.username"></v-list-item-title>
              <v-list-item-subtitle v-html="student.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data: () => ({
    valid: true,
    lazy: false,
    userid: '',
    useridRules: [
      v => !!v || 'userid is required',
      v => !isNaN(v) || 'userid must be integers',
    ],
    students:[]
  }),
  methods: {
    async fetchall () {
      this.students = []
      const res = await this.$request.get("api/student/list").catch(err=>
        console.log(err)
      ) // request http://host:port//user/list
      this.students = res
    },
    async search () {
      if (this.valid) {
        this.students = []
        const res  = await this.$request.get("api/student/"+this.userid).catch(err =>
          console.log(err)
        )
        this.students = [res]
        this.$refs.form.reset()
      } 
    },
    clean () {
      this.students = []
    }
  },
  mounted () {
    this.fetchall() // trigger when page load
  }
}
</script>
