import React from "react";
import { Config } from "../js/config";
import Button from "../Components/Buttons/Button";
import content from "../database";

const database = {
  money: "100000",
  people: "15",
  like: "256"
};

const computed = {
  walletAddress() {
    return Config.walletAddress;
  },
  apiKey() {
    return Config.dapp.apiKey;
  },
  txActionName() {
    return Config.txActionName;
  },
  userName() {
    return Config.userName;
  },
  mtSymbol() {
    return Config.mt.symbol;
  },
  stSymbol() {
    return Config.st.symbol;
  }
};

const Luniverse = () => {
  const fund = () => {
    let m = parseInt(database.money.replace(/,/g, ""));
    let p = parseInt(database.people.replace(/,/g, ""));
    fetch(
      `https://api.luniverse.io/tx/v1.0/transactions/${computed.txActionName.funding}`,
      {
        method: "POST",
        from: computed.walletAddress.pd,
        inputs: {
          _name: "asdf.",
          _teamname: "zxcv.",
          _position: "qwe.",
          _uniformNumber: "132",
          _weight: "142",
          _height: "555",
          _birthday: "cvds"
        }
      },
      {
        headers: {
          "api-key": computed.apiKey
        }
      }
    )
      .then(() => {
        alert(`10,000원이 펀딩되었습니다.\n1,000RWT를 드려요!`);
        m = m + 10000;
        m = m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        database.money = m;
        p = p + 1;
        p = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        database.people = p;
      })
      .catch(() => {
        alert("Fund에 실패했습니다!");
      });
  };

  return (
    <div>
      <Button
        text={"카드발급"}
        size="createCard"
        type="submit"
        onClick={fund}
      />
      {/* <Button
        text={"확인합니다"}
        size="createCard"
        type="submit"
        onClick="test()"
      />
      <Button
        text={"카드사기"}
        size="createCard"
        type="submit"
        onClick="buycard()"
      />
      <Button
        text={"주인확인"}
        size="createCard"
        type="submit"
        onClick=" ownerof()"
      />
      <Button
        text={"pd카드수 확인"}
        size="createCard"
        type="submit"
        onClick=" balanceof()"
      />
      <Button
        text={"돈 확인"}
        size="createCard"
        type="submit"
        onClick="checkMyWallet()"
      />
      <Button
        text={"티켓 사기"}
        size="createCard"
        type="submit"
        onClick="buyTickets()"
      />
      <Button
        text={"티켓 확인"}
        size="createCard"
        type="submit"
        onClick="checkTicket()"
      />
      <Button
        text={"돈 보내기"}
        size="createCard"
        type="submit"
        onClick="purchaseTicket()"
      /> */}
    </div>
  );
};

const init = () => {
  console.log(Config.chainId);
  console.log(content);
  console.log(database);
  console.log(computed.apiKey);
  fetch(`https://api.luniverse.io/tx/v1.0/histories?next=0`, {
    headers: {
      Authorization: `Bearer ${computed.apiKey}`,
      "Content-Type": `application/json`
    }
  })
    .then(response => {
      var l = parseInt(database.like.replace(/,/g, ""));
      var p = parseInt(database.people.replace(/,/g, ""));
      var m = parseInt(database.money.replace(/,/g, ""));
      var temp = response.data.data.histories.items.filter(
        valid =>
          valid.txStatus === "SUCCEED" &&
          [Config.txActionName.funding, Config.txActionName.like].indexOf(
            valid.actionName
          ) !== -1
      );
      temp.map(tx => {
        if (tx.actionName === Config.txActionName.like) {
          l = l + 1;
        } else if (tx.actionName === Config.txActionName.funding) {
          p = p + 1;
          m = m + 10000;
        }
      });
      l = l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      database.like = l;
      p = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      database.people = p;
      m = m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      database.money = m;
    })
    .catch(() => {});
};

init();

export default Luniverse;

// 이거 없으면 에러 뜸 도대체 뭐지?

//   methods: {

