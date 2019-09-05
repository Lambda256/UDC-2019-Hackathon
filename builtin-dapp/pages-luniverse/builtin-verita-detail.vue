<template>
<v-ons-page class="szTheme verita">
    <div class="background" style="background-color:#e9ebee"></div>

    <v-ons-toolbar>
        <div class="background"></div>
        <div class="left">
            <v-ons-back-button modifier="material"></v-ons-back-button>
        </div>
        <div class="center">진실의 입</div>
        <div class="right" @click="showPopover($event, 'down', true)">설정</div>
    </v-ons-toolbar>
    
    <div style="margin-top:0px;text-align:center;">
        <div class="title">오늘의 따뜻함</div>

        <div class="card-item" @click="goDetail(item.id)" v-for="item of mainItems" :key="item.id">
            <div style="float:left;margin-right:10px;overflow:hidden;"><img src="{{item.image}}" width="150" height="95" style="border-radius:8px;"></div>
            <div style="text-align:left">
                <div class="header">{{item.title}}</div>     
                <div class="header"><span>목표액</span> {{item.goal}} GIV</div>
                <div class="header"><span>마감일</span> 09.09</div>                
                <div class="header"><span>모집액</span><b>{{item.fund}}</b> GIV, <b>{{item.backerCount}}</b>명이 후원</div>
                <div style="padding-left:160px;">
                    <v-ons-progress-bar value="40" secondary-value="100"></v-ons-progress-bar>
                </div>
            </div>
        </div>

        <div style="padding: 30px;clear: both;color: #797979;font-size: 1.1em;">
            <div>주변에 작은 도움을 필요로 하는 사람이 있나요?</div>
            <div style="padding: 20px 20px 5px 20px;text-align: center;font-weight:bold;">제보하기</div>
        </div>

    </div>


    <v-ons-popover cancelable modifier="material" direction="down" :cover-target="true"
        :visible.sync="popoverVisible" :target="popoverTarget">

        <v-ons-list style="background-image:none;">
            <v-ons-list-item modifier="nodivider" ripple @click="goPage('setting')">
                <div class="center" style="justify-content: flex-end;">설정</div>
                <div class="right"><v-ons-icon fixed-width class="list-item__icon" icon="fa-sliders-h" style="color:#747475;"></v-ons-icon></div>
            </v-ons-list-item>
            <v-ons-list-item modifier="nodivider" ripple @click="toggleAtHome">
                <div class="center" style="justify-content: flex-end;">{{homeMessage}}</div>
                <div class="right"><v-ons-icon fixed-width class="list-item__icon" icon="fa-eye-slash" style="color:#747475;"></v-ons-icon></div>
            </v-ons-list-item>
            <v-ons-list-item modifier="nodivider" ripple @click="editTags">
                <div class="center" style="justify-content: flex-end;">그룹 설정</div>
                <div class="right"><v-ons-icon fixed-width class="list-item__icon" icon="fa-tags" style="color:#747475;"></v-ons-icon></div>
            </v-ons-list-item>
            <v-ons-list-item modifier="nodivider" ripple @click="closePopover">
                <div class="center" style="justify-content: flex-end;">닫기</div>
                <div class="right"><v-ons-icon fixed-width class="list-item__icon" icon="fa-close" style="color:#747475;"></v-ons-icon></div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-popover>

    <v-ons-dialog :visible.sync="editTags_show" modifier="edit-tag">
        <div style="text-align:center;padding:12px;">
            <div style="margin-bottom:15px;margin-top:5px;">
                그룹핑 태그를 입력하세요.
            </div>
            <div>
                <vue-tags-input v-model="compTag" :tags="compTags" placeholder="그룹 추가"
                @tags-changed="newTags => compTags = newTags" :save-on-key="[13, ',']" :separators="[',']" /><br>
            </div>
            <div>
                <v-ons-button @click="editTags_show = false" style="padding-left:20px;padding-right:20px;">취소</v-ons-button>
                <v-ons-button @click="saveEditTags" style="padding-left:20px;padding-right:20px;">확인</v-ons-button>
            </div>
        </div>
    </v-ons-dialog>

</v-ons-page>
</template>

