<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  >       
    <v-col cols="12" md="10" offset-md="1">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>

        <base-info-card title="Change Cover Image" color="yellow">
          <v-card light class="px-4 py-6" rounded='xl' flat>
              <v-col cols="12" md="10" offset-md="1" class="pa-0">
                <v-row justify="center">
                  <v-img
                    :src=" !info.coverImg ? require('@/assets/draft.png'): info.coverImg "
                    alt="cover image"
                    max-height="250"
                    class="rounded-xl mb-3"
                  />
                </v-row>
                <v-file-input
                  show-size
                  v-model="imageFile"
                  accept="image/png, image/jpeg, image/bmp"
                  label="Pick a new article cover"
                  placeholder="accpet .png .jpeg .bmp, samller than 4MB"
                  prepend-icon="mdi-camera"
                  :rules="[rules.size]"
                  @change="change"
                ></v-file-input>
              </v-col>
          </v-card>
        </base-info-card>

        <base-info-card title="Edit Article Information" color="yellow">
          <v-card light class="px-4 py-6" rounded='xl'  flat>
            <v-col cols="12" md="10" offset-md="1" class="pa-0">
              <v-text-field
                v-model="info.title"
                prepend-icon="mdi-format-title"
                label="The Title"
                placeholder="no more than 200 characters"
                :rules="[rules.required, rules.max]"
              ></v-text-field>
              <v-combobox
                v-model="info.tag"
                :items="userTag"
                label="Tags"
                placeholder="at most 5 tags"
                prepend-icon="mdi-tag"
                :rules="[rules.max2, rules.empty]"
                multiple
                chips
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
              <v-textarea
                v-model="info.description"
                prepend-icon="mdi-subtitles"
                label="The Abstract"
                placeholder="no more than 400 characters"
                :rules="[rules.max1]"
              ></v-textarea>
            </v-col>
          </v-card>
        </base-info-card>                                  

      </v-form>                          
    </v-col>     
  </v-card>  
</template>

<script>
export default {
  name: 'EditInfo',
  props: {
    info: {
      type: Object,
      default: () => ({

      })
    }
  },
  data() {
    return {
      valid: true,
      rules: {
        required: v=> !!v || 'This field must not be empty.',
        max: v => !v || v.length<=200 || 'Maximum 200 characters.',
        max1: v => !v || v.length<=400 || 'Maximum 400 characters.',
        max2: v => !v || v.length<=5 || 'Maximum 5 tags.',
        empty: v => !v || v.filter(x=>!x.trim()).length==0 || 'Exist empty tags.',
        size: v => !v || v.size < 4000000 || 'Avatar size should be less than 4 MB.',
      },
      imageFile: null,
      userTag: [],
      originCoverImg: ''
    }
  },
   methods: {
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'some invalid fields in article information setting!', 'warn')
      return false
    },
    change(file) {
      if (this.valid) {
        if (file)
          this.info.coverImg = URL.createObjectURL(file);
        else
          this.info.coverImg = this.originCoverImg
      }
    },
    async getUserTags() {
      const [res, success]  = await this.$request.get("/api/user/tag/"+this.$store.getters.uid)
        .catch(err=>console.log(err))
      if (success) {
        this.userTag = res
      }
      else {
        if (res.status === 401)
          this.$router.push({ 'name': 'NotLogin' })
        else
          this.$emit('message', res.error.message || res.error, 'error')
      }
    },
    
  },
  mounted (){
    this.originCoverImg = this.info.coverImg
    this.getUserTags()
  },

}
</script>