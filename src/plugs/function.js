//使用访求 
//import TrendFun from '../lib/function';
//trendFun.setCookie("test_cookie",'123456',10);
//let trendFun=new TrendFun(); //公共函数库
//console.log(trendFun.getCookie("test_cookie"));


export default class trendFun {

//  constructor() {
//         console.log("test ok:"+this.getCookie("test_cookie"));
// }
 test(){
     alert("test ok:"+this.getCookie("test_cookie"));
 }

//自动隐藏M站的头值
 autoHideTitle(visibility){
       //console.log("mt_header: start");
      let appVersion=this.getCookie("appVersion");
      if(appVersion){  //run in app
            //hide head
           // let mt_header=document.querySelector(".mint-header");
            let mt_header=document.getElementById("mt-header");
            //console.log(mt_header);
            if(mt_header){
                if(visibility==1){
                    mt_header.style.display="none"; //对于消息页面   autoHideTitle（1）调用   
                }else{      
                    mt_header.style.visibility="hidden";
                }
            }
            //读取当前页面的标题
            let title=document.querySelector("#mt-header>h1.mint-header-title").innerText;
            if(title){
                document.title=title;
            }

      }

 }

//向后台发送参数 公共部分
 __REQUEST(){

     let cookies=this.getNewCookie();
     let request={
        
        // "baseParams":{ //基础参数        
        //     "test":this.getCookie("test_cookie"),
        //     "platformId":this.getCookie("platformId"), //平台
        //     "deviceType":this.getCookie("deviceType"),
        //     "termSysVersion":this.getCookie("termSysVersion"), //系统版本号
        //     "termModel":this.getCookie("termModel"), //设备型号
        //     "termId":this.getCookie("termId"), //设备唯一标识
        //     "fingerPrint":this.getCookie("fingerPrint"), //设备指纹,可以为空
        //     "network":this.getCookie("network"), //网络,可以为空
        //     "networkOperator":this.getCookie("networkOperator"), //网络运营商,可以为空
        //     "majorAppVersion":this.getCookie("majorAppVersion"), //主APP版本号
        //     "appType":this.getCookie("appType"), //app类型,可以为空
        //     "appVersion":this.getCookie("appVersion"), //app版本号
        //     "pValue":this.getCookie("pValue"),//p值
        //     "locationProvince":this.getCookie("locationProvince"), //定位省
        //     "locateCity":this.getCookie("locateCity"),    //定位市
        //     "locateDistrict":this.getCookie("locateDistrict"),  //定位区

        //     "position": //定位信息,可以为空
        //     {
        //         "lon":this.getCookie("lon"), //经度
        //         "lat":this.getCookie("lat") //纬度
        //     }
        // },
        "clientTypeFlag":"h5",  //向后请求类型，后台将返回json格式
        "token":cookies["token"] || '',  //必填
        "phoneNumber":cookies["phoneNumber"] || '', //必填
        //"nickname":cookies["nickname"] || '', //昵称 
        // "timestamp":(new Date()).getTime(), //时间戳
        // "sign":this.getCookie("sign"), //签名
        
         //业务参数
        "bizParams":{},  //业务参数
    }

    return request;

}
 
 getNewCookie(){
     /*读取多个cookie的时候使用，一次性读取，然后统一处理 */
     let cookies=[];
     let vvv=document.cookie.split(";");
     let a; 
        vvv.forEach(function(e){
            //console.log(e.trim())
            a=e.trim().split("=");
            cookies[a[0]]=a[1];
        });    
    return cookies;
 }
  
getSingleCookie(name){
     /*只读取一个的时候使用 */     
     let vvv=document.cookie.split(";");
     let a; 
          for(let i=0;i<vvv.length;i++){
            //console.log(e.trim())            
            a=vvv[i].trim().split("=");
            if(a.length>1 && a[0]==name){
                //console.log("a1:"+a[1]);
                return a[1];
            }
           
        };    
    return '';
 }

