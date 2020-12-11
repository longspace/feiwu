<template>
  <div>
    <!-- https://blog.csdn.net/qq_28501497/article/details/109802739 -->
    <Editor
           api-key="no-api-key"
           :init="{
             height: 500,
             menubar: false,
             plugins: [
               'advlist autolink lists link image charmap print preview anchor',
               'searchreplace visualblocks code fullscreen',
               'insertdatetime media table paste code help wordcount'
             ],
             toolbar:
               'undo redo | styleselect | fontselect| bold italic  backcolor forecolor | \
                underline strikethrough  | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | link image| \
               advlist autolink lists charmap print preview|\
               searchreplace visualblocks code fullscreen|insertdatetime media table paste | wordcount help '
           }"
         />
  </div>
</template>
<script>
// import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
// import 'tinymce/themes/silver/theme'
// import 'tinymce/plugins/image'
// import 'tinymce/plugins/media'
// import 'tinymce/plugins/table'
// import 'tinymce/plugins/lists'
// import 'tinymce/plugins/contextmenu'
// import 'tinymce/plugins/wordcount'
// import 'tinymce/plugins/colorpicker'
// import 'tinymce/plugins/textcolor'
// import 'tinymce/themes/silver/theme.min.js' //引入富文本的主要脚本
// import lang from 'tinymce/langs/zh_CN.js'; //引用中文语言

// tinymce.addI18n('zh_CN', lang); //注册中文语言
// Vue.component('editor', Editor); //注册全局组件
 export default {
    props: {
      formcfg: {
        type: Object,
        default: () => {}
      },
      formdata: {
        type: Object,
        default: () => {}
      },
    },
    name: 'uieditor',
    data() {
      return {
        value:'',
        init: {
          language_url: '/static/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        }
      //   init: {
      //     language_url: '/static/tinymce/langs/zh_CN.js',
      //     language: 'zh_CN',
      //     skin_url: '/static/tinymce/skins/lightgray',
      //     height: 300,
      //     branding: false,
      //     menubar: false,
      //     //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
      //     //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
      //     images_upload_handler: (blobInfo, success, failure) => {
      //       const img = 'data:image/jpeg;base64,' + blobInfo.base64()
      //       success(img)
      //     },
      //   },
      //   myValue: this.value
      }
    },
    components: {Editor},
    methods: {

    },
    beforeUpdate() {

    },
    mounted() {
      // tinymce.init({})
    }
  };
</script>
<style lang="scss">
  .avatar-uploader>.ant-upload {
    width: 105px;
    height: 105px;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-form-item {
    margin-bottom: 10px;
  }
</style>
<style scoped lang="scss" rel="stylesheet/scss">
  // .formitem{ display: flex;}

</style>
