module.exports={//node 导出使用module.exports，也可以exports。exports指向module.exports；即exports = module.exports
    devServer:{//VUE代理方式解决跨域问题
      host:"localhost",//主机
      port:8080,//端口
      proxy:{
       "/api":{//将www.exaple.com映射为/api
        target:"http://mall-pre.springboot.cn",//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin:true,  //是否跨域
          pathRewrite:{
            "/api":""// 重写接口 这里理解成用‘/api’代替target里面的地址，后面组件中我们调接口时直接用api代替 比如我要调用'http://localhost:8090/users'，直接写‘/api/users’即可
          }
       }
      }
    }
}
//一定要注意不可以和src写在一级目录
