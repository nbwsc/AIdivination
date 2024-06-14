function onBridgeReady(prepay) {
  WeixinJSBridge.invoke("getBrandWCPayRequest", prepay, function (res) {
    if (res.err_msg == "get_brand_wcpay_request:ok") {
      console.log("ok");
    } else {
      console.log("error");
    }
  });
}

/**
 *
 * @param { 
     appId: 'appid',
     timeStamp: '1609918952',
     nonceStr: 'y8aw9vrmx8c',
     package: 'prepay_id=wx0615423208772665709493edbb4b330000',
     signType: 'RSA',
     paySign: 'JnFXsT4VNzlcamtmgOHhziw7JqdnUS9qJ5W6vmAluk3Q2nska7rxYB4hvcl0BTFAB1PBEnHEhCsUbs5zKPEig=='
}} prepay
 */
export async function boostPay(prepay) {
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
      document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
    }
  } else {
    onBridgeReady(prepay);
  }
}

// module.exports = { boostPay };
