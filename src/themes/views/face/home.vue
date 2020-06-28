<template>
   <div class="index">
       <el-card>
           <div slot="header" >
                <span>{{schoolName}}</span>
            </div>
           <el-form :inline="true"  class="demo-form-inline"> 
                         <!-- <el-form-item label="学段">
                            <el-select @change="getGradeList" v-model="stageId" placeholder="请选择">
                                <el-option label="请选择" value=""></el-option>
                                <el-option
                                v-for="item in stageList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="年级">
                            <el-select  v-model="gradeId" placeholder="请选择">
                                <el-option label="请选择" value=""></el-option>
                                <el-option
                                v-for="item in gradeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="query" type="primary" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                      >
                        <!-- <el-table-column
                        label="学段"
                        prop="stageName">
                        </el-table-column> -->
                         <el-table-column
                        label="年级"
                        prop="gradeName">
                        </el-table-column>
                         <el-table-column
                        label="班级"
                        prop="className">
                        </el-table-column>
                         <el-table-column
                        label="班级学生数"
                        prop="studentNumber">
                        </el-table-column>
                         <el-table-column
                        label="已采集"
                        prop="collectedNumber">
                        </el-table-column>
                         <el-table-column
                        label="未采集"
                        prop="notCollectedNumber">
                        </el-table-column>
                         <el-table-column label="操作"  align="center">
                            <template slot-scope="scope">
                                <el-button @click="toDetail(scope.row)" type="text">采集图片</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-p">
                        <el-pagination
                            :current-page="PageNum"
                            background
                            :page-size="PageSize"
                            layout="total,prev,pager,next,jumper"
                            :total="total"
                            @current-change="getClassList"
                        >
                        </el-pagination>
                    </div>
       </el-card>
   </div>
</template>

<script>
import cvueDialog from '@/components/cvue-dialog'
import {getStudentList, getClassList, getGradeList, getStageList} from '@/api/baseDataApi'
export default {
    components: {
        cvueDialog
    },
    computed: {
        selectStudentVisible () {
            return this.$store.state.stubed.selectStudentVisible
        },
          schoolId () {
           return this.$store.getters.schoolId
        },
         schoolName () {
             return this.$store.getters.schoolName
        },
        studentSelection () {
            return this.$store.state.stubed.studentSelection
        }
    },
    data () {
        return {
                PageNum: 1,
                PageSize: 10,
                tableData: [],
                total: 0,
                studentSelectionCopy: '',
                teachName: '',

                gradeId: '',
                gradeList: [],

                classId: '',
                classList: [],

                stageList: [],
                stageId: ''
            }
    },
    methods: { 
        query () {
            this.getClassList(1)
        },
        getStageList () {
            getStageList().then(res => {
                console.log(res)
                this.stageList = res
            })
        },
        getGradeList () {
            var params = {
                schoolId: this.schoolId
            }
            if (this.stageId) {
                params.stageId = this.stageId
            }
            getGradeList(params).then(res => {
                console.log(res)
                this.gradeList = res
            })
        },
        getClassList (num) {
            this.PageNum = num
            var params = {
                PageNum: this.PageNum,
                PageSize: this.PageSize,
                schoolId: this.schoolId
            }
            if (this.stageId) {
                params.stageId = this.stageId
            }
            if (this.gradeId) {
                params.gradeId = this.gradeId
            }
           
             this.tableData = []
            getClassList(params).then(res => {
                this.tableData = res.items
                this.total = res.totalCount
            })
        },
        toDetail (item) {
            this.$store.commit('face/setCurClass', item)
            this.$router.push('classDetail')
        }
    },
    mounted () {
       this.getGradeList()
       this.query()
    }
}
</script>
<style scoped>
.index{width:90%;margin: 0 auto;}
.man-list{
    height: 300px;
}
.man-item{
    border:1px solid #409EFF;
    padding: 5px 10px;
    color: #409EFF;
    margin: 10px 10px 0 0;
    display: inline-block;
    cursor: pointer;
}
.man-item.active{
    background: #409EFF;
    color: #fff;

}

.page-p{
    padding: 20px;
    text-align: right;
}
</style>
