<template>
<v-ons-page class="szTheme verita">
    <div class="background" style="background-color:#e9ebee"></div>

    <v-ons-toolbar>
        <div class="background"></div>
        <div class="left">
            <v-ons-back-button modifier="material"></v-ons-back-button>
        </div>
        <div class="center">상세보기</div>
        <div class="right" @click="close">닫기</div>
    </v-ons-toolbar>

    <div style="margin-top:15px;text-align:center;height:calc(100% - 15px);">
        <div class="detail_title" @click="directPayment">일산 안타까운 사연</div>

        <div class="card-item" style="width:100%;border:0;margin:8px 0px;border-radius:0;">
            <div style="float:left;margin-right:10px;border-radius:8px;overflow:hidden;"><img src="img/help.png" width="150"></div>
            <div style="text-align:left">
                <div class="header"><span>목표액</span> {{info.goal}} JAL = {{info.goal_eth}} ETH</div>
                <div class="header"><span>마감일</span> {{info.close}}</div>
                <div class="header"><span>돌격대</span> {{info.trooperCount}}명 신청됨, {{info.trooperSelect}} 선발예정</div>
                <div class="header"><span>모집액</span><b>{{info.fund}}</b> JAL, <b>{{info.backerCount}}</b>명이 후원했음</div>
                <div style="padding-left:160px;">
                    <v-ons-progress-bar :value="info.rate" secondary-value="100"></v-ons-progress-bar>
                </div>
            </div>
        </div>

        <div style="text-align:left;padding-left:15px;">
            <div class="tabButton" :class="{ active: (this.$data.tab == 0) }" @click="selectTab(0, $event)">내용</div>
            <div class="tabButton" :class="{ active: (this.$data.tab == 1) }" @click="selectTab(1, $event)">후원자</div>
            <div class="tabButton" :class="{ active: (this.$data.tab == 2) }" @click="selectTab(2, $event)">후기</div>
        </div>

        <div v-if="tab == 0" class="detail_tab">
            <div class="detail_content">
                <div class="sub-title">개요</div>
                <div>이번 후원은 XX에 방문하여 XX 하는 것입니다!</div>
                Logined: {{loginId}}
                <div class="sub-title">기부금 사용예정 항목</div>
                <div>기저귀 3박스, 분유 1박스</div>

                <div class="sub-title">기부금 사용예정 항목</div>
                <div>
ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ
                </div>

            </div>

        </div>

        <div v-if="tab == 1" class="detail_tab">
            <div class="detail_content" style="padding-left:15px;">
                <div v-for="user in backers" :key="user.id" class="row">
                    <div>{{user.name}}<span class="dol" v-if="user.applyTrooper" :class={confirmed:user.isTrooper}>돌격대</span></div>
                    <div><b>{{user.amount}}</b> JAL</div>
                    <div>{{user.date}}</div><div @click="openTrack(user.blockNumber)">{{user.blockNumber}}</div>
                </div>
            </div>
        </div>

        <div v-if="tab == 2" class="detail_tab">
            <div class="detail_content">
               <div class="sub-title">돌격대 정기영님 투척 후기</div>
               <div>2019년 9월 15일경 돌격대 10명과 함께 방문을 하였습니다.<br>갔다 왔는데 비가 많이 내렸는데도 불구하고 많은 분들이 참여해주셨어요.<br>일단 브이로그를 확인해주세요!</div>
            </div>
        </div>

        <div class="buttonBox" v-if="tab == 0">
            <ons-button v-if="gave == true" class="btn_give">이미 후원하셨습니다.</ons-button>
            <ons-button class="btn_give" @click="openGive"><i class="fa fa-seedling"></i>{{giveMessage}}</ons-button>
        </div>

        <div class="buttonBox" v-if="tab == 2">
            <ons-button class="btn_accept" @click="doAccept" :class="{ disabled: (this.accepted == true)}">인정!</ons-button>
            <ons-button class="btn_claim"  @click="doClaim" :class="{ disabled: (this.claimed == true)}">이건 좀...</ons-button>
        </div>

    </div>

    <v-ons-dialog :visible.sync="giveDialogVisible" modifier="verita">
        <div style="padding:20px 20px 15px 10px">
            <v-ons-list-item>
                <v-ons-input name="giver" v-model="form.giver" modifier="material underbar" placeholder="후원자명 (닉네임 가능)" float></v-ons-input>
            </v-ons-list-item>

            <v-ons-list-item>
                <v-ons-input name="amount" v-model="form.amount" modifier="material underbar" placeholder="후원수량" float></v-ons-input>
            </v-ons-list-item>

            <v-ons-list-item tappable>
                <label class="left">
                    <v-ons-checkbox input-id="checkbox-1" value="trooper" v-model="form.trooper"></v-ons-checkbox>
                </label>
                <label class="center" for="checkbox-1">돌격대 신청</label>
            </v-ons-list-item>

            <v-ons-list-item v-if="form.trooper">
                <v-ons-input name="name" v-model="name" modifier="material underbar" placeholder="이름" float></v-ons-input>
            </v-ons-list-item>

            <v-ons-list-item v-if="form.trooper">
                <v-ons-input name="phone" v-model="phone" modifier="material underbar" placeholder="연락받을 전화번호" float></v-ons-input>
            </v-ons-list-item>

            <div style="text-align:center;margin-top:10px;">
                <v-ons-button @click="closeGiveModal" class="dark" style="width:40%;margin-right:6px;">취소</v-ons-button>
                <v-ons-button style="width:40%;" @click="fireGive">후원</v-ons-button>
            </div>
        </div>
    </v-ons-dialog>

    <v-ons-dialog :visible.sync="trackDialogVisible" modifier="verita">
        <div style="padding:20px;width:340px;word-break:break-word;">
            <div class="txTitle">블록체인 기록정보</div>
            <div class="txField"><b>Block</b> {{track.blockNumber}}</div>
            <div class="txField"><b>Timestamp</b> {{track.timestamp}}</div>
            <div class="txField"><b>TxID</b> {{track.txid}}</div>
            <div class="txField"><b>To</b><br>{{track.to}}</div>
            <div class="txField"><b>From</b><br>{{track.from}}</div>
            <div class="txField" style="border-bottom:0;"><b>Values</b></div>
            <div class="txField" style="padding-bottom:10px;">
                <div v-for="parm of track.values" :key="parm.name"><b>{{parm[0]}}</b> = {{parm[1]}}</div>
            </div>
            <div style="text-align:center;margin-top:10px;">
                <v-ons-button @click="closeTrackModal" style="width:40%;margin-right:6px;">닫기</v-ons-button>
            </div>
        </div>
    </v-ons-dialog>

