<template>
  <div class="doone-table-wrap">
    <span ref="errorMsg" class="errorMsgNew">{{ errors }}&nbsp;&nbsp;</span>
    <div class="auto-table-wrap">
        <el-table :stripe="option.stripe"
                :width="option.width"
                :border="option.border"
                :class="cssClass"
                class="tb-base"
                :show-summary="isShowSummary"
                :summary-method="summaryFun"
                sum-text="当前页合计"
                :data="data"
                highlight-current-row
                @cell-mouse-enter="mouseEnterCell"
                @current-change="handleSelectionChange"
                @cell-click="focusCell">
        <!-- 复选框 -->
        <el-table-column type="selection" width="55"  v-if="option.selected"  align="center" header-align="center"></el-table-column>
        <!-- 序号 -->
        <el-table-column  type="index" :width="indexWidth" v-if="option.index" align="center" label="序号"></el-table-column>
        <!-- 循环列 -->
        <el-table-column :prop="cloumn.prop"
                        :label="cloumn.label"
                        :width="cloumn.width"
                        :align="cloumn.align"
                        :headerAlign="cloumn.headerAlign"
                        :key="cloumn.prop"
                        v-if="!cloumn.hide"
                        v-for="(cloumn,index) in option.cloumn" :render-header="renderHeader">
                <template slot-scope="scope">
                    <div class="cell-wrap">
                        <el-input type="textarea"
                                :maxlength = "cloumn.maxlength"
                                autosize class="fix-input"
                                v-if="cloumn.type == 'input'"
                                v-model.trim="scope.row[cloumn.prop]"
                                :disabled="handleDisabled(cloumn,option.other,scope.row.isFromProjectStage,scope.row.stageStatus,scope.row.isRelPaymentStage,scope.$index,data,scope.row.addTable,scope.row.actualFinishTime,scope.row.isRelSale,scope.row.rowStatus)"
                                @blur='validateCell($event,scope.$index,scope.row[cloumn.prop],cloumn.rules,cloumn.label,cloumn.isBlur,scope.row,cloumn.prop)'
                                @focus="converNumber(cloumn.isFocus,scope.row,cloumn.prop)"
                                v-focus="(index==0)?focusState:false" ></el-input>
                        <doone-input  v-if="cloumn.type == 'money'" 
                                      inputType="textarea"
                                      cssClass="fix-input"
                                      :autosize="true"
                                      :disabled="handleDisabled(cloumn,option.other,scope.row.isFromProjectStage,scope.row.stageStatus,scope.row.isRelPaymentStage,scope.$index,data,scope.row.addTable,scope.row.actualFinishTime,scope.row.isRelSale,scope.row.rowStatus)"
                                      @blur='validateCell($event,scope.$index,scope.row[cloumn.prop],cloumn.rules,cloumn.label,cloumn.isBlur,scope.row,cloumn.prop)'
                                      v-model="scope.row[cloumn.prop]"></doone-input>
                        <el-date-picker type="date"
                                        :picker-options="datePicker"
                                        class="focus-date"
                                        placeholder="选择日期"
                                        v-if="cloumn.type == 'date'"
                                        :disabled="handleDisabled(cloumn,option.other,scope.row.isFromProjectStage,scope.row.stageStatus,scope.row.isRelPaymentStage,scope.$index,data,scope.row.addTable,scope.row.actualFinishTime,scope.row.isRelSale,scope.row.rowStatus)"
                                        v-model="scope.row[cloumn.prop]"
                                        value-format="yyyy-MM-dd"
                                        style="width:100%"
                                        @blur='validateCell($event,scope.$index,scope.row[cloumn.prop],cloumn.rules,cloumn.label,cloumn.isBlur)'
                                        @change='handleChange(scope.$index,scope.row[cloumn.prop],cloumn.label,cloumn.name,"date",scope,cloumn.isBlur)'
                                        @focus="focusDate($event)" ></el-date-picker>
                        <el-date-picker
                            v-model="scope.row[cloumn.prop]"
                            type="daterange"
                            :disabled="handleDisabled(cloumn,option.other,scope.row.isFromProjectStage,scope.row.stageStatus,scope.row.isRelPaymentStage,scope.$index,data,scope.row.addTable)"
                            v-if="cloumn.type == 'daterange'"
                            @blur='validateCell($event,scope.$index,scope.row[cloumn.prop],cloumn.rules,cloumn.label,cloumn.isBlur)'
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        <!-- :title="(cloumn.value)[getArrIndex(cloumn.value,scope.row[cloumn.prop])].label"  -->
                        <el-select  placeholder="请选择"
                                    style="width:100%"
                                    class="focus-select"
                                    v-if="cloumn.type == 'select'"
                                    :disabled="handleDisabled(cloumn,option.other,scope.row.isFromProjectStage,scope.row.stageStatus,scope.row.isRelPaymentStage,scope.$index,data,scope.row.addTable,scope.row.actualFinishTime,scope.row.isRelSale,scope.row.rowStatus)" 
                                    :title= "scope.row[cloumn.prop]"
                                    @blur='validateCell($event,scope.$index,scope.row[cloumn.prop],cloumn.rules,cloumn.label)'
                                    @change='handleChange(scope.$index,scope.row[cloumn.prop],cloumn.label,cloumn.name,"select",scope,cloumn.isBlur)'
                                    @focus="focusSelect($event,scope)"
                                    v-model="scope.row[cloumn.prop]">
                            <el-option v-for="item in cloumn.value" :key="item.id" :label="item.label" :value="item.id" :disabled="cloumn.disabled"></el-option>
                        </el-select>
                        <el-switch v-model="scope.row[cloumn.prop]" v-if="cloumn.type == 'switch'" active-color="#13ce66" inactive-color="#dcdfe6" 
                                :disabled="handleDisabled(cloumn,option.other,scope.row.isFromProjectStage,scope.row.stageStatus,scope.row.isRelPaymentStage,scope.$index,data,scope.row.addTable,scope.row.actualFinishTime,scope.row.isRelSale,scope.row.rowStatus)" 
                                :active-value="1" :inactive-value="0"></el-switch>
                        <el-checkbox v-if="cloumn.type == 'checkBox'"  v-model="scope.row[cloumn.prop]" :disabled="cloumn.disabled" @change="handleCheckChange(scope.$index,data)">当条顺延</el-checkbox>
                        <slot v-if="cloumn.type == 'others'" name="others"></slot>
                        <!-- <slot :row="scope.row"
                        name="actionMenu"
                        :index="scope.$index"></slot> -->
                        <el-tooltip v-if="index==(option.cloumn.length-1)" class="item" effect="dark" content="删除本行" placement="top-end" v-show="isShowDel">
                            <div class="tbDelButton" @click.stop="delTable(scope.$index,data)">
                                <i class="el-icon-delete"></i>
                            </div>
                        </el-tooltip>
                        <!-- <el-tooltip class="item" effect="dark" content="保存本行" placement="bottom-end" v-if="index==(option.cloumn.length-1)">
                            <div class="tbSaveButton" @click="saveTableRow(scope.$index,data)">
                                <i class="fa fa-save"></i>
                            </div>
                        </el-tooltip> -->
                    </div>
                </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column fixed="right"
            v-if="option.actionMenu"
            label="操作"
            :align="option.actionMenuAlign"
            :header-align="option.actionMenuHeaderAlign"
            :width="option.actionMenuWidth">
            <template slot-scope="scope">
                <slot :row="scope.row"
                        name="actionMenu"
                        :index="scope.$index"></slot>
                <template v-if="option.actionMenu">
                    <el-button  v-show="!isShowDel&&isShowMenu" type="danger" icon="el-icon-delete" size="small"  @click="delTable(scope.$index,data)" class="ml-10">删除</el-button>
                </template>
            </template>
        </el-table-column>
        </el-table>
        <!-- 全部合计 -->
        <el-table  :show-header="false"
                    style="border-top: none;"
                    :width="option.width"
                    :border="option.border"
                    class="tb-total"
                    v-show="isShowTotalSummary"
                    :data="totalData">
            <el-table-column type="selection" width="55"  v-if="option.selected"  align="center" header-align="center">
                <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column  type="index" :width="indexWidth" v-show="option.index" align="center" label="编号">
                <template slot-scope="scope"><em v-show="isIndexTotal">全部合计</em></template>
            </el-table-column>
            <el-table-column :prop="cloumn.prop"
                            :label="cloumn.label"
                            :width="cloumn.width"
                            :key="index"
                            v-for="(cloumn,index) in option.cloumn">
                <template slot-scope="scope">
                    <div class="input-div1"
                        :gkey="cloumn.prop">{{scope.row[cloumn.prop]}}</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="page" v-show="isShowPage">
        <el-pagination
            :current-page="page.currentPage"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            layout="total,sizes,prev,pager,next,jumper"
            :total="page.total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
        </el-pagination>
    </div>
    <div class="table-addHandle" @click="addTableData" v-show="isShowAdd">
        <i class="el-icon-plus"></i>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import dooneInput from './doone-input'
