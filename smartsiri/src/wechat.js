function onBridgeReady(prepay) {
  return new Promise((resolve, reject) => {
    WeixinJSBridge.invoke("getBrandWCPayRequest", prepay, function (res) {
      if (res.err_msg === "get_brand_wcpay_request:ok") {
        console.log("ok");
        resolve(res);
      } else {
        console.log("error");
        reject(res);
      }
    });
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
  if (typeof WeixinJSBridge === "undefined") {
    return new Promise((resolve, reject) => {
      function onBridgeReadyWrapper() {
        onBridgeReady(prepay).then(resolve).catch(reject);
      }

      if (document.addEventListener) {
        document.addEventListener(
          "WeixinJSBridgeReady",
          onBridgeReadyWrapper,
          false
        );
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", onBridgeReadyWrapper);
        document.attachEvent("onWeixinJSBridgeReady", onBridgeReadyWrapper);
      }
    });
  } else {
    return onBridgeReady(prepay);
  }
}

// module.exports = { boostPay };