</v-ons-page>
</template>

<script>
const HOST = "http://192.168.43.82:8000"

const BOX_ABI = [{
    "name": "give",
    "constant": false,
    "inputs": [
        { "name": "projectId", "type": "uint16"},
        { "name": "name",   "type": "string"   },
        { "name": "amount", "type": "uint256"  },
        { "name": "applyTrooper", "type": "bool" }
    ],
    "outputs": [{ "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

export default {

props: ['target'],

data() {

    let cTags = []
    if (this.$props.target && this.$props.target.tags) {
        this.$props.target.tags.split(",").forEach( (tag)=>cTags.push({text:tag}) )
    }

    let atHome = this.$store.getters["xapp/existTag"](this.$props.target.id, 'home');
    let size   = (this.$props.target.size) ? this.$props.target.size : '10';

    let projectId = "0";

    return {

        projectId : projectId,

        timer: null, // 리플래시 타이머

        tab : 0,
        accepted : false,
        claimed  : false,
        gave     : false,

        info: {
            goal:     '-',
            goal_eth: '-',
            fund:     '-',
            close:    '-',
            trooperCount:  '-',
            trooperSelect: '-',
            backerCount:   '-',
            rate: 0
        },

        form: {
            giver:  '',
            amount: '',
            trooper: false,
            name:   '',
            phone:  ''
        },

        track: {
            to: '',
            from: '',
            txid: '',
            blockNumber: '',
            timestamp: '',
            values: []
        },

        backers: [],

        loginId: undefined,

        giveDialogVisible : false,
        trackDialogVisible: false,
        //------------------------------------------

        size: size
    }
},

mounted() {
    this.myInfo()
    this.getInfo()

    this.$data.timer = setInterval(()=>{
        this.getInfo()
    }, 5000)
},

beforeDestroy() {
    clearInterval(this.$data.timer)
},

computed: {
    giveMessage() {
        return (this.$data.gave) ? "한번더 후원하기" : "후원하기";
    },

    appliedTrooper() {
    }
},

methods: {

    getDate(stamp) {
        let t_date = new Date(parseInt(stamp)*1000)
        //return (t_date.getFullYear()+'').substr(2)+"월"+(t_date.getMonth()+1)+"월"+t_date.getDate()+"일";
        return (t_date.getMonth()+1)+"월 "+t_date.getDate()+"일";
    },

    getInfo() {
        console.log('called project');

        axios.get(HOST+"/project/"+this.$data.projectId).then(r => {

            this.$data.info.goal     = 100; //r.data.goal || 300;
            this.$data.info.goal_eth = (r.data.goal / 100).toFixed(1)
            this.$data.info.fund     = this.$core.price.setDecimal(r.data.fund, 18).toFixed(0)
            this.$data.info.trooperCount  = r.data.trooperCount
            this.$data.info.backerCount   = r.data.backerCount
            this.$data.info.trooperSelect = (r.data.trooperSelect == 0) ? '전원' : r.data.trooperSelect;

            if (this.$data.info.goal == 0)
                this.$data.info.rate = 100;
            else
                this.$data.info.rate = (parseFloat(this.$data.info.fund) / parseFloat(this.$data.info.goal))*100;

            this.$data.info.close = this.getDate(parseInt(r.data.date));
        })

        axios.get(HOST+"/project/"+this.$data.projectId+"/backers").then(r => {

            r.data.forEach(i => {
                i.amount = this.$core.price.setDecimal(i.amount, 18).toFixed(0)
                i.date = this.getDate(i.date)
            })

            this.$data.backers = r.data;
        })
    },

    fireGive() {

        let loginedId = "Kiyoung002";
        let acc = this.$store.state.coin.accounts[0];

        let buttons = [];
        buttons.push({ label : '[로그인 됨]' + loginedId, type:"REOA" })
        buttons.push({
            label     : `${acc.nick} <font style="float:right;padding-right:20px;">${acc.symbol} ${acc.address.substr(0,9)}</font>`,
            icon      : 'fa-ethereum',
            address   : acc.address,
            accountId : acc.id,
            accNick   : acc.nick,
            type      : "LEOA"
        })

        console.log('acc:', acc);

        buttons.push({ label : this.$i18n.tc("common.close"), icon  : 'fa-close' })

        this.$core.Sheet.open("지불할 계정을 선택하세요", buttons).then(r => {

            if (r == buttons.length - 1)
                return this.$core.alert("취소 되었습니다.");

            let targetObj = buttons[r.index];

            if (targetObj.type == "REOA") {

                return axios.post(HOST+"/project/"+this.$data.projectId+"/give", {
                    giver:   this.$data.form.giver,
                    amount:  this.$data.form.amount,
                    name:    this.$data.form.name,
                    trooper: this.$data.form.trooper,
                    phone:   this.$data.form.phone
                }).then(r => {

                    console.log('recv:', r.data)

                }).catch(err => {

                    console.log('error:', err)
                })

            } else if (targetObj.type == "LEOA") {

                //[TODO] 서버에서 가져와야 함.
                let contractAddr = "0x0b15Bffb75dc8a2C854f5E51F1426764Cfb24c9c";
                let fromAddr = targetObj.address;

                return this.$core.payment.confirm(fromAddr).then(r => {

                    return this.$core.luniWallet.sendMethod(contractAddr, BOX_ABI, "give",
                        fromAddr,
                        [ this.$data.projectId, this.$data.form.giver, String(this.$data.form.amount)+"000000000000000000", this.$data.form.trooper],
                        { gasPrice:0, gasLimit: 500000 }
                    ).then(r =>{
                        this.$core.alert("완료 되었습니다.");
                    }).catch(err => {
                        console.log('errr:', err);
                    })

                })
            }
        })

        this.$data.giveDialogVisible = false;

    },

    directPayment() {
        //let accInfo = this.$store.getters["coin/account"]("6s9Izg")
    },

    openGive()        { this.$data.giveDialogVisible = true   },
    closeGiveModal()  { this.$data.giveDialogVisible = false  },
    
    // 블록체인 트래킹 정보 표시 ----------------------------------------
    openTrack(blockNumber) {
        
        let url = (String(blockNumber).length < 16) ? 
                HOST+"/track/func/"+blockNumber :
                HOST+"/track/txfunc/"+blockNumber;
            
        this.$data.trackDialogVisible = true;
        
        axios.get(url).then(r => {
            this.$data.track.to   = r.data.to
            this.$data.track.from = r.data.from
            this.$data.track.blockNumber = r.data.blockNumber
            this.$data.track.txid = r.data.txid
            this.$data.track.timestamp = r.data.timestamp
            this.$data.track.values = _.entries(r.data.values);
        })

    },

    closeTrackModal() { this.$data.trackDialogVisible = false },


    close() { this.$core.goHome() },
    selectTab(num, event) { this.$data.tab = num },

    myInfo() {
        let token = localStorage.getItem("xapp_verita_key")
        if (!token) {
            this.$data.loginId = 'unlogined';
        }

        return axios.get(HOST+"/test/myinfo/",
            { headers: { Authorization: `Bearer ${token}` }}
        ).then(r => {
            this.$data.loginId = r.data.userid;
        })
    },

    doClaim() {
        this.$core.confirm("돌격대에게 추가 증명을 요구합니다.").then(r =>{
            if (r == 1) {
                this.$data.claimed = true;
            }
        })
    },

    doAccept() {
        this.$core.confirm("돌격대에게 지출정산에 동의합니다.<br>번복할 수 없습니다.").then(r =>{
            if (r == 1) {
                this.$data.accepted = true;
            }
        })
    },

    done() {
/*
        this.$core.Validation.check(this, [
        ]).then(success => {

            this.$store.commit("xapp/edit", {
                id: this.$props.target.id,
                size: this.$data.size
            })

            this.$core.alert("적용 되었습니다.")
        })
*/
    }

}
}
</script>