<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2 mx-auto"
  >

    <v-col cols="12" md="10" offset-md="1" class="pa-0 editor-wapper">
      <base-info-card title="Upload PDF" color="yellow">
        <v-card light class="px-4 py-6" rounded='xl' flat>
          <v-col cols="12" md="10" offset-md="1" class="pa-0">
            <base-body>
              <v-icon >mdi-alert-circle-outline</v-icon> 
              <span class="text-with-icon"> The pdf you upload can be viewed downloaded by any user or visitor of this website. Remember to save your changes.</span>
            </base-body>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
              <v-file-input
                show-size
                v-model="pdfFile"
                accept="application/pdf"
                label="Pick the upload pdf file"
                placeholder="accept pdf file size must be samller than 20MB"
                prepend-icon="mdi-file-pdf"
                :clearable="false"
                :rules="[rules.required, rules.size]"
                @change="change"
              ></v-file-input>
            </v-form>
            <v-row no-gutters justify="end" class="pb-6 px-2">  
              <div class="primary--text d-flex">
                Last Update: {{toDateTime(pdfContent.lastUpdate)}}
              </div>
            </v-row>
          </v-col>
        </v-card>
      </base-info-card>
      <base-info-card title="Preview" color="yellow">
        <v-card light class="px-4 py-6" rounded='xl' flat>
          <v-row align="center" style="height:300px">
            <v-col>
              <v-row no-gutters class="mb-4">
                <v-img v-if="!!fileUrl"
                  src="@/assets/pdf.svg"
                  height="100px"
                  contain
                />
                <v-img v-else
                  src="@/assets/unknown.svg"
                  height="100px"
                  contain
                />
              </v-row>
              <v-row no-gutters justify="center">
                <a v-if="!!fileUrl" :href="fileUrl" class="text-decoration-none primary--text" target="_blank" style="max-width:80%; text-align:center" >
                  <span class="text-with-icon text-decoration-underline">{{fileUrl}}</span>  
                  <v-icon small > mdi-download </v-icon>
                </a>
                <span v-else class="font-italic font-weight-medium text--secondary" v-html="'--&nbsp&nbsp&nbspNo PDF file selected&nbsp&nbsp&nbsp--'">
                </span>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </base-info-card>
    </v-col>
  </v-card>
</template>

<script>
import {toDateTime} from '@/utils/transform'

export default {
  name: 'EditPdf',

  props: {
    pdfContent: {
      type: Object,
      default: () => ({
        file: '',
        lastUpdate: new Date().getTime()
      })
    }
  },

  data() {
    return {
      loading: true,
      valid: true,
      rules: {
        required: v => !!v || !!this.fileUrl || 'This field must not be empty.',
        size: v => !v || v.size < 20000000 || 'pdf file size should be less than 20 MB.',
      },
      pdfFile: null,
      fileUrl: ''
    }
  },

  methods: {
    toDateTime,
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'no valid pdf selected!', 'warn')
      return false
    },
    change(file) {
      if (this.$refs.form.validate()) {
        this.fileUrl = URL.createObjectURL(file)
        this.pdfContent.file = this.fileUrl
        this.pdfContent.lastUpdate = new Date().getTime()
      }
    },
  },

  mounted() {
    this.loading = false
    this.fileUrl = this.pdfContent.file
  },

}
</script>
<style>


</style>
