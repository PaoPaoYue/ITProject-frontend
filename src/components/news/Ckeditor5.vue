<template>
    <div >
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" color="black"></ckeditor>
        <div v-if="!saved" class="red--text">
            <v-row>
                    Status:Saving
                    <v-progress-circular
                    indeterminate
                    color="red"
                    ></v-progress-circular>
               
            </v-row>
        </div>
        <div v-else class="green--text">
            <v-row>
                <v-col cols="8"></v-col>
                <v-col cols="4">
                    Status:Saved
                    </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
    import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
    import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
    import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
    import Heading from '@ckeditor/ckeditor5-heading/src/heading';
    import List from '@ckeditor/ckeditor5-list/src/list';
    import Image from '@ckeditor/ckeditor5-image/src/image';
    import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
    import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
    import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
    import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
    import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
    import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
    import Table from '@ckeditor/ckeditor5-table/src/table';
    import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
    import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
    import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
    import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
    import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
    import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave'
    import Font from '@ckeditor/ckeditor5-font/src/font';
    import Code from '@ckeditor/ckeditor5-basic-styles/src/code';

    import Vue from 'vue';
    Vue.use( CKEditor );
    export default {
        name: 'Ckeditor5',
         data() {
             return {
            saved:true,
            editorData:'',
            editor: ClassicEditor,
        
            editorConfig:{
                plugins: [
                    EssentialsPlugin,
                    BoldPlugin,
                    ItalicPlugin,
                    LinkPlugin,
                    ParagraphPlugin,
                    CodeBlock,
                    Heading,
                    List,
                    Code,
                    Image,
                    ImageCaption,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    EasyImage,
                    ImageResize,
                    Table,
                    TableToolbar,
                    TableProperties,
                    TableCellProperties,
                    BlockQuote,
                    Autoformat,
                    Autosave,
                    Font,
                ],
                content:{
                    color: 'black'
                },
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'fontColor',
                        '|',
                        'undo',
                        'redo',
                        '|',
                        'imageUpload',
                        'codeblock',
                        'code',
                        'insertTable',
                        'blockQuote',
                    ]
                },
                table: {
                    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells','tableProperties', 'tableCellProperties' ]
                },
                cloudServices: {
                tokenUrl: 'https://75469.cke-cs.com/token/dev/11a01b58e0465a8165a30c3efd628757d7af81f8cc7f0b834366e13a10b6',
                uploadUrl: 'https://75469.cke-cs.com/easyimage/upload/'
                },
                image:{
                toolbar:[
                'imageStyle:full',
                'imageStyle:side',
                '|',
                'imageTextAlternative'
                ]
                },
                autosave: {
                waitingTime: 500,
                save( editor ) {
                    return new Promise(resolve => {
                        console.log(editor.getData())
                        resolve();
                        /*const [res, success] =this.$request.post("/api/user/updateblog", editor.getData()).catch(err=>{console.log(err)})
                        if(success){
                            console.log("Save success")
                            resolve()
                            changesaved();
                        }
                        else{
                            console.log("save failed")
                        }*/
                    })
                },
            },
            language: 'en'
        },
        computed: {
            changesaved: function () {
                this.saved=!this.saved
            },
        },
    }
    },
}
</script>
