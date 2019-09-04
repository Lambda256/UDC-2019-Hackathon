<template>
  <qr-modal
      name="login-modal"
      :width="modalWidth"
      :height="modalHeight"
      @before-open="beforeOpen">
    <div class="px-3 my-4">
      <div class="site-home-scene">
        <h2 class="shc-title">LuniverStar K</h2>
        <p class="shc-sub-title">QR 로그인</p>
        <p class="shc-descriptions">루니사인으로 간편하게 로그인 및 회원가입을 하세요 !!!</p>
      </div>
      <div class="qr-container">
        <div v-innerHtml="qrImage">
        </div>
      </div>
    </div>
  </qr-modal>
</template>

<script>
  import * as qrImage from "qr-image";

  const MODAL_WIDTH = 600;
  const MODAL_HEIGHT = 700;

  export default {
    name: "LoginModal",
    props: {},
    data() {
      return {
        modalWidth: MODAL_WIDTH,
        modalHeight: MODAL_HEIGHT,
        qrImage: ""
      }
    },
    created() {
      this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
    },
    methods: {
      beforeOpen(event) {
        // console.log(event); // eslint-disable-line
        this.qrImage = this.formatQRCodeImage(event.params.uri);

      },
      formatQRCodeImage(data) {
        let result = "";
        const dataString = qrImage.imageSync(data, {type: "svg"});
        if (typeof dataString === "string") {
          result = dataString.replace("<svg", `<svg class="qr_image_style"`);
        }
        return result;
      }
    }
  }
</script>

<style>
  .qr_image_style {
    width: 90%;
    padding: 30px;
    box-sizing: border-box;
  }
  .qr-container{
    text-align: center;
  }
</style>
