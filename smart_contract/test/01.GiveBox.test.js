const { BN, balance, ether, expectRevert, time, constants, expectEvent } = require('openzeppelin-test-helpers')
const { ZERO_ADDRESS } = constants
const { expect } = require('chai')
const lxUtil = require('../util/util_for_test.js')
const balanceTracker = lxUtil.balanceTracker;
//-----------------------------------------------------------
const GiveToken = artifacts.require('GiveToken')
const GiveBox   = artifacts.require('GiveBox')

//-----------------------------------------------------------

contract('Give Box', function ([sender, user1, user2, hacker, hogoo]) {

    // 초기 셋팅
    before(async function () {
        this.token = await GiveToken.deployed({ from: sender })
        this.box   = await GiveBox.deployed({ from: sender })
    })

    // 테스트 수행전 잔고 확인
    beforeEach(async function () {

        this.bals = {
            sender : await balanceTracker(this.token, sender),
            user1  : await balanceTracker(this.token, user1),
            user2  : await balanceTracker(this.token, user2),
            hacker : await balanceTracker(this.token, hacker),
            hogoo  : await balanceTracker(this.token, hogoo),
            box    : await balanceTracker(this.token, this.box.address)
        }

    })

    it('생성자 테스트', async function () {
        //expect( await this.token.name()     ).to.equal('Give Token')
        //expect( await this.token.symbol()   ).to.equal('GIV')
        //expect( await this.token.decimals() ).to.be.bignumber.equal('18')
    })


    it('토큰 배분 테스트', async function () {

        // 컨트랙트 오너가 토큰 뿌림.
        await this.token.transfer(user1, ether("150"), {from:sender} )
        await this.token.transfer(user2, ether("70"),  {from:sender} )

        // 잔고 확인
        //expect( await this.token.balanceOf(user1) ).to.be.bignumber.equal( ether("150") )
        //expect( await this.token.balanceOf(user2) ).to.be.bignumber.equal( ether("70")  )

        expect( await this.bals.user1.delta() ).to.be.bignumber.equal( ether("150") )
        expect( await this.bals.user2.delta() ).to.be.bignumber.equal( ether("70") )

    })


    it('토큰과 컨트랙트 연동 테스트', async function () {

        // BOX 컨트랙트에 지불할 토큰 연결.
        await this.box.setToken(this.token.address, {from: sender })
        expect( await this.box.tokenContract() ).to.be.equal(this.token.address)

        // 토큰 컨트랙트에 TransferFrom 권한용 관리자 추가.
        await this.token.addWhitelistAdmin(this.box.address)
        expect( await this.token.isWhitelistAdmin(this.box.address) ).to.be.equal( true )

    })


    it('권한없는 토큰 연동 테스트', async function () {

        // 권한 없는 놈이 토큰을 지정할 수 없어야 한다.
        await expectRevert(
            this.box.setToken(this.token.address, {from: hacker })
            , "WhitelistAdminRole: caller does not have the WhitelistAdmin role")

    })


    it('프로젝트 등록 테스트', async function () {

        await this.box.addProject("테스트 프로젝트")

        let proj = await this.box.getProject("0")

        expect( proj.title ).to.be.equal("테스트 프로젝트")
    })


    it('기부 테스트', async function () {

        await this.box.give(0, "정기영", ether("40"), true, {from: user1})

        let proj = await this.box.getProject("0")

        expect( proj.fund ).to.be.bignumber.equal( ether("40") )
        expect( proj.trooperCount ).to.be.bignumber.equal( "1" )
        expect( proj.backerCount ).to.be.bignumber.equal( "1" )

        // 유저 계좌에서 토큰 감소 확인
        expect( await this.bals.user1.delta() ).to.be.bignumber.equal( ether("-40") )

        // 기부 컨트랙트에 토큰 증가 확인.
        expect( await this.bals.box.delta() ).to.be.bignumber.equal( ether("40") )
    })


    it('기부 2명째 테스트', async function () {

        //expect( await this.token.balanceOf(user2) ).to.be.bignumber.equal( ether("70") )

        await this.box.give(0, "익명", ether("10"), false, {from: user2})

        let proj = await this.box.getProject("0")

        expect( proj.fund ).to.be.bignumber.equal( ether("50") )
        expect( proj.trooperCount ).to.be.bignumber.equal( "1" )
        expect( proj.backerCount ).to.be.bignumber.equal( "2" )

        // 유저 계좌에서 토큰 감소 확인
        expect( await this.bals.user2.delta() ).to.be.bignumber.equal( ether("-10") )

        // 기부 컨트랙트에 토큰 증가 확인
        expect( await this.bals.box.delta() ).to.be.bignumber.equal( ether("10") )
    })

    it('기부자 목록 테스트', async function () {

        let peoples = await this.box.getBackers(0);
        
        let data = lxUtil.toStructArray( [
            '$id', '$amount', '$date', '$blockNumber', 'applyTrooper', 'isTrooper', '*name'],  peoples)
            
        expect( data ).to.include.deep.members([
            {id:0, amount: 40000000000000000000, name:"정기영", date: data[0].date, blockNumber: data[0].blockNumber, applyTrooper: true, isTrooper: false}
        ])

    })

    it('기부자 주소 목록 테스트', async function () { 

        let addrs = await this.box.getBackersAddrs(0);        
        let data = lxUtil.toStructArray( ['addr', '$blockNumber'],  addrs)

        expect( data.length ).to.be.equal(2)
        
    })
    
    it('프로젝트 내용 및 옵션 변경 테스트', async function () { 
        
        let nowStamp = Date.now();

        await this.box.editProjectContent(0, "제목 수정됨", "내용 수정됨");
        await this.box.editProjectOptions(0, ether("300"), nowStamp, 8)
        
        let projContent = await this.box.getProjectContent(0);
        let proj = await this.box.getProject(0);
        
        expect( projContent ).to.be.equal( "내용 수정됨")
        
        expect( proj.goal ).to.be.bignumber.equal( ether("300") )
        expect( proj.date ).to.be.bignumber.equal( nowStamp.toString() )
        expect( proj.trooperSelect ).to.be.bignumber.equal( "8" )
                
    })

    it('인출 테스트', async function () { 

        // 프로젝트 마감 후 인출 테스트 
        await this.box.withdraw(0, "done!", user2)
        
        // 유저 계좌에서 증가 확인
        expect( await this.bals.user2.delta() ).to.be.bignumber.equal( ether("50") )                
        
        // closes에 계정 남았나 확인.
        let c = await this.box.getClosing(0);        
        expect( c.withdrawAddr ).to.be.equal( user2 )        
    })

    it('권한 없는 인출 테스트', async function () { 
        
        await expectRevert(
            this.box.withdraw(0, 'done!', hacker, {from:hacker})
            , "WhitelistAdminRole: caller does not have the WhitelistAdmin role")
            
    })

    it('리뷰 등록 및 조회', async function () { 
        
        await this.box.addReview(0, "정기영", "잘 다녀왔슴미다")

        let r = await this.box.getReview(0, 0)
        console.log(r);
        
    })

    it('후기 투표', async function () { 
        
        expect( await this.box.isBackerVoted(0, user1) ).to.be.equal( false )  
        
        let cc = await this.box.getClosing(0)        
        expect( cc.acceptCount ).to.be.bignumber.equal( "0" )
        expect( cc.claimCount ).to.be.bignumber.equal( "0" )
        
        await this.box.vote(0, true)

        cc = await this.box.getClosing(0)
        expect( cc.acceptCount ).to.be.bignumber.equal( "1" )
        expect( cc.claimCount ).to.be.bignumber.equal( "0" )
        
        expect( await this.box.isBackerVoted(0, user1) ).to.be.equal( true )  

    })
    
    
})

