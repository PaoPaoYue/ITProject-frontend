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
                        label="Issue Date"
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
                v-model="name"
                prepend-icon="mdi-license"
                label="The Name"
                placeholder="no more than 200 characters"
                :rules="[rules.required, rules.max]"
              ></v-text-field>
              <v-text-field
                v-model="issuer"
                prepend-icon="mdi-draw"
                label="Issued / Published by"
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
            <news-achievement ref="preview" :edit="true" v-model="award_m"/>
          </v-col>
        </v-card>
      </base-info-card>
    </v-col>
  </v-card>  
</template>

<script>
export default {
  name: 'EditAchievement',
  components: {
    NewsAchievement: () => import('@/components/news/Achievement'),
  },

  props: {
    award: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    return {
      valid: true,
      menu: false,
      items: [
        {text: 'Award', value: 'award'},
        {text: 'Publications', value: 'publish'},
      ],
      rules: {
        required: v=> !!v || 'This field must not be empty.',
        max: v => (v && v.length<=200) || 'Maximum 200 characters.',
      },
      award_m: [],
      type: '',
      name: '',
      date: '',
      issuer: ''
    }
  },

  methods: {
    add() {
      if (this.award_m.length >= 5) {
        this.$emit('message', 'can not add more than 5 items', 'warn')
        return 
      }

      if(this.$refs.form.validate()){
        let preview = this.$refs.preview
        let item = {
          type: this.type,
          name: this.name,
          date: this.date,
          issuer: this.issuer
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
    this.award_m = this.award.concat()
  },

}
</script>
