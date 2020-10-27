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

        <base-info-card title="Change Password" color="yellow">
          <v-card light class="px-4 py-6" rounded='xl'  flat>
            <v-col cols="12" md="10" offset-md="1" class="pa-0">
              <base-body>
                <v-icon >mdi-alert-circle-outline</v-icon> 
                <span class="text-with-icon"> Your will need to use the new password the next time you login.</span>
              </base-body>

              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.min, rules.max, rules.password]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                hint="8-20 characters, at least one number and one letter"
                counter="20"
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                :rules="[rules.min, rules.max, checkConfirmPassword]"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                counter="20"
                @click:append="show2 = !show2"
              ></v-text-field>

            </v-col>
          </v-card>
        </base-info-card>
      </v-form>
    </v-col>
  </v-card>  
</template>

<script>

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)\w{8,20}$/

export default {
  name: 'EditPassword',

  data() {
    return {
      valid: true,
      rules: {
        min: v => !v || v.length>=3 || 'Minimum 3 characters.',
        max: v => !v || v.length<=20 || 'Maximum 20 characters.',
        password: v => !v || passwordPattern.test(v) || 'At least one letter and one digit, must not have other symbols except underscores.',
      },
      password:'',
      confirmPassword:'',
      show1:false,
      show2:false,
      
    }
  },


  methods: {
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'some invalid fields in password setting!', 'warn')
      return false
    },
    checkConfirmPassword (v) {
      return v === this.password || 'Must be the same as the first password, please check.'
    }
    
  },


}
</script>