//     like(){
//       let n = parseInt(this.database.like.replace(/,/g,""));
//       this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.like}`,{
//           'from': this.Config.walletAddress.pd,
//           'inputs' : {
//             'receiverAddress': this.walletAddress.user,
//             'valueAmount': '100000000000000000000'
//           }
//       },
//       {
//         headers: {
//           'api-key': this.apiKey,
//         }
//       }
//       )
//         .then(() => {
//           alert('좋아요를 눌러주셔서 감사합니다!\n100RWT를 드려요!');
//           n = n + 1;
//           n = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//           this.database.like=n;
//         })
//         .catch(() => {
//           alert('좋아요에 실패했습니다!')
//         });
//     },
//     fund(){
//       let m = parseInt(this.database.money.replace(/,/g,""));
//       let p = parseInt(this.database.people.replace(/,/g,""));
//       this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.funding}`,{
//             'from': this.walletAddress.pd,
//             'inputs' : {
//                '_name': 'asdf.',
//                '_teamname': 'zxcv.',
//                '_position': 'qwe.',
//                '_uniformNumber': '132',
//                '_weight': '142',
//                '_height':'555',
//                '_birthday': 'cvds'
//             }
//         },
//         {
//           headers: {
//             'api-key': this.apiKey,
//           },
//         })
//         .then(() => {
//           alert(`10,000원이 펀딩되었습니다.\n1,000RWT를 드려요!`)
//           m = m + 10000;
//           m = m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//           this.database.money=m;
//           p = p + 1;
//           p= p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//           this.database.people=p;
//         })
//         .catch(() => {
//           alert('Fund에 실패했습니다!')
//         });

//     },

//     test(){
//         this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.getCardStruct_1}`,{
//             'from': this.walletAddress.pd,
//             'inputs' : {
//                 "__index": "1"
//             }
//         },
//         {
//           headers: {
//             'api-key': this.apiKey,
//           },
//         })
//         .then((response) => {
//             alert(response.data.data.res[0]);  //리턴값 가져오는 듯
//           })
//         .catch(() => {
//           alert('실패했습니다')
//         });

//     },

//     buycard(){
//         this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.buyCards}`,{
//             'from': this.walletAddress.user,
//             'inputs' : {
//                "_tokenId": "5"
//             }
//         },
//         {
//           headers: {
//             'api-key': this.apiKey,
//           },
//         })
//         .then(() => {
//             alert('1번 카드를 샀습니다.');  //리턴값 가져오는 듯
//           })
//         .catch(() => {
//           alert('실패했습니다')
//         });

//     },

//     ownerof(){
//         this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.ownerOf}`,{
//             'from': this.walletAddress.user,
//             'inputs' : {
//               "_tokenId": "5"
//             }
//         },
//         {
//           headers: {
//             'api-key': this.apiKey,
//           },
//         })
//         .then((response) => {
//             alert(response.data.data.res[0]);  //리턴값 가져오는 듯
//           })
//         .catch(() => {
//           alert('실패했습니다')
//         });

//     },

//     balanceof(){
//         this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.balanceOf}`,{
//             'from': this.walletAddress.user,
//             'inputs' : {
//                "_owner": this.walletAddress.pd,
//             }
//         },
//         {
//           headers: {
//             'api-key': this.apiKey,
//           },
//         })
//         .then((response) => {
//             alert(response.data.data.res[0]);  //리턴값 가져오는 듯
//           })
//         .catch(() => {
//           alert('실패했습니다')
//         });

//     },

//     checkMyWallet(){
//            this.axios.get(`https://api.luniverse.io/tx/v1.0/wallets/${this.walletAddress.user}/${this.mtSymbol}/${this.stSymbol}/balance`, {
//         headers: {
//           'Authorization': `Bearer ${this.apiKey}`,
//         },
//       })
//         .then((response) => {
//          alert(response.data.data.balance/1000000000000000000);

//         })
//         .catch(() => {
//           alert('실패했습니다')
//         });
//     },

//      buyTickets(){
//         this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.setOwners}`,{
//             'from': this.walletAddress.user,
//             'inputs' : {
//                "_index": '0',
//                "_name":  'shsh'//this.userName,
//             }
//         },
//         {
//           headers: {
//             'api-key': this.apiKey,
//           },
//         })
//         .then(() => {
//           //  purchaseTicket();
//             alert('티켓을 구입하였습니다.');  //리턴값 가져오는 듯
//           })
//         .catch(() => {
//           alert('실패했습니다')
//         });

//      },

//       checkTicket(){
//         this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.getOwners}`,{
//             'from': this.walletAddress.user,
//             'inputs' : {
//                "_index": '0',
//             }
//         },
//         {
//           headers: {
//             'api-key': this.apiKey,
//           },
//         })
//         .then((response) => {
//             alert(response.data.data.res[0]);  //리턴값 가져오는 듯
//           })
//         .catch(() => {
//           alert('실패했습니다')
//         });

//       },

//       purchaseTicket(){
//       this.axios.post(`https://api.luniverse.io/tx/v1.0/transactions/${this.txActionName.purchase}`,{
//           'from': this.walletAddress.user,
//           'inputs' : {
//             'receiverAddress': this.walletAddress.pd,
//             'valueAmount': '5000000000000000000',
//           }
//         },
//       {
//         headers: {
//           'api-key': this.apiKey,
//         },
//       })
//       .then(() => {
//             alert('5 만큼 지불했습니다');  //리턴값 가져오는 듯
//           })
//         .catch(() => {
//           alert('지불 실패')
//         });
//       },

//   } // methods
// }
