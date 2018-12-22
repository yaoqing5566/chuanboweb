<template>
  <div>
    <textarea id="idCkEditor" name="idCkEditor" v-model="p_desc"></textarea>
  </div>
</template>


<script>
  export default {
    props: ["p_desc"],
    data() {
      return {
        editContent: ''
      }
    },
    computed: {},
    watch: {
      p_desc(newData, oldData){
//        this.$nextTick(() => {
//          this.editContent.setData(newData);
//        })

      }
    },
    methods: {
      getContentHtml(){
        return this.editContent.getData();
      },
    },
    created(){
        var that=this;
      this.$nextTick(() => {
        this.editContent = CKEDITOR.replace('idCkEditor', {
          toolbar: [
            ['Source', '-', 'DocProps', 'Preview', '-'],
            ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
            ['FontSize', 'Font', 'TextColor', 'BGColor', 'Image', 'editorupload'],
          ],
          height: 400,
          on: {
            instanceReady: function (evt) {
              var editor = evt.editor;
              editor.setData(that.p_desc);
            }
          }
        });
        //自定义事件
        CKEDITOR.instances["idCkEditor"].on("instanceReady", function () {
          this.addCommand("image", {
            modes: {
              wysiwyg: 1,
              source: 1
            },
            exec: function (editor) {
              var input = $("<input type='file' name='file' />");
              input.click();
              input.fileupload({
                dataType: "json",
                url: "/Views/fileUpload.aspx",
                async: true,
                change: function (e, data) {
                  //console.log("data", data);
                  var files = data.files;
                  for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    //console.log(file.size)
//                            if (!/\.(jpg|png|jpeg|gif)$/i.test(file.name)) {
//                                showErrorAlert("文件格式错误");
//                                return false;
//                         }
                  }
                  return true;
                },
                start: function () {
                },
                done: function (e, data) {
                  console.log(data.result.data.url);
                  var htmlToInsert = "";
                  htmlToInsert += "<img  src='" + data.result.data.url + "'>";
                  editor.insertHtml(htmlToInsert);
                },
                fail: function (e, data) {
                  console.log(e);
                }
              })


            }
          });
        });


      })


    },

  }
</script>
