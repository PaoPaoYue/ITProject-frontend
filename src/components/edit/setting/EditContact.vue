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

        <base-info-card title="Personal Contact Information" color="yellow">
          <v-card light class="px-4 py-6" rounded='xl' flat>
              <v-col cols="12" md="10" offset-md="1" class="pa-0">
                <base-body>
                  <v-icon >mdi-alert-circle-outline</v-icon> 
                  <span class="text-with-icon"> Your email will be display on your personal profile page as a link. While we will keep your phone secret. We will use both your email and phone for contacting you personally.</span>
                </base-body>
                <v-text-field
                  v-model="email_m"
                  prepend-icon="mdi-email"
                  label="Your Email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-row no-gutters>
                  <v-icon class="d-none d-md-flex mr-2"> mdi-phone </v-icon>
                  
                  <vue-tel-input-vuetify
                    class="flex-grow-1"
                    v-model="phone_m"
                    label="Your Phone"
                    :rules="[rules.max]"
                  ></vue-tel-input-vuetify>
                </v-row>
              </v-col>
          </v-card>
        </base-info-card>

        <base-info-card title="Social Media" color="yellow">
          <v-card light class="px-4 py-6" rounded='xl'  flat>
            <v-col cols="12" md="10" offset-md="1" class="pa-0">
              <base-body>
                <v-icon >mdi-alert-circle-outline</v-icon> 
                <span class="text-with-icon"> We will generate a link on your profile page directing to your social media. You can leave these fields blank if you don't want to conntect to your social media.</span>
              </base-body>
              <v-text-field
                v-model="facebook"
                prepend-icon="mdi-facebook"
                label="Facebook Link"
                placeholder="your home page address"
                prefix="https://www.facebook.com/"
                :rules="[rules.max_url]"
              ></v-text-field>
              <v-text-field
                v-model="linkedin"
                prepend-icon="mdi-linkedin"
                label="Linkedin Link"
                placeholder="your home page address"
                prefix="https://www.linkedin.com/"
                :rules="[rules.max_url]"
              ></v-text-field>
              <v-text-field
                v-model="github"
                prepend-icon="mdi-github"
                label="Github Link"
                placeholder="your home page address"
                prefix="https://github.com/"
                :rules="[rules.max_url]"
              ></v-text-field>
            </v-col>
          </v-card>
        </base-info-card>
      </v-form>
    </v-col>
  </v-card>  
</template>

<script>

const emailPattern   = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const prefix = {
  facebook:"https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/"
}

export default {
  name: 'EditContact',

  components: {
    VueTelInputVuetify : () => import('vue-tel-input-vuetify/lib/vue-tel-input-vuetify')
  },

  props: {
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    contactFacebook: {
      type: String,
      default: ''
    },
    contactLinkedin: {
      type: String,
      default: ''
    },
    contactGithub: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      valid: true,
      rules: {
        required: v=> !!v || 'This field must not be empty.',
        max: v => !v || v.length<=40 || 'Maximum 40 characters.',
        max_url: v => !v || v.length<=2083 || 'The URL is too long',
        email:v => emailPattern.test(v) || 'Invalid e-mail.',
      },
      email_m: '',
      phone_m: '',
      facebook: '',
      linkedin: '',
      github: '',
      
    }
  },

  computed: {
    contactFacebook_m: {
      get: function() {
        return this.facebook? prefix.facebook + this.facebook: ''
      },
      set: function(val) {
        this.facebook = val? val.replace(prefix.facebook, ''): ''
      }
    },
    contactLinkedin_m: {
      get: function() {
        return this.linkedin? prefix.linkedin + this.linkedin: ''
      },
      set: function(val) {
        this.linkedin = val? val.replace(prefix.linkedin, ''): ''
      }
    },
    contactGithub_m: {
      get: function() {
        return this.github? prefix.github + this.github: ''
      },
      set: function(val) {
        this.github = val? val.replace(prefix.github, ''): ''
      }
    },
  },

  methods: {
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'some invalid fields in contact setting!', 'warn')
      return false
    }
    
  },

  mounted() {
    this.email_m = this.email
    this.phone_m = this.phone
    this.contactFacebook_m = this.contactFacebook
    this.contactLinkedin_m = this.contactLinkedin
    this.contactGithub_m = this.contactGithub
  },

}
</script>