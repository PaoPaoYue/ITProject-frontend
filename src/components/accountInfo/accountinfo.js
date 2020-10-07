import Vue from 'vue'
export async function getaccountinfo() {
    if(this.$store.getters.isLogin){
        const [res, success]  = await this.$request.get("/api/user/account/"+this.$store.getters.uid).catch(err=>{
        console.log(err)})
        if(success){
          var accountinfo={
            location :res.location,
            displayName: res.displayName,
            description:res.description,
            email:res.email,
            imgurl:res.avatar,
            simpleDescription:res.simpleDescription,
            phone:res.phone,
            contactFacebook:res.contactFacebook,
            contactLinkedin:res.contactLinkedin,
            contactGithub:res.contactGithub,
          }
          if(res.avatar==""){
            accountinfo.imgurl="https://imgtestbucket-1302787472.cos.ap-nanjing.myqcloud.com/defaultimg.jpg"
          }
          if(res.simpleDescription==""){
            accountinfo.simpleDescription="this guy is lazy, has not write anything"
          }
          if(res.description==""){
            accountinfo.description="this guy is lazy, has not write anything"
          }
          return accountinfo
        }
        else{
          console.log(res.data)
          alert("failed")
          return false
        }
      }
      else{
      alert('not log in , please log in')
      this.$router.push('Login')  
      }
}

export async function updateaccountinfo () {
  if(this.$store.getters.isLogin){
    let userinfo = {
      email:this.email,
      displayName:this.name,
      simpleDescription:this.description,
      description:"",
      avatar:this.imgurl,
      location:this.location,
      phone:"",
      contactFacebook:"",
      contactLinkedin:"",
      contactGithub:""
    }
    const [res, success]  = await this.$request.post("/api/user/account/update", userinfo).catch(err=>{
    console.log(err)
    })
    if (success) {
      this.info = 'success'
      this.userDetails = res
    }
    else {
        this.isloading=false
        console.log(res.error.code)
        console.log(res.error.message)
        alert('failed')
    }
    if(this.newpassword!=""){
      let changepass={
        password: this.newpassword
      }
    const [res, success]  = await this.$request.post("/api/user/password/update", changepass).catch(err=>{
    console.log(err)})
    if (success) {
      this.info = 'success'
    }
    else {
      if(res.status === 422){
        alert("new password cannot be the same as the old one")}
      else{
        console.log(res.error.code)
        console.log(res.error.message)
        alert('failed')
        }
      }
    }
  }
  else{
    alert("do not login, please log in first")
  }
}

var cos 

function getCos() {
  var COS = require('cos-js-sdk-v5')
  cos = new COS({
      getAuthorization: (options, callback)=>{
        Vue.prototype.$request.get('/api/cos/sts/img',null).then((res) => {
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
}

export function uploadFile() {
const file=document.getElementById('fileSelector').files[0];
Promise
  .all([getCos()]) 
  .then(() => {
    var bucketPath = `${this.$store.getters.uid}`; 
    putObject([bucketPath, file]);
  });
}
function putObject([key, file]) {
  cos.putObject({
      Bucket: 'imgtestbucket-1302787472', 
      Region: 'ap-nanjing', 
      Key: key, 
      StorageClass: 'STANDARD',
      Body: file,
  }, (err, data) => {
      if (data) {
        const url = cos.getObjectUrl({
          Bucket: 'imgtestbucket-1302787472',
          Region: 'ap-nanjing',
          Key: key,
      });
      var imgurl=url.replace("http","https")
      return imgurl
      }
      else {
        console.log(err)    
      }
  });
}