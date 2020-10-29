<template>
  <div >
    <ckeditor :editor="editor" v-model="blogContent.text" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
  import {editorConfig, ClassicEditor} from '@/plugins/ckeditor5'
  
  export default {
    name: 'Ckeditor5',
    props: {
      blogContent: {
        type: Object,
        default: () => ({})
      },
      save: {
        type: Function,
        default: (editor) => {
          return new Promise((resolve) => {
            console.log(editor.getData())
            resolve();
          })
        }
      }
    },

    data: function() { 
      editorConfig.autosave = {
        waitingTime: 1000,
        save: this.save
      }
      return {
        editor: ClassicEditor,   
        editorConfig,
        language: 'en'
    }},

  }

</script>