export default {
  name:'dooneTable',
  components:{
      dooneInput
  },
  data(){
    return {
      focusState:false,
      errors:'',
      errrosMsg:[],
      Validator:{
          Require : /.+/,
          Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          Phone : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
          Mobile : /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
          Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
          IdCard : this.isIdCard,
          Currency : /^\d+(\.\d+)?$/,
          Number : /^\d+$/,
          Zip : /^[1-9]\d{5}$/,
          QQ : /^[1-9]\d{4,8}$/,
          Integer : /^[-\+]?\d+$/,
          Real:/^-?\d+\.?\d*$/,
          Date : function(value){
              return this.isDate(value)
          },
      },
      ValidatorMsg:{
          Require : '不能为空',
          Email : '邮箱格式不正确',
          Phone : '手机号码格式不正确',
          Mobile : '电话号码格式不正确',
          Url : '网址格式不正确',
          IdCard : '身份证号格式不正确',
          Currency : '货币格式不正确',
          Number : '数字格式不正确',
          Zip : '邮编格式不正确',
          QQ : 'QQ格式不正确',
          Integer : '只允许为数字',
          Real : '只允许为数字',
          Date:'时间格式不正确'
      }
    }
  },
  props:{
    isShowPage:{
        type:Boolean,
        default:false
    },
    page:{
        type:Object,
        default:()=>{
            return {}
        }
    },
    option:{
        type:Object,
        required:true,
        default:()=>{
            return {}
        }
    },
    data:{
        type:Array,
        required:true,
        default:()=>{
            return []
        }
    },
    totalData:{
        type:Array,
        default:()=>{
            return []
        }
    },
    cssClass:{
        type:String,
        default:''
    },
    isShowAdd:{
        type:Boolean,
        default:true
    },
    isShowDel:{
        type:Boolean,
        default:true
    },
    isIndexTotal:{
        type:Boolean,
        default:false
    },
    isShowSummary:{
        type:Boolean,
        default:false
    },
    isShowTotalSummary:{
        type:Boolean,
        default:false
    },
    summaryType:{
        type:Number,
        default:1
    },
    indexWidth:{
        type:Number,
        default:62
    },
    summaryFun:{
        type:Function,
        default:null
    },
    isShowMenu:{
        type:Boolean,
        default:false
    },
    datePicker:{
        type:Object,
        default:()=>{
            return {}
        }
    }
  },
  methods:{
    //当前日期之前不可选
    datePickerLimit(){
      let self = this;
      var curDate = new Date();
      var preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      return {
        disabledDate(time){
          return time.getTime() > preDate;
        }
      } 
    },
    handleSelectionChange(val){
        this.$emit('row-select',val)
    },
    handleDisabled(cloumn,other,isFromProjectStage,stageStatus,isRelPaymentStage,index,data,addTable,actualFinishTime,isRelSale,rowStatus){
        //合同约定的项目进度预计要求 合同视图
        if(other=='project'&&!cloumn.disabled&&!addTable){
            if(isFromProjectStage==1){
                return true
            }else{
                if(cloumn.prop=='isRelPaymentStage'){
                    return true
                }else if(cloumn.prop=='actualFinishTime'){
                    if(isRelPaymentStage==1){
                        return true
                    }else{
                        // console.log(actualFinishTime)
                        if(rowStatus==1){
                            return true
                        }else{
                            return false
                        }
                    }
                }else{
                    return true
                }
            }
        //合同约定的付款方式 合同视图
        }else if(other=='pay'&&!cloumn.disabled&&!addTable){
            if(isFromProjectStage==1){
                return true
            }else{
                if(stageStatus==0||stageStatus==undefined){
                    if(cloumn.prop=='stageAmount'){
                        return false
                    }else{
                        return true
                    }
                }else{
                    return true
                }
            }
        //新增合同
        }else if(other=='addProject'&&!cloumn.disabled&&!addTable){
            if(isFromProjectStage==1){
                if(cloumn.prop=='isRelPaymentStage'||cloumn.prop=='explainDesc'){
                    return false
                }else{
                    return true
                }
            }else{
              return cloumn.disabled
            }
        }else if(other=='alterProject'&&addTable){
            // console.log(cloumn.prop=='stageName')
            // if(cloumn.prop=='stageName'){
            //     return false
            // }else{
            //     return cloumn.disabled
            // }
            return false
        //新增阶段
        }else if(other=='addPhase'&&!cloumn.disabled&&!addTable){
            return true
        }else if(other=='purchaseProject'&&!cloumn.disabled&&!addTable){
            if(isRelSale==1){
                return true
            }else{
                if(cloumn.prop=='isRelPaymentStage'){
                    return true
                }else if(cloumn.prop=='actualFinishTime'){
                    if(isRelPaymentStage==1){
                        return true
                    }else{
                        // console.log(actualFinishTime)
                        if(rowStatus==1){
                            return true
                        }else{
                            return false
                        }
                    }
                }else{
                    return true
                }
            }
        }else{
            return cloumn.disabled
        }
    },
    handleCurrentChange(val){
         this.$emit('current-change',val)
    },
    handleSizeChange(val){
         this.$emit('size-change',val)
    },
    handleCheckChange(index,rows){
        this.$emit('check-change',index,rows)
    },
    renderHeader(h, { column, $index }){
        if(column.label=='自产或外购'){
            return (
                <span><i style="font-style:normal;margin-right:8px;">自产或外购</i>
                <el-tooltip placement="right-start" effect="dark">
                    <div slot="content">
                        <p><span>自产：自已研发生产为主，包含部份外包/外购内容；</span></p>
                        <p><span>外购：完全对外采购</span></p>
                    </div>
                    <i class="fa fa-info-circle"></i>
                </el-tooltip></span>
            )
        }else{
            return column.label
        }
    },
    mouseEnterCell(row, column, cell, event){
        if($(cell).find(".el-select").length>0){
            $(cell).find(".el-select").attr('title',$(cell).find(".el-input__inner").val())
        }
    },
    addTableData() {
        // this.data.push({addTable:true});
        var obj = {}
        for(var i =0;i<this.option.cloumn.length;i++){
            if(this.option.cloumn[i].label.indexOf('元')!='-1'){
                obj[this.option.cloumn[i].prop]= 0
            }else{
                obj[this.option.cloumn[i].prop]=''
            }
        }
        obj.addTable = true
        obj.opType = 1
        obj.isFromProjectStage = 0
        this.data.push(obj);
        this.focusState = true;
        // console.log(this.data)
    },
    delTable(index, rows) {
        // rows[index].opType = 0
        this.$emit('del-click',index,rows)
    },
    focusDate(event){
      this.removeBorder();
      $(event.$el).closest('td').addClass("fix-border")
    },
    focusSelect(event,scope){
      this.removeBorder();
      $(event.target).closest('td').addClass("fix-border")
    },
    focusCell(row, column, cell, event){
      this.removeBorder();
      $(cell).addClass('fix-border')
      if($(cell).find("textarea").length>0){
        $(cell).find("textarea").focus();
      }
      event.stopPropagation();
    },
    removeBorder(){
      $("td").removeClass("fix-border")
    },
    getSummaries(param,num) {
      //console.log(param)
    },
    getArrIndex(arr,value){
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==value){
                return i;
            }
        }
    },
    saveTableRow(index,rows,objDom) {
        var isValid = true
        var el = $(objDom).find(".el-table__row").eq(index).find(".cell-wrap")
        // console.log($(objDom))
        // console.log(this.option)
        for(let i=0;i<this.option.cloumn.length;i++){
            var rules = this.option.cloumn[i].rules
            var prop = this.option.cloumn[i].prop
            var label = this.option.cloumn[i].label
            var content = rows[index][prop]==undefined?'':rows[index][prop]
            if(!this.validate(content,rules,label)){
                el.eq(i).closest('td').css('boxShadow','0px 0px 1px red inset')
                isValid = false
            }
        }
        if(!isValid){
            return false
        }else{
            return true
        }
        // this.$emit('save-click',index,rows);
    },
    handleChange(index,content,label,name,type,scope,isBlur){
        var self = this;
        setTimeout(() => {
            if(type=='select'){
                if(self.validate(content,{Require:true},label)){
                    this.errors = ''
                    $(scope._self.$el).find(".el-table__row").eq(index).find("."+scope.column.id).removeAttr('style');
                }
            }else{
                if(self.validate(content,{Date:true},label)){
                    this.errors = ''
                    $(".focus-date").eq(index).closest('td').removeAttr('style');
                }
            }
        }, 1);
        if(isBlur){
          this.$emit('select-change',index,content,label,name);
        }    
    },
    validateCell(el,index,content,rules,label,isBlur,row,value) {
        if(isBlur){
          this.$emit('blur-trigger',el,index,row,value,content);
        }
        content=(content == undefined ?'':content);
        var obj = (typeof el.target=='undefined'?el.$el:el.target)
        // console.log(content)
        // console.log(rules)
        // console.log(label)
        // console.log(this.validate(content,rules,label))
        if(!this.validate(content,rules,label)){
           $(obj).closest('td').css('boxShadow','0px 0px 1px red inset')
        }else{
           $(obj).closest('td').removeAttr('style')
        }
    },
    converNumber(isFocus,row,value){
        if(isFocus){
          this.$emit('focus-trigger',row,value);
        }
    },
    validate:function(content,rules,label){
        content = content==null?'':content
        var valid = false;
        var msg = []
        for(var x in rules){
            if(x=='Date'){
                if(!this.isDate(content)){
                    // msg.push(label+this.ValidatorMsg[x])
                    // this.errrosMsg.push(label+this.ValidatorMsg[x])
                }
            }else if(!this.Validator[x].test(content)){
                msg.push(label+this.ValidatorMsg[x])
                this.errrosMsg.push(label+this.ValidatorMsg[x])
            }
        }
        var len = msg.length
        if(len>0){
            this.errors = msg.join(',');
            return false
        }else{
            this.errors = '';
            return true
        }
    },
    validTable(objDom,isNotZero) {
        this.errrosMsg=[];
        var self = this;
        var rows = this.data;
        // console.log(rows)
        var len = self.data.length;
        // if(len==0){
        //     this.errors = '数据不能为空';
        //     return true;
        // }
        if(isNotZero){
            if(len==0){
                this.errors = '数据不能为空';
                return false;
            }
        }else{
            if(len==0){
                return true;
            }
        }
        var isValid = true;
        for(let i=0;i<len;i++){
            if(!self.saveTableRow(i,rows,objDom)){
                isValid = false;
            }
        }
        if(!isValid){
            this.errors = self.unique(this.errrosMsg).join(',');
            return false
        }else{
            this.errors = '';
            return true
        }
    },
    //数组去重
    unique(arr){
        var newArr=[];
        for(var i=0;i<arr.length;i++){
            if(newArr.indexOf(arr[i])<0){
                newArr.push(arr[i])
            }
        }
        return newArr;
    },
    isIdCard : function(number){
        var date, Ai;
        var verify = "10x98765432";
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var area = ['','','','','','','','','','','','北京','天津','河北','山西','内蒙古','','','','','','辽宁','吉林','黑龙江','','','','','','','','上海','江苏','浙江','安微','福建','江西','山东','','','','河南','湖北','湖南','广东','广西','海南','','','','重庆','四川','贵州','云南','西藏','','','','','','','陕西','甘肃','青海','宁夏','新疆','','','','','','台湾','','','','','','','','','','香港','澳门','','','','','','','','','国外'];
        var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
        if(re == null) return false;
        if(re[1] >= area.length || area[re[1]] == "") return false;
        if(re[2].length == 12){
            Ai = number.substr(0, 17);
            date = [re[9], re[10], re[11]].join("-");
        }
        else{
            Ai = number.substr(0, 6) + "19" + number.substr(6);
            date = ["19" + re[4], re[5], re[6]].join("-");
        }
        if(!this.IsDate(date, "ymd")) return false;
        var sum = 0;
        for(var i = 0;i<=16;i++){
            sum += Ai.charAt(i) * Wi[i];
        }
        Ai +=  verify.charAt(sum%11);
        return (number.length ==15 || number.length == 18 && number == Ai);
    },
    isDate : function(op, formatString){
        formatString = formatString || "ymd";
        var m, year, month, day;
        switch(formatString){
            case "ymd" :
                m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
                if(m == null ) return false;
                day = m[6];
                month = m[5]*1;
                year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                break;
            case "dmy" :
                m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
                if(m == null ) return false;
                day = m[1];
                month = m[3]*1;
                year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
                break;
            default :
                break;
        }
        if(!parseInt(month)) return false;
        month = month==0 ?12:month;
        var date = new Date(year, month-1, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
        function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
    },
    limit : function(len,min, max){
        min = min || 0;
        max = max || Number.MAX_VALUE;
        return min <= len && len <= max;
    },
  },
  created() {
      var self = this;
      document.body.onclick = function(){
        self.removeBorder();
      }
  },
  mounted() {
  },
  updated(){
        // console.log("updated");
  }
}
</script>
<style lang="scss">
.doone-table-wrap{
   position: relative;
  .cell-wrap{
      background: transparent;
  }
  .el-table td{
      padding: 0px;
  }
  .el-textarea__inner{
    border: none;
    resize:none;
    background:transparent;
    border-radius: 0px;
    min-height: 39px!important;
    padding: 8px 10px;
    line-height: 25px;
    // height: auto!important;
  }
  td:first-child .cell{
    padding-left: 0px;
  }
  .fix-border{
    //border:1px solid #409EFF;
    box-shadow: inset 0px 0px 1px #409eff;
  }

  .fix-border-error{
    box-shadow: 0px 0px 1px red inset;
  }
  td .cell{
    padding-left: 0px;
    padding-right: 0px;
    margin:1px 1px 0px 1px;
  }
  .el-form-item__error{
    position: fixed;
    left: 280px;
    top: 120px;
    z-index: 22;
  }
  .el-input__inner{
    border: none;
    border-radius: 0px;
    background: transparent;
    // height: 41px;
    line-height: 41px;
  }
  .errorMsgNew{
    font-size: 12px;
    color: red;
    display:inline-block;
    min-height: 20px;
    line-height: 16px;
    position: absolute;
    // right: 0;
    // top:-24px;
    left: 0;
    bottom: -38px;
  }
  .table-addHandle {
    position: absolute;
    left: 50%;
    background: #409eff;
    color: #fff;
    width: 60px;
    height: 20px;
    border-radius: 0 0 30px 30px;
    text-align: center;
    line-height: 20px;
    margin-left: -30px;
    cursor: pointer;
  }
  .tbDelButton {
    position: absolute;
    right: 0px;
    top: -20px;
    background: #f56c6c;
    color: #fff;
    height: 20px;
    width: 20px;
    border-radius: 10px 0 10px 10px;
    cursor: pointer;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    transition: all 0.2s;
    z-index: -1;
  }

  .el-table__row:hover .tbDelButton {
    right: 0px;
    top: 0px;
    z-index: 0;
  }

  .tbSaveButton {
    position: absolute;
    right: 0px;
    bottom: -20px;
    background: #409eff;
    color: #fff;
    height: 20px;
    width: 20px;
    border-radius: 10px 10px 0px 10px;
    cursor: pointer;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    transition: all 0.2s;
  }

  .el-table__row:hover .tbSaveButton {
    right: 0px;
    bottom: 0px;
    z-index: 0;
  }
  .ml-10{
    margin-left: 10px;
  }
  .input-div1{
    text-indent: 10px;
  }
  .el-table__footer .is-leaf .cell{
    text-indent: 10px;
  }
  .el-table__footer .cell,.tb-total .cell{
    line-height: 40px;
    min-height: 40px;
  }
  .el-textarea.is-disabled .el-textarea__inner{
      background: transparent;
  }
  .el-input.is-disabled .el-input__inner{
      background: transparent;
  }
  .page{
      text-align:right;
      padding-top:15px;
      .el-input__inner{
          border-radius: 4px;
          border: 1px solid #dcdfe6;
      }
  }
  .el-range-input{background: transparent;color:#333;}
  .el-range-editor.is-disabled input{background: transparent;color:#333;}
}
</style>
