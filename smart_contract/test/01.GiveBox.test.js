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
            '$id', '$amount', '$date', '$txid', 'applyTrooper', 'isTrooper', '*name'],  peoples)

        expect( data ).to.include.deep.members([
            {id:0, amount: 40000000000000000000, name:"정기영", date: data[0].date, applyTrooper: true, isTrooper: false, txid: 0}
        ])

    })


})

