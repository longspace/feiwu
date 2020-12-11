<template>
  <div>
    <a-form :layout="formcfg.basecfg.formlayout" :label-col="formcfg.basecfg.labelcol" :wrapper-col="formcfg.basecfg.wrappercol">
      <template v-for='(item,index) in formcfg.data'>
        <a-form-item class="formitem" :label="item.label" :style="item.itemstyle?item.itemstyle:'' ">

          <!-- 输入框 -->
          <a-input allowClear v-if="item.type==='Input'" v-model="formdata[item.field]" allowClear :placeholder="item.placeholder"
            :style="item.style" :disabled="item.disabled">
            <a-icon slot="prefix" :type="item.icon" style="color: #bfbfc0;" />
          </a-input>

          <!-- 文本区域 -->
          <a-textarea allowClear v-if="item.type==='Textarea'" :auto-size="item.autosize" v-model="formdata[item.field]"
            allowClear :placeholder="item.placeholder" :style="item.style" :disabled="item.disabled" :rows="item.rows?item.rows:3">
            <a-icon slot="prefix" :type="item.icon" />
          </a-textarea>

          <!-- 下拉框 -->
          <a-select v-if="item.type==='Select'" default-value="" :show-search="item.showsearch?item.showsearch:false" :filter-option="item.filteroption" :style="item.style" v-model="formdata[item.field]"
            allowClear :placeholder="item.placeholder" :mode="item.mode?item.mode:'default'" @change="handleSelectChange">
            <a-icon v-if="item.icon" slot="prefix" :type="item.icon" />
            <a-select-option v-for="op in item.options" :label="op.label" :value="op.id" :key="op.id">{{op.label}}</a-select-option>
          </a-select>

          <!-- 级联下拉框 -->
          <a-cascader v-if="item.type==='Cascader'" :style="item.style" :options="item.options" :placeholder="item.placeholder" v-model="formdata[item.field]" @change="handleCascaderChange" :show-search="{ filter }"/>

          <!-- 树型选择控件 -->
          <a-tree-select v-if="item.type==='TreeSelect'" v-model="formdata[item.field]" treeDefaultExpandAll :style="item.style" :tree-data="item.options"
            :tree-checkable="item.checkable?item.checkable:false" show-checked-strategy="SHOW_PARENT"
            :placeholder="item.placeholder" :maxTagCount="item.maxTagCount?item.maxTagCount:2" allow-clear>
            <a-icon slot="prefix" type="smile" />
          </a-tree-select>

          <!-- Switch 开关 -->
          <a-switch v-if="item.type==='Switch'" v-model="formdata[item.field]" @change="onSwitchChange" />

          <!-- 复选框 -->
          <!-- <template v-if="item.type==='Checkbox'">
            <a-checkbox v-for="(items,i) in item.options" :value="items.value" :key="i" :checked="items.checked" v-model="formdata[item.field]" @change="item.handle" >{{items.label}}</a-checkbox>
          </template> -->

          <!-- 复选框组 -->
          <template v-if="item.type==='CheckboxGroup'">
            <a-checkbox-group v-model="formdata[item.field]" :options="item.options" @change="item.handle" />
          </template>



          <!-- 日期[时间可选]-->
          <a-date-picker v-if="item.type==='Date'" allowClear v-model="formdata[item.field]" :style="item.style"
            :placeholder="item.placeholder?placeholder:'选择日期'" show-time/>

          <!-- 日期范围-->
          <a-range-picker v-if="item.type==='DateRange'" :allowClear="item.allowClear == 1?false:true" v-model="formdata[item.field]" :style="item.style"
            :placeholder="item.placeholder?item.placeholder:['开始时间','结束时间']" />

          <!-- 单文件上传 -->
          <a-upload v-if="item.type==='Upload'" name="file" list-type="picture-card" class="avatar-uploader"
            :show-upload-list="false" :customRequest="item.handle" @change="handleUploadChange">
            <img v-if="formdata[item.field]" :src="formdata[item.field]" :style="item.style" alt="avatar" />
            <div v-else>
              <a-icon type="plus" />
              <div class="ant-upload-text">
                选择图片
              </div>
            </div>
          </a-upload>

          <!-- 多文件上传
              @preview="handleMultiPreview" -->
          <span v-if="item.type==='MultiUpload'">
            <a-upload
              action="#"
              list-type="picture-card"
              :file-list="formdata[item.field]"
              :customRequest="item.handle"
              :remove="item.remove"
              :multiple="item.multiple?item.multiple:false"
            >
              <div v-if="formdata[item.field].length < item.maxImgCount">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  选择图片
                </div>
              </div>
            </a-upload>
            <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal> -->
          </span>
          <editor v-if="item.type==='Editor'" ref="myTextEditor" id='tinymce' v-model='formdata[item.field]' :style="item.style" :init='editorinit'></editor>

        </a-form-item>
      </template>


      <div class="formitem ant-row ant-form-item" v-if="formcfg.basecfg.formbtn">
        <a-form-item>
          <div style="display: flex; padding-top: 4px;">
            <a-button v-for='item in formcfg.basecfg.formbtn' :key="item.key" :type="item.type" :icon="item.icon"
              :ghost="item.ghost" :style="item.style" @click="item.handle()">{{item.label}}</a-button>
          </div>
        </a-form-item>
    </div>
    </a-form>
  </div>
  </div>
</template>
<script>
  // import uieditor from "./uieditor.vue"

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
      formcfg: {
        type: Object,
        default: () => {}
      },
      formdata: {
        type: Object,
        default: () => {}
      },
    },
    name: 'uiform',
    data() {
      return {
        loading: false,
        editorinit: {
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
      };
    },
    components: {
      Editor
    },
    methods: {
      filter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
      },
      handleSelectChange(val) {
        console.log("handleSelectChange", val)
      },
      customRequest(info) {
        this.loading = true;
        let fd = new FormData();
        fd.append('file', info.file); //传文件
        // uploadSingleImg(fd)
        // .then(res=>{
        //   this.form.imageUrl = res.data.savename;
        //   this.form.url = res.data.url;
        //   this.loading = false;
        // })
        console.log(info)
      },
      handleUploadChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {

        }
      },
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.error('仅支持图片文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('图片不得大于2MB!');
        }
        return isJpgOrPng && isLt2M;
      },
      //多图上传
      handleMultiUploadChange({ fileList }) {
        // this.fileList = fileList;
        console.log("handleMultiUploadChange",fileList);
      },
      handleCascaderChange(val) {
        console.log("handleCascaderChange",val)
      },
      onSwitchChange(val) {
        console.log(val)
      },

      // 编辑器====================================================
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
    beforeUpdate() {

    },
    mounted() {
      tinymce.init({})
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

</style>