 to_locale_time(date) {
	//var d="2013-08-20T09:55:57+00:00";
	if(!date) return '-';
	if(isNaN(Date.parse(date))){
		date=date.replace(/-/g,"\/").replace("T"," ").replace("+00:00","Z");
	}
	var date=Date.parse(date);
	var d = new Date(date);
    var pad = function(n, c){
        if((n = n + "").length < c){
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
	return d.getFullYear()+'/'+pad((d.getMonth()+1),2)+'/'+pad(d.getDate(),2)+' '+pad(d.getHours(),2)+':'+pad(d.getMinutes(),2)+':'+pad(d.getSeconds(),2);
}

/**
 * The same to php date function.
 * @param  {string} format    Y-m-d 
 * @param  {int}    timestamp  The length is 10 numbers. default is current time
 * @return {string}           
 * Exp: alert(date('Y-m-d','1350052653')); date('Y-m-d');
 */
 date(format, timestamp){
        var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
        var pad = function(n, c){
            if((n = n + "").length < c){
                return new Array(++c - n.length).join("0") + n;
            } else {
                return n;
            }
        };
        var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};
        var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var f = {
            // Day
            d: function(){return pad(f.j(), 2)},
            D: function(){return f.l().substr(0,3)},
            j: function(){return jsdate.getDate()},
            l: function(){return txt_weekdays[f.w()]},
            N: function(){return f.w() + 1},
            S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},
            w: function(){return jsdate.getDay()},
            z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},
        
            // Week
            W: function(){
                var a = f.z(), b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
                if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                    return 1;
                } else{
                    if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                        return date("W", Math.round(nd2.getTime()/1000));
                    } else{
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },
        
            // Month
            F: function(){return txt_months[f.n()]},
            m: function(){return pad(f.n(), 2)},
            M: function(){return f.F().substr(0,3)},
            n: function(){return jsdate.getMonth() + 1},
            t: function(){
                var n;
                if( (n = jsdate.getMonth() + 1) == 2 ){
                    return 28 + f.L();
                } else{
                    if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                        return 31;
                    } else{
                        return 30;
                    }
                }
            },
        
            // Year
            L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},
            //o not supported yet
            Y: function(){return jsdate.getFullYear()},
            y: function(){return (jsdate.getFullYear() + "").slice(2)},
        
            // Time
            a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},
            A: function(){return f.a().toUpperCase()},
            B: function(){
                // peter paul koch:
                var off = (jsdate.getTimezoneOffset() + 60)*60;
                var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds/86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = "00"+beat;
                if ((String(beat)).length == 2) beat = "0"+beat;
                return beat;
            },
            g: function(){return jsdate.getHours() % 12 || 12},
            G: function(){return jsdate.getHours()},
            h: function(){return pad(f.g(), 2)},
            H: function(){return pad(jsdate.getHours(), 2)},
            i: function(){return pad(jsdate.getMinutes(), 2)},
            s: function(){return pad(jsdate.getSeconds(), 2)},
            //u not supported yet
        
            // Timezone
            //e not supported yet
            //I not supported yet
            O: function(){
                var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
                if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
                return t;
            },
            P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},
            //T not supported yet
            //Z not supported yet
        
            // Full Date/Time
            c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},
            //r not supported yet
            U: function(){return Math.round(jsdate.getTime()/1000)}
        };
       
        return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
            let ret;
            if( t!=s ){
                // escaped
                ret = s;
            } else if( f[s] ){
                // a date function exists
                ret = f[s]();
            } else{
                // nothing special
                ret = s;
            }
            return ret;
        });
    }

    //replace string
    replaceRevStr(str){
            var str=str;
            if(str=="") return "";
            //var regObj = {"&lt;":"<","&gt;":">"};
            var regObj = {"<":"&lt;",">":"&gt;"};
            for(var reg in regObj){
                str = str.replace(new RegExp(reg,"g"),regObj[reg]);
            }
            return str;
    }

    replaceStr(str){
            var str=str;
            if(str=="") return "";
            var regObj = {"&lt;":"<","&gt;":">"};
            //var regObj = {"<":"&lt;",">":"&gt;"};
            for(var reg in regObj){
                str = str.replace(new RegExp(reg,"g"),regObj[reg]);
            }
            return str;
    }
    //****cookie setting**/
   //write cookie
   setCookie(NameOfCookie, value, expiredays){ 
        var ExpireDate = new Date (); 
        ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000)); 
       // document.cookie = NameOfCookie + "=" + escape(value) +  ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString()+"; secure;path=/"); 
       //1 secure属性 当设置为true时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该信息，所以不会被窃取到Cookie 的具体内容。
       document.cookie = NameOfCookie + "=" + escape(value) +  ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString()+"; path=/"); 
    }
   getCookie(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        //console.log('GetCookie in:'+clen);
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg)
            return this.GetCookieVal (j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    }    
    //不对用户暴出
    GetCookieVal(offset) {         
        var endstr = document.cookie.indexOf (";", offset);
        if (endstr == -1) {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    }

    deleteCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 24 * 3600*1000);
        var cval=GetCookie(name);
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+"; path=/";
    };


    number_format(number, decimals, dec_point, thousands_sep,roundtag) {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    roundtag = roundtag || "floor"; //"ceil","floor","round"
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
 
            var k = Math.pow(10, prec);
            console.log();
 
            return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec*2))).toFixed(prec*2)) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }
 
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}  

    /**
     * 获取当前URL参数值
     * @param name	参数名称
     * @return	参数值
     */
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null)
            return unescape(r[2]);
        return '';

    }

      /**
     * 返回一个随机数
     * @param Min,Max	参数名称
     * @return	Min,Max之间一个整数
     */
    GetRandomNum(Min,Max){   
        let Range = Max - Min;   
        let Rand = Math.random();   
        return (Min + Math.round(Rand * Range));   
    }

    

}