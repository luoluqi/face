/* eslint-disable */
export default{
    set(cname, cvalue, exdays) {
        
        var d = new Date();
        if(!exdays){
            exdays=3;
        }
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    
    get(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
             }
            if (c.indexOf(name)  == 0) {
                return c.substring(name.length, c.length);
             }
        }
        return "";
    },

    clear() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        console.log("key:" + keys);
        if(keys) {
            for(var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
    
   
}

