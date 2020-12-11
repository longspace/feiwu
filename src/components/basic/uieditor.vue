<template>
  <div class='tinymce'>
    <editor id='tinymce' v-model='bodycontent' :init='init'></editor>
    <!-- <div v-html='tinymceHtml'></div> -->
  </div>
</template>

<script>
import {uploadSingleImg} from "@/utils/http/index.js"
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  props: {
    content: {
      type: String,
      default: () => { return ""}
    },
  },
  watch:{
    content(val){
        tinymce.activeEditor.setContent("aaaaaaaaaaaa"+val);
    }
  },
  name: 'tinymce',
  data () {
    return {
      bodycontent: '',
      init: {
        language_url: '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image media code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image media code | removeformat',
        branding: false,// 去水印
        menubar: false, // 隐藏最上方menu
        elementpath: false, // 隐藏底栏的元素路径
        // images_upload_url: '/upload/file/tinymce', //  图片上传地址
        file_picker_callback: (callback, value, meta) => {
           this.open(callback, value, meta)
        },
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure);
        },
        // setup: function(editor) {
        //     editor.on('input change undo redo execCommand KeyUp', function(e) {
        //       console.log("editor.getContent()",editor.getContent())
        //         // this.$emit('input', editor.getContent());
        //     })
        // }
      }
    }
  },
  methods:{
    handleImgUpload(blobInfo, success, failure){
        const formData = new FormData();
        formData.append('file', blobInfo.blob());
        uploadSingleImg(formData).then(res => {
            if (res.data.code == 1) {
                let file = res.data.url;
                success(res.data.url);
                return
            }
            failure('上传失败')
        }).catch(() => {
            failure('上传出错')
        })
    },
    open(callback, value, meta){
      if (meta.filetype == 'media') {
        let input = document.createElement('input');//创建一个隐藏的input
        input.setAttribute('type', 'file');
        let that = this;
        input.onchange = function(){
            let file = this.files[0];//选取第一个文件
            that.uploadVideo(file,'media'); // 上传视频拿到url
            console.log('dongbug',that.options.uploaded)
            setTimeout(()=>{
                  if(that.options.uploaded){
                    console.log(that.resVideo,'true')
                    callback(that.resVideo) //将url显示在弹框输入框中
                  }else{
                setTimeout(()=>{
                    //设置几秒后再去取数据
                    console.log(that.resVideo,'false')
                    callback(this.resVideo)
                },5000)
            }
          },5000)
        }

        //触发点击
        input.click();
        }
    },

     // 插入视频的方法
    uploadVideo(file,type){
        const formdate = new FormData()
        formdate.set('file',file)
        console.log(formdate)
        uploadOss(formdate).then(response =>{
          if (response.code == 200) {
              if(type == 'media') {
                    this.resVideo = response.url
                    this.options.uploaded = true
                }
              console.log('dsdsdoooooooo', this.options.uploaded)
          }
          })
        },


    // 插入图片的方法
    handleImageAdded(blobInfo, success, failure) {
      console.log('图片',blobInfo.blob())
      let file = blobInfo.blob()
      const isLt8M = file.size / 1024 / 1024 < 20
      if (!isLt8M) {
        this.$message.error('图片大小不能超过 20MB!')
        return
      }
     const formdate = new FormData()
     formdate.set('file',blobInfo.blob())
     console.log('图片',formdate)
     uploadOss(formdate).then(response =>{
      if (response.code == 200) {
            let url = response.url
            success(url)
          } else {
            failure(response.message)
            this.$message.error(response.message)
          }
     })
    },
    async info() {  //回显内容
      console.log(this.mubanId)
      let { data } = await getDetail({
        templateId: this.mubanId
      })
      this.content = data
    },



  },
  mounted () {
    // this.bodycontent = this.content
    tinymce.init({})
  },
  components: {Editor}
}
</script>
