<template>
   <div class="header-tags" style="position:relative;">
        <div class="tags-container">
            <div class="tags-box" ref="tagBox" @contextmenu.prevent.stop="handleContextmenu">
                <div class="tags-list" ref="tagList" @mousewheel="handleMouseWheel">
                    <div class="tag-item" 
                        :class="{'is-active':nowTagValue==item.value}"
                        :name="item.value"
                        v-for="(item,index) in tagList"
                        :key="index"
                        @click="openUrl(item)"
                        ref="tagsPageOpened">
                        <span class="icon-yuan tag-item-icon"></span>
                        <span class="tag-text">{{item.label}}</span>
                        <i class="el-icon-close tag-close" @click.stop="closeTag(item)" v-if="index>0"></i>
                    </div>
                </div>
                <!--<el-dropdown class="tags-menu pull-right">
                    <el-button type="primary" size="mini">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="closeOthersTags">关闭其他</el-dropdown-item>
                        <el-dropdown-item @click.native="closeAllTags">关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>-->
                <el-button class="tags-menu pull-right" @click="handleFullScreen">
                    <i class="fa fa fa-arrows-alt" v-if="isFullScreen==false"></i>
                    <i class="fa fa-compress" v-if="isFullScreen==true"></i>
                </el-button>
            </div>
        </div>
        <!--<el-card class="box-card right-menu" ref="rightMenu" v-show="show" @click.native.prevent.stop="closeOther">
            <div class="text item" @click.prevent.stop="closeOther">关闭其他</div>
            <div class="text item" @click.prevent.stop="closeOther">关闭全部</div>
        </el-card>-->
    </div>
</template>
<script>
import {getArrIndex} from '@/util/tool'
import {mapGetters} from 'vuex'
export default {
    name: 'RightTags',
    data () {
        return {
            show: false
        }
    },
    created () {
    },
    mounted () {
        var self = this
        document.onclick = function (event) {
          //  event.preventDefault()
           event.cancelBubble = true
           self.show = false
        }
    },
    updated () {
        
    },
    methods: {
        openUrl (item) {
            this.$router.push({
                path: item.value,
                query: item.query
            })
        },
        closeTag (item) {
            var i = getArrIndex(this.tagList, item.value)
            this.$store.commit('common/CLOSE_TAG', item, i)
            this.openUrl(this.tagList[i - 1])
        },
        handleMouseWheel (event) {
            var tagList = this.$refs.tagList
            var tagBox = this.$refs.tagBox
            var direction = event.wheelDelta || -event.detail
            var delta = Math.max(-1, Math.min(1, direction))
            var step = 50
            var leftWidth = isNaN(parseInt(tagList.style.left)) ? 0 : parseInt(tagList.style.left)
            var offsetWidth = tagBox.offsetWidth - tagList.offsetWidth
            if (delta < 0) { // 向下滚
                if (leftWidth - step < offsetWidth) {
                    if (offsetWidth > 0) {
                        tagList.style.left = 0 + 'px'
                    } else {
                        tagList.style.left = offsetWidth + 'px'
                    }
                } else {
                    tagList.style.left = leftWidth - step + 'px'
                }
            } else if (delta > 0) { // 向上滚
                if ((leftWidth + step) > 0) {
                    tagList.style.left = 0 + 'px'
                } else {
                    tagList.style.left = leftWidth + step + 'px'
                }
            }
        },
        handleContextmenu (event) {
            this.show = true
            var rightMenu = this.$refs.rightMenu.$el
            rightMenu.style.left = event.clientX - 230 + 'px'
        },
        closeOther () {
            console.log(456)
        },
        handleFullScreen () {
            this.$store.commit('common/SET_FULL_SCREEN')
        },
        closeAllTags () {
            this.$store.commit('common/CLOSE_ALL_TAG')
        }
    },
    computed: {
        nowTagValue: function () {
            return this.$route.path
        },
        ...mapGetters(['tagList', 'isFullScreen'])
    }
}
</script>
<style lang="scss">
.icon-yuan:before {
    width: 10px;
    height: 10px;
    background: #eee;
    display:inline-block;
    border-radius: 50%;
    content: ''
}
.tags-container .tag-item.is-active .icon-yuan:before {
    background: #409eff;
}
.tags-breadcrumb {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 50px;
}

.tags-breadcrumb-list {
    padding: 0 15px;
}

.tag-collapse {
    font-size: 36px !important;
}

.tag-collapse.tag-collapse_right {
    transform: rotate(90deg);
}
.header-tags{
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-top: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // padding: 0 20px;
  z-index:100;
}
.tags-container {
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    .tags-box {
        position: relative;
        box-sizing: border-box;
        padding-right: 106px;
        // overflow-x: auto;
        // overflow-y:hidden;
        width: 100%;
        height: 40px;
    }
    .tags-list {
        position: absolute;
        padding: 0px 10px;
        overflow: visible;
        white-space: nowrap;
        transition: left .3s ease;
    }
    .tag-item-icon {
        color: #eee;
        font-size: 11px !important;
    }
    .tag-item {
        position: relative;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        margin: 2px 4px 2px 0;
        padding: 0 10px;
        border: 1px solid #eee;
        border-radius: 3px!important;
        color: #495060!important;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
        margin-top: -1px;
        &.is-active {
            .tag-item-icon {
                color: #409eff;
            }
            border-color: #409eff;
        }
    }
    .tag-text {
        margin-left: 8px;
    }
    .tag-close {
        margin-left: 6px;
        padding: 2px;
    }
    .tag-close:hover {
        margin-left: 6px;
        background-color: #909399;
        color: #fff;
        border-radius: 50%;
        padding: 2px;
    }
    .tag-item:hover {
        opacity: .85;
    }
    .tags-menu {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        padding: 0 15px;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
        box-shadow: none;
        border-top: none;
        border-left-color: #f3f3f3;
        border-bottom-color: #eee;
    }
}
.contextmenu {
    margin: 0;
    top: 64px;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
        margin: 0;
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
}
.right-menu{
    position:absolute;
    left: 0;
    top: 40px;
    z-index: 8;
    width: 100px;
}
</style>
