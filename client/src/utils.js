const makeTimer = (timer = 1000) => {
    return new Promise(resolve => setTimeout(resolve, timer))
 }
 // const makeTimer = (timer = 1000) => {
 //     return new Promise(function(res, rej) {
 //         setTimeout(() => {}, timer)
 //         res()
 //     })
 // }
  
 export default makeTimer