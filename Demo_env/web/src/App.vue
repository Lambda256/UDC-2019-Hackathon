<template>
  <div>
    
    <Login-modal />
    
    <Header
        :walletConnectInit="walletConnectInit"
        :wcConnected="wcConnected"
        :walletConnector="walletConnector"
        :accounts="accounts" />
    <router-view
        :walletConnector="walletConnector"
        :accounts="accounts"
        :privateKeyForDapp="privateKeyForDapp"
        :publicKeyForDapp="publicKeyForDapp"
        :signTransactionToWC="signTransactionToWC"
        :sendCustomRequest="sendCustomRequest" />
  
  </div>
</template>

<script>
  import {Config} from './js/config';
  import Header from '@/components/header';
  import WalletConnect from "@walletconnect/browser";
  // import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
  import LoginModal from "@/components/loginModal";
  import eccrypto from "eccrypto";

  export default {
    name: 'app',
    components: {
      Header,
      LoginModal
    },
    data() {
      return {
        walletConnector: null,
        wcConnected: false,
        accounts: [],
        chainId: 0,
        privateKeyForDapp: "",
        publicKeyForDapp: ""
      }
    },
    created() {
      // A new random 32-byte private key.
      this.privateKeyForDapp = eccrypto.generatePrivate();
      // Corresponding uncompressed (65-byte) public key.
      this.publicKeyForDapp = eccrypto.getPublic(this.privateKeyForDapp);
    },
    methods: {
      walletConnectInit: async function () {
        const bridge = "https://bridge.walletconnect.org";
        const wc = new WalletConnect({bridge});
        this.walletConnector = wc;

        if (!wc.connected) {
          await wc.createSession();
          const uri = wc.uri;

          console.log(uri); // eslint-disable-line

          // this.qrImage = await this.formactQRCodeImage(uri);
          // console.log("qrImage : ", this.qrImage);  // eslint-disable-line

          await this.$modal.show("login-modal", {uri: uri});
          // WalletConnectQRCodeModal.open(uri, () => {
          //   console.log("QR Code Modal closed");  // eslint-disable-line
          // });
          this.wcConnected = wc.connected;
        }

        this.subscribeToConnectionEvents();
      },
      subscribeToConnectionEvents: function () {

        this.walletConnector.on("connect", (error, payload) => {
          console.log("WC connect !!!");  // eslint-disable-line
          if (error) {
            throw error;
          }

          this.wcConnected = true;
          // WalletConnectQRCodeModal.close();
          this.$modal.hide("login-modal");

          this.accounts = payload.params[0].accounts;
          Config.walletAddress.user = this.accounts[0];
          this.chainId = payload.params[0].chainId;

          const cr = {
            method: "luni_login",
            params: {
              publicKeyForDapp: this.convertBufferToHexString(this.publicKeyForDapp)
            }
          };

          this.sendCustomRequest(cr);
        });

        this.walletConnector.on("session_update", (error, payload) => {
          console.log("WC session_update !!!");  // eslint-disable-line
          if (error) {
            throw error;
          }

          this.accounts = payload.params[0].accounts;
          this.chainId = payload.params[0].chainId;
        });

        this.walletConnector.on("disconnect", (error) => {
          console.log("WC disconnect !!!");  // eslint-disable-line
          if (error) {
            throw error;
          }
          this.wcConnected = false;
          if (this.walletConnector) {
            this.walletConnector.killSession();
            Config.walletAddress.user = "";
            this.walletConnector = null;
          }
        })
      },
      signTransactionToWC: async function (tx) {
        return await this.walletConnector
        .signTransaction(tx);
      },
      sendCustomRequest: async function (customRequest) {
        return await this.walletConnector
        .sendCustomRequest(customRequest);
      },
      convertBufferToHexString(byteArray) {
        return Array.from(byteArray, function (byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