<script>
const HOST = "http://192.168.43.82:8000"

export default {

props: ['target'],

data() {

    let cTags = []
    if (this.$props.target && this.$props.target.tags) {
        this.$props.target.tags.split(",").forEach( (tag)=>cTags.push({text:tag}) )
    }

    let atHome = this.$store.getters["xapp/existTag"](this.$props.target.id, 'home');
    let size   = (this.$props.target.size) ? this.$props.target.size : '10';

    return {
        mainItems: [],        
        slideIndex    : 0,         // 현재 슬라이드 인덱스
        slideLength   : 0,         // 슬라이드 길이
        tagSlideIndex : 0,         // 태그 슬라이드 길이

        size: size,
        popoverVisible   : false,
        popoverTarget    : null,

        atHome: atHome,
        homeMessage: (atHome) ? '홈에서 숨기기' : '홈에 보이게',

        compTag: '',     // 입력 중인 텍스트
        compTags: cTags, // 수정시 나올 어레이로 분리된 태그
        editTags_show: false
    }
},

mounted() {

    this.loadMainProject()
},

methods: {

    loadMainProject() {
        let images = ["img/girl.jpg", 'img/water.png','jangap.jpg'];

        axios.get(HOST+"/project/main").then(r => {            
            r.data.forEach( (i,idx) => {
                if (i.fund) 
                    i.fund = Web3.utils.fromWei(i.fund,'ether');
                if (i.goal) 
                    i.goal = Web3.utils.fromWei(i.goal,'ether');
                                                
                i.image = images[idx];
                
            })            
            this.$data.mainItems = r.data;            
        })

    },

    goDetail(num) {
        this.$core.push({component: 'builtin-verita-detail2', props: {
            target: num
        }})
    },

    set_size(v) {
        this.$data.size = v;
    },


    doLogin() {
        axios.post(HOST+"/login/", {
            email: 'test@test.com',
            password: 'test'
        }).then(r => {

            if (r.data && r.data.access_token) {
                localStorage.setItem("xapp_verita_key", r.data.access_token)
            }
            this.$core.alert("로그인 되었습니다.")
        })
    },

    //----------------------------------------------------------------
    // 메뉴 열기
    showPopover(event) {
        this.popoverTarget  = event
        this.popoverVisible = true
    },

    // 메뉴 닫기
    closePopover() {
        this.popoverVisible = false
    },

    editTags() {
        this.popoverVisible = false
        this.editTags_show  = true
    },

    saveEditTags() {
        let tagList = []
        this.$data.compTags.forEach(i => tagList.push(i.text) )

        this.$store.commit("xapp/edit", {
            id: this.$props.target.id,
            tags: tagList.join(",")
        })

        this.$store.commit("slot/updateTagArray")
        this.editTags_show = false;
    },

    // 홈에서 제거
    toggleAtHome() {
        this.closePopover()

        if (this.$data.atHome) {
            this.$core.confirm("홈에서 제거합니다").then(result => {
                if (result == 1) {
                    this.$store.commit("slot/setTags", { prim: 'XAPP', id: this.$props.target.id, tags:{ home: false }})
                    this.$core.pop();
                }
            })
        } else {
            this.$core.confirm("홈에 추가합니다").then(result => {
                if (result == 1) {
                    this.$store.commit("slot/setTags", { prim: 'XAPP', id: this.$props.target.id, tags:{ home: true }})
                    this.$core.pop();
                }
            })
        }
    },

    removeAtHome() {},

    // 페이지 이동
    goPage(item) {

        if (item == 'setting') {
            this.$core.push({component: 'sys-xapp-settings', props: {
                target: this.$props.target
            }})
        }

        this.popoverVisible = false
    },

    goSetup() {
        this.$core.push({component: "sys-fortune"});
        this.popoverVisible = false
    },

    leave() {
        this.$core.pop();
    },

    done() {

        this.$core.Validation.check(this, [
        ]).then(success => {

            this.$store.commit("xapp/edit", {
                id: this.$props.target.id,
                size: this.$data.size
            })

            this.$core.alert("적용 되었습니다.")
        })
    }

}
};
</script>

