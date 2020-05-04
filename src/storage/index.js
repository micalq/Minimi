//封装storage
const STORAGE_KEY="mall";
export default{
  setItem(key,value,module_name){//存储
    if (module_name) {
      let val=this.getItem(module_name);
      val[key]=value;
      this.setItem(module_name,val)
    }else{
      let val=this.getStorage()
      val[key]=value
      window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    }
  },
  getItem(key,module_name){//读取某一项
    if (module_name) {  //如果模块名存在获取模块名再返回值  username:"小球"
      let val=this.getItem(module_name);
      if(val) return val[key];
    }else{
    return  this.getStorage()[key];//不存在直接返回值
    }
  },
  getStorage(){//读取全部值
   return JSON.parse(window.sessionStorage.getItem("mall")||"{}")
  },
  clear(key,module_name){//清除
    let val=this.getStorage()
    if (module_name) { //如果模块名存在则一起删除了
      delete val[module_name][key]
    }else{
      delete val[key]//不存在直接删除值
    }
    window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))//重新存储值
  }
}
