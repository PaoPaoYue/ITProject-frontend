<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2"
  > 
    <v-col cols="12" md="10" offset-md="1">
      <base-info-card title="Input Form" color="yellow">
        <v-card light class="px-4 pt-6" rounded='xl' flat>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="add">
            <v-col cols="12" md="10" offset-md="1" class="pa-0">
              <v-row no-gutters>
                <v-col cols="12" sm="6" class="pr-sm-4">
                  <v-select
                    :items="items"
                    v-model="type"
                    prepend-icon="mdi-card-text"
                    :rules="[rules.required]"
                    label="Type"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Commencing Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-text-field
                v-model="school"
                prepend-icon="mdi-bank"
                label="Your Education Institution"
                placeholder="no more than 200 characters"
                :rules="[rules.required, rules.max]"
              ></v-text-field>
              <v-text-field
                v-model="major"
                prepend-icon="mdi-school"
                label="Your Degree"
                placeholder="no more than 200 characters"
                :rules="[rules.required, rules.max]"
              ></v-text-field>
            </v-col>
          </v-form>

          <v-row no-gutters justify="end" class="pb-6 px-2">  
            <v-btn color="accent" @click.stop="add">+ add</v-btn>
          </v-row>
        </v-card>
      </base-info-card>

      <base-info-card title="Preview" color="yellow">
        <v-card light class="px-4 pt-6" rounded='xl' style="padding-bottom:8rem" flat>
          <v-col cols="12" md="10" offset-md="1" class="pa-0">
            <news-edu-back ref="preview" :edit="true" v-model="education_m"/>
          </v-col>
        </v-card>
      </base-info-card>
    </v-col>
  </v-card>  
</template>

<script>
export default {
  name: 'EditEducation',
  components: {
    NewsEduBack: () => import('@/components/news/EduBack'),
  },

  props: {
    education: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    return {
      valid: true,
      menu: false,
      items: [
        {text: 'Bachelor', value: 'bachelor'},
        {text: 'Master', value: 'master'},
        {text: 'Doctor', value: 'doctor'},
        {text: 'High School', value: 'school'},
        {text: 'Other', value: 'other'},
      ],
      rules: {
        required: v=> !!v || 'This field must not be empty.',
        max: v => (v && v.length<=200) || 'Maximum 200 characters.',
      },
      education_m: [],
      school: '',
      type: '',
      date: '',
      major: ''
    }
  },

  methods: {
    validate() {return true},
    add() {
      if (this.education_m.length >= 5) {
        this.$emit('message', 'can not add more than 5 items', 'warn')
        return 
      }

      if(this.$refs.form.validate()){
        let preview = this.$refs.preview
        let item = {
          type: this.type,
          school: this.school,
          date: this.date,
          major: this.major
        }
        if(preview.addItem(preview.value, item)) {
          this.$refs.form.reset()
          this.$emit('message', 'new item added!')
        }
        else {
          this.$emit('message', 'can not add duplicated item', 'warn')
        }
      }
    },
  },

  mounted() {
    this.education_m = this.education
  },

}
</script>