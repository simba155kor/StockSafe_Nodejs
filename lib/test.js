function f1(str){
    var str2 ="";
    for(var a=1; a<str.length; a++)
    {
        if(str[a-1] !== '_') continue;
        str2 +=
//        console.log(str[a+1].toUpperCase());   
        str.replace(str[a], "변경할 문자열")
    }
    
    console.log(str);
}

f1("hello_ac");