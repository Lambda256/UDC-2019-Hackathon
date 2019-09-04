const { BN, balance, ether, expectRevert, time, constants, expectEvent } = require('openzeppelin-test-helpers')
const { ZERO_ADDRESS } = constants
const { expect } = require('chai')

//-----------------------------------------------------------
const GiveToken = artifacts.require('GiveToken')

//-----------------------------------------------------------

contract('Give Token', function ([sender, user1, user2, hacker, hogoo]) {

    // 초기 셋팅
    before(async function () {
        this.token = await GiveToken.deployed({ from: sender })
    })

    it('생성자 테스트', async function () {
        expect( await this.token.name()     ).to.equal('Give Token')
        expect( await this.token.symbol()   ).to.equal('GIV')
        expect( await this.token.decimals() ).to.be.bignumber.equal('18')
    })

    it('초기 코인 생성량 확인', async function () {
        let totalSupply = await this.token.totalSupply()

        expect( totalSupply ).to.be.bignumber.equal( ether("10000") )
        expect( await this.token.balanceOf(sender) ).to.be.bignumber.equal( totalSupply )
    })

    it('토큰 전송 테스트', async function () {
        // 컨트랙트 오너가 토큰 뿌림.
        await this.token.transfer(user1, ether("150"), {from:sender} )
        await this.token.transfer(user2, ether("70"),  {from:sender} )

        // 잔고 확인
        expect( await this.token.balanceOf(user1) ).to.be.bignumber.equal( ether("150") )
        expect( await this.token.balanceOf(user2) ).to.be.bignumber.equal( ether("70")  )
    })

    it('권한없는 위임전송 케이스', async function () {

        // 전송전 잔고 채크
        expect( await this.token.balanceOf(user1) ).to.be.bignumber.equal( ether("150") )
        expect( await this.token.balanceOf(user2) ).to.be.bignumber.equal( ether("70") )

        // 권한이 없는 유저 hogoo가 transferFrom으로 이체 시도시 allowance 차감 부분에서 에러 발생되어야 함.
        await expectRevert(
            this.token.transferFrom(user1, user2, ether("10"), { from: hacker }),
            "SafeMath: subtraction overflow -- Reason given: SafeMath: subtraction overflow.")
    })

    it('승인된 위임전송 케이스', async function () {

        // 전송전 잔고 채크
        expect( await this.token.balanceOf(user1) ).to.be.bignumber.equal( ether("150") )
        expect( await this.token.balanceOf(user2) ).to.be.bignumber.equal( ether("70") )

        // 30개 허가
        await this.token.approve(hacker, ether("30"), {from:user1})
        await this.token.transferFrom(user1, user2, ether("20"), { from: hacker }) // 20개 전송

        // 정상적으로 잔고가 늘어남.
        expect( await this.token.balanceOf(user2) ).to.be.bignumber.equal( ether("90") )

        // Approve 된 것보다 많은량 처리시 에러
        await expectRevert(
            this.token.transferFrom(user1, user2, ether("20"), { from: hacker }),
            "SafeMath: subtraction overflow -- Reason given: SafeMath: subtraction overflow.")
    })

    it('화이트 리스트로 등록된 유저의 위임전송', async function () {

        // 전송전 잔고 채크
        expect( await this.token.balanceOf(user1) ).to.be.bignumber.equal( ether("130") )
        expect( await this.token.balanceOf(user2) ).to.be.bignumber.equal( ether("90") )
        expect( await this.token.balanceOf(hogoo) ).to.be.bignumber.equal( ether("0") )

        // 화이트리스트 등록
        await this.token.addWhitelistAdmin(hogoo)

        // Approve 없이 전송 시도
        await this.token.transferFrom(user1, user2, ether("60"), { from: hogoo })

        // 잔고 확인
        expect( await this.token.balanceOf(user1) ).to.be.bignumber.equal( ether("70") )
        expect( await this.token.balanceOf(user2) ).to.be.bignumber.equal( ether("150") )
        expect( await this.token.balanceOf(hogoo) ).to.be.bignumber.equal( ether("0") )
    })

})
