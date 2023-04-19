export default function (obj){
 return new Promise((res,rej)=>{
   uni.request({
    ...obj,
      success(re) {
        res(re)
      },
      fail(err){
        rej(err)
      }
    })
 })
}