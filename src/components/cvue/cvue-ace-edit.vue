<template>
    <div style="min-height:150px;width: 225px;"></div>
</template>
<<script>
export default {
    name: 'cvueAceEdit'，
    props:{
        content:{
            type:String
//            twoWay:true,
//            required:true
        },
        info:String,
        lang:String,
        theme:String,
        height:true,
        width:true
    },
    data:function(){
        return {
            editor:null,
            contentBackup:this.content
        }
    },
    watch:{
        content:function(val){
            if(this.contentBackup!=val)
                this.editor.setValue(val,1)
            this.contentBackup = val
        },
        contentBackup:function(val){
            this.$emit('update:content', val)
        }
    },
    mounted:function(){
        var vm=this;
        var lang=this.lang || 'text';
        var theme=this.theme||'chrome';
//        if(!init){
//            vm.$emit('initEdit');
//            init=true;
//        }
        var editor = vm.editor = ace.edit(this.$el);
        editor.$blockScrolling = Infinity;
        editor.setOption("enableEmmet", true);

        editor.getSession().setMode('ace/mode/'+lang);
        editor.setTheme('ace/theme/'+theme);

        editor.setValue(this.contentBackup,1);

        editor.on('change',function ($e) {
            vm.contentBackup = editor.getValue();
            vm.$emit('change',vm.contentBackup);
        });
//        ACEditor = ace.edit(this.$el);
//        ACEditor.setTheme("ace/theme/clouds");
//        ACEditor.getSession().setMode("ace/mode/javascript");
//        ACEditor.setFontSize(14);
        var self = this.$el
        editor.commands.addCommand({
            name: "fullscreen",
            bindKey: {win: "Ctrl-Enter", mac: "Command-Enter"},
            exec: function(editor) {
                var div =  self
                console.log(self)
                if(editor.isFullScreen) {
                   div.style.width = 150 + "px";
                   div.style.height = 230 + "px";
                   div.style.position = "absolute";
                   div.style.left = 150 + "px";
                   div.style.top = (400) + "px";
                   editor.resize();
                   editor.isFullScreen = false;
                   document.body.style.overflow = "auto";
                }
                else {
                   div.style.width = document.body.width+ "px";
                   div.style.height = document.body.height+ "px";
                   div.style.position = "absolute";
                   div.style.left = 0 + "px";
                   div.style.top = (400 + 0) + "px";
                   editor.resize();
                   editor.isFullScreen = true;
                   document.body.style.overflow = "hidden";
                }
            }
        });
    }
}
</script>>