<template>
    <div id="app">
        <ckeditor  v-model="editorData" :config="editorConfig"></ckeditor>
        <input id="submitBtn" type="button" @click="save" value="save">
    </div>
</template>

<script>
import Vue from 'vue';
import CKEditor from 'ckeditor4-vue';
Vue.use( CKEditor );
    export default {
        name: 'app',
        data() {
            return {
                editorData: '',
                editorConfig: {
                extraPlugins: 'codesnippet,table,easyimage,markdown',
                codeSnippet_theme: 'tomorrow-night-eighties',
                removePlugins: 'image',
                cloudServices_tokenUrl: 'https://75469.cke-cs.com/token/dev/11a01b58e0465a8165a30c3efd628757d7af81f8cc7f0b834366e13a10b6',
                cloudServices_uploadUrl: 'https://75469.cke-cs.com/easyimage/upload/'
                }
            }
        },
        methods: {
            save(){
                console.log(this.editorData)
            }
        },
    }
</script>



