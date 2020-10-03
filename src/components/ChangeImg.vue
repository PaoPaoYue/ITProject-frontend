<template>
<v-container class="mt-16 max-width=240 "
      justify="center">
      <v-row
      class="mb-1"
      no-gutters
    >
<v-col cols="12" sm="3">
      </v-col>
      <v-col cols="12" sm="6">
     <v-row justify="center">
    <v-avatar color="indigo" size="100">
       <img
          :src= "imgurl"
          alt="John"
        >
      </v-avatar>
     </v-row>
     <br>
    <input id="fileSelector"  ref="fileUpload" type="file" name="filename">
		<input id="submitBtn" type="button" @click="uploadFile" value="submit">
    
</v-col>
<v-col cols="12" sm="3">
      </v-col>
</v-row>
</v-container>
</template>

<script src="./cos-js-sdk-v5.min.js"></script>
<script type="text/javascript">

export default {
  name: 'ChangeImg',
  data(){
    return{
      imgurl: require('../assets/defaultimg.jpg')
    }  
  },
  methods:{
getCos() {
    var COS = require('cos-js-sdk-v5')
    this.cosClient = new COS({
        getAuthorization: (options, callback) => {
        // 异步获取临时密钥
        
          this.$request.get('/api/cos/sts/img').then((res) => {
            if (res[1]) {
              callback({
                TmpSecretId: res[0].credentials.tmpSecretId,
                TmpSecretKey: res[0].credentials.tmpSecretKey,
                XCosSecurityToken: res[0].credentials.sessionToken,
                StartTime: res[0].startTime,
                ExpiredTime: res[0].expiredTime,
              });
            }
          }).catch(() => {
            this.loading = false;
          });
        },
    });
},
uploadFile() {
  var d = new Date();
  var n = d.toString();
  const file=document.getElementById('fileSelector').files[0];
  Promise
    .all([this.getCos()]) // 获取文件的md5
    .then((md5) => {

      this.bucketPath = `${this.$store.getters.uid}`; // Key: 对象键（Object 的名称），对象在存储桶中的唯一标识
      this.putObject([this.bucketPath, file]);
    });
},
putObject([key, file]) {
    // 简单上传文件
    this.cosClient.putObject({
        Bucket: 'imgtestbucket-1302787472', // 存储桶名称，必须;Bucket 格式：test-1250000000
        Region: 'ap-nanjing', // 存储桶所在地域, 必须
        Key: key, /* 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
    }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // 获取url
          const url = this.cosClient.getObjectUrl({
            Bucket: 'imgtestbucket-1302787472',
            Region: 'ap-nanjing',
            Key: key,
          });
          console.log(url);
          alert(url) // 有效可访问url生成
        }
    });
},
}
}	
	</script>