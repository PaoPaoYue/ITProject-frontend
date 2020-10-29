<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2"
  > 
    <v-col cols="12" md="10" offset-md="1">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>

        <base-info-card title="Change Your Avatar" color="yellow">
          <v-card light class="px-4 py-6" rounded='xl' flat>
            
              <v-col cols="12" md="10" offset-md="1" class="pa-0">
                <v-row justify="center">
                  <v-avatar color="accent" size="128">
                    <v-img
                      :src=" avatar_m==='' ? require('@/assets/profile/defaultAvatar.jpg'): avatar_m "
                      alt="avatar"
                    />
                  </v-avatar>
                </v-row>
                <v-file-input
                  show-size
                  v-model="avatarFile"
                  accept="image/png, image/jpeg, image/bmp"
                  label="Pick a new avatar"
                  placeholder="accpet .png .jpeg .bmp, samller than 2MB"
                  prepend-icon="mdi-camera"
                  :rules="[rules.size]"
                  @change="change"
                ></v-file-input>
              </v-col>
          </v-card>
        </base-info-card>

        <base-info-card title="Personal Description" color="yellow">
          <v-card light class="px-4 py-6" rounded='xl'  flat>
            <v-col cols="12" md="10" offset-md="1" class="pa-0">
              <v-text-field
                v-model="displayName_m"
                prepend-icon="mdi-account-circle"
                label="Your Display Name"
                placeholder="no more than 50 characters"
                :rules="[rules.required, rules.max]"
              ></v-text-field>
              <v-text-field
                v-model="simpleDescription_m"
                prepend-icon="mdi-briefcase"
                label="Your Title (e.g. Job or Education Degree)"
                placeholder="no more than 50 characters"
                :rules="[rules.max]"
              ></v-text-field>
              <v-textarea
                v-model="description_m"
                prepend-icon="mdi-tooltip-text"
                label="Describe Yourself"
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
  name: 'EditBasic',

  props: {
    avatar: {
      type: String,
      default: ''
    },
    displayName: {
      type: String,
      default: ''
    },
    simpleDescription: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      valid: true,
      rules: {
        required: v=> !!v || 'This field must not be empty.',
        max: v => !v || v.length<=50 || 'Maximum 50 characters.',
        max1: v => !v || v.length<=400 || 'Maximum 400 characters.',
        size: v => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB.',
      },
      avatarFile: null,
      avatar_m: '',
      displayName_m: '',
      simpleDescription_m: '',
      description_m: '',
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'some invalid fields in basic setting!', 'warn')
      return false
    },
    change(file) {
      if (this.valid) {
        if (file)
          this.avatar_m = URL.createObjectURL(file);
        else
          this.avatar_m = this.avatar
      }
    }
    
  },


  mounted() {
    this.avatar_m = this.avatar
    this.displayName_m = this.displayName
    this.simpleDescription_m = this.simpleDescription
    this.description_m = this.description
  },
}
</script>
