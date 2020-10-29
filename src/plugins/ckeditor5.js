import CKEditor from '@ckeditor/ckeditor5-vue';

import { CKEDITOR_TOKEN_URL, CKEDITOR_UPLOAD_URL } from '@/it-project.config'

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
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
Vue.use(CKEditor);

var editorConfig = {
    plugins: [
        EssentialsPlugin,
        Bold,
        Italic,
        Strikethrough,
        Underline,
        Link,
        Paragraph,
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
        content: {
        color: 'black'
    },
    toolbar: {
        items: [
            'heading',
            '|',
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            'code',
            'link',
            'strikethrough',
            'underline',
            'fontColor',
            '|',
            'blockQuote',
            'bulletedList',
            'numberedList',
            '|',
            'imageUpload',
            'codeblock',
            'insertTable',
        ],
            shouldNotGroupWhenFull: true
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    cloudServices: {
        tokenUrl: CKEDITOR_TOKEN_URL,
            uploadUrl: CKEDITOR_UPLOAD_URL
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
}

export {
    editorConfig, ClassicEditor
}
