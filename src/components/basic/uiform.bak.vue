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


          <!-- 富文本编辑器 https://www.cnblogs.com/bgwhite/p/10132972.html-->
          <div  v-if="item.type==='Editor'" style="display: inline-block;">
            <quill-editor class="editor" ref="myTextEditor" v-model="formdata[item.field]"
              :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
              @change="onEditorChange($event)">
            </quill-editor>
          </div>

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
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"], // 引用  代码块
              [{
                header: 1
              }, {
                header: 2
              }], // 1、2 级标题
              [{
                list: "ordered"
              }, {
                list: "bullet"
              }], // 有序、无序列表
              [{
                script: "sub"
              }, {
                script: "super"
              }], // 上标/下标
              [{
                indent: "-1"
              }, {
                indent: "+1"
              }], // 缩进
              // [{'direction': 'rtl'}],                         // 文本方向
              [{
                size: ["small", false, "large", "huge"]
              }], // 字体大小
              [{
                header: [1, 2, 3, 4, 5, 6, false]
              }], // 标题
              [{
                color: []
              }, {
                background: []
              }], // 字体颜色、字体背景颜色
              [{
                font: []
              }], // 字体种类
              [{
                align: []
              }], // 对齐方式
              ["clean"], // 清除文本格式
              ["link", "image", "video"] // 链接、图片、视频
            ],
          },
          placeholder: '请在这里添加文章内容', //提示
          readyOnly: false, //是否只读
          theme: 'snow', //主题 snow/bubble
        },
      };
    },
    components: {

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

      /*---------编辑器相关操作------------*/
      // 失去焦点
      onEditorBlur(editor) {},
      // 获得焦点
      onEditorFocus(editor) {},
      // 开始
      onEditorReady(editor) {},
      // 值发生变化
      onEditorChange(editor) {
        this.content = editor.html;
        // console.log(editor);
      },

    },
    beforeUpdate() {

    },
    mounted() {

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
  .editor {
    line-height: normal !important;
    height: 320px;
  }

  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }
</style>
