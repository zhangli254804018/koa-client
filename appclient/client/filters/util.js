 //時間格式 value時間戳 type 返回的時間格式 如 yyyy-MM-dd
 export const formaTime = (value, type) => {
     if (!value) return null
     var time = value.toString().length > 10 ? new Date(parseInt(value)) : new Date(parseInt(value) * 1000)
     var formatTime = type ? type : 'yyyy-MM-dd'
     var date = {
         "M+": time.getMonth() + 1,
         "d+": time.getDate(),
         "h+": time.getHours(),
         "m+": time.getMinutes(),
         "s+": time.getSeconds(),
         "q+": Math.floor((time.getMonth() + 3) / 3),
         "S+": time.getMilliseconds()
     };
     if (/(y+)/i.test(formatTime)) {
         formatTime = formatTime.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
     }
     for (var k in date) {
         if (new RegExp("(" + k + ")").test(formatTime)) {
             formatTime = formatTime.replace(RegExp.$1, RegExp.$1.length == 1 ?
                 date[k] : ("00" + date[k]).substr(("" + date[k]).length));
         }
     }
     return formatTime;
 }

 //延遲請求執行事件 delayBounce(callback,500)
 export const delayBounce = (action, idle) => {
     function delayBounces() {
         var ctx = this,
             args = arguments
         clearTimeout(delayBounceContainer)
         delayBounceContainer = setTimeout(function() {
             action.apply(ctx, args)
         }, idle)
     }
     return delayBounces()
 }

 export const delaySetInterval = (action, idle) => {
     function delaysetinterval() {
         var _setInterval = 'r' + _.now();
         var _fn = function() {
             var ctx = this,
                 args = arguments;
             action.apply(ctx, args);
         };
         _fn();
         clearInterval(_setInterval);
         _setInterval = setInterval(_fn,
             idle ? idle : 60 * 3 * 1000);
     }
     return delaysetinterval()
 }