
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
//import {Message} from 'element-ui';


function ajaxError(msg) {
    console.log(msg.status)
}


export function post(url,data){
    return new Promise((resolve,reject) => {
        $.ajax({
            url:url,
            type:'POST', //GET
            async:true,    //或false,是否异步
            data:data,
            timeout:3000,    //超时时间
            dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            beforeSend:function(xhr){
                console.log(xhr)
                console.log('发送前')
            },
            success:function(data,textStatus,jqXHR){
                resolve(data);
            },
            error:function(xhr,textStatus){
                ajaxError(xhr)
                console.log(textStatus)
            },
            complete:function(){
                console.log('结束')
            }
        })
    })
}



/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
    return new Promise((resolve,reject) => {
        $.ajax({
            type: "GET",
            url: url,
            data: params,
            dataType: "json",
            success: function(data){
                resolve(data);
            },
            error:function(xhr){
                ajaxError(xhr)
            }
        });

    })
}
