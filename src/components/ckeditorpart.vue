<template>
    <div id="app">
        <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
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
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                extraPlugins: 'codesnippet,table,language',
                toolbar:[
                    { name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
                    { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
                    { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
                    { name: 'forms', items: [ 'Form','Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
                    '/',
                    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
                    { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
                    { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
                    '/',
                    { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
                    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                    { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
                    { name: 'code', items: [ 'codesnippet','language','table' ] }
                    ]
                }
            }
        }
    }
</script>



