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
                  <v-text-field
                    v-model="name"
                    label="Name of the Tag"
                    placeholder="no more than 100 characters"
                    prepend-icon="mdi-tag"
                    :rules="[rules.required, rules.max]"
                  ></v-text-field>
                </v-col>
              </v-row>
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
            <news-skillset ref="preview" :edit="true" v-model="skillset_m"/>
          </v-col>
        </v-card>
      </base-info-card>
    </v-col>
  </v-card>  
</template>

<script>
export default {
  name: 'EditSkillSet',
  components: {
    NewsSkillset: () => import('@/components/news/Skillset'),
  },

  props: {
    skillset: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      valid: true,
      menu: false,
      items: [
        {text: 'Knowledge Fields', value: 'field'},
        {text: 'Technology and Tools', value: 'tech'},
        {text: 'Other', value: 'other'},
      ],
      rules: {
        required: v=> !!v || 'This field must not be empty.',
        max: v => (v && v.length<=100) || 'Maximum 100 characters.',
      },
      skillset_m: {},
      type: '',
      name: '',
    }
  },

  methods: {
    validate() {return true},
    add() {
      if (this.skillset_m.length >= 5) {
        this.$emit('message', 'can not add more than 5 items', 'warn')
        return 
      }

      if(this.$refs.form.validate()){
        let preview = this.$refs.preview
        let item = this.name
        if(preview.addItem(preview.value[this.type], item)) {
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
    this.skillset_m = this.skillset
  },

}
</script>
