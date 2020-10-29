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
              <v-text-field
                v-model="name"
                prepend-icon="mdi-emoticon-happy"
                label="Your Interest"
                placeholder="no more than 50 characters"
                :rules="[rules.required, rules.max]"
              ></v-text-field>
              <v-textarea
                v-model="description"
                prepend-icon="mdi-message-processing"
                label="Description"
                placeholder="no more than 400 characters"
                :rules="[rules.required, rules.max1]"
              ></v-textarea>
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
            <news-interest ref="preview" :edit="true" v-model="interest_m"/>
          </v-col>
        </v-card>
      </base-info-card>
    </v-col>
  </v-card>  
</template>

<script>
export default {
  name: 'EditInterest',
  components: {
    NewsInterest: () => import('@/components/news/Interest'),
  },

  props: {
    interest: {
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
        max: v => (v && v.length<=50) || 'Maximum 50 characters.',
        max1: v => (v && v.length<=400) || 'Maximum 400 characters.',
      },
      interest_m: [],
      name: '',
      description: ''
    }
  },

  methods: {
    add() {
      if (this.interest_m.length >= 5) {
        this.$emit('message', 'can not add more than 5 items', 'warn')
        return 
      }

      if(this.$refs.form.validate()){
        let preview = this.$refs.preview
        let item = {
          name: this.name,
          description: this.description,
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
    this.interest_m = this.interest.concat()
  },

}
</script>
