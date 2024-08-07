class CustomServiceButton {
  static instance = null;
  constructor(accessKey) {
    if (CustomServiceButton.instance) {
      return CustomServiceButton.instance;
    }
    CustomServiceButton.instance = this;
    this.accessKey = accessKey;
    this.iframe = null; // 初始化iframe
    this.iframeDisplay = false; //

    if (this.accessKey) {
      this.render();
    }
  }

  render() {
    const button = document.createElement("div");
    button.classList.add("aics-custom-service-btn"); // 添加样式类
    button.style.position = "fixed";
    button.style.bottom = "40px";
    button.style.right = "40px";
    button.style.backgroundColor = "#eee";
    button.style.borderRadius = "50%";
    button.style.width = "40px";
    button.style.height = "40px";
    button.style.cursor = "pointer";
    button.style.zIndex = "99999";
    const svgIcon = `
<svg t="1712896672087" style="margin:4px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1512" width="32" height="32">
<path d="M640.570514 149.738057l19.456-37.888a188.957257 188.957257 0 0 0-52.589714-43.680914l9.9328 76.068571c8.0896 1.770057 15.857371 3.642514 23.200914 5.500343z m27.0336 7.2704c7.957943 2.2528 15.023543 4.330057 20.962743 6.0416a118.506057 118.506057 0 0 0-8.192-20.494628l-12.770743 14.453028z m-92.072228-20.5824l-12.141715-86.103771a196.052114 196.052114 0 0 0-36.498285-6.012343l-23.771429 87.317943c3.189029-0.131657 6.261029-0.2048 9.157486-0.234057 21.386971 0 42.817829 1.989486 63.253943 5.032228z m-110.006857-1.770057l24.137142-89.468343c-25.746286 3.218286-48.596114 11.702857-68.286171 23.113143l8.118857 71.606857c12.244114-2.1504 24.429714-3.905829 36.015543-5.251657z m-72.718629 12.990171V88.458971c-30.178743 25.556114-49.034971 56.671086-54.857143 77.970286 15.184457-7.402057 34.362514-13.677714 54.857143-18.783086zM730.199771 1024l-188.269714-31.392914h-55.7056L298.276571 1024l10.532572-118.930286c-29.227886-21.942857-75.088457-72.967314-87.288686-116.765257-18.929371-2.881829-64.789943 4.768914-82.095543-11.688228-20.977371-19.924114-27.355429-20.714057-34.757485-74.664229-5.7344-41.7792-2.121143-103.482514 28.7744-133.749029-23.800686-120.393143 9.508571-219.633371 69.383314-300.207542 27.413943-36.834743 56.641829-62.303086 80.398628-77.429029C303.908571 80.164571 403.002514 0 518.144 0c117.013943 0 211.382857 84.0704 230.282971 196.754286 21.855086 14.584686 42.0864 31.349029 59.889372 51.346285 97.089829 109.114514 97.089829 240.128 81.92 305.503086 22.381714 32.811886 36.308114 75.805257 29.696 133.749029-6.612114 57.929143-30.72 82.666057-82.373486 86.352457-7.840914 0.555886-41.662171 1.6384-49.064228 2.925714-9.859657 55.471543-39.087543 99.854629-72.777143 128.438857l14.467657 118.930286zM235.944229 598.557257c0 147.2512 35.649829 182.827886 101.946514 206.774857 27.0336 9.801143 69.602743 12.478171 87.186286 12.170972 0-20.860343 14.584686-29.198629 43.593142-29.198629h101.741715c33.192229 0 40.082286 16.749714 40.082285 43.797943v29.198629c0 27.4432-6.890057 43.797943-40.082285 43.797942h-101.727086c-27.808914 0-43.593143-0.643657-43.593143-29.198628-1.813943 0.029257-12.536686 0-14.467657 0-35.137829 0-86.528-9.303771-112.347429-30.529829 29.110857 43.944229 113.195886 103.497143 213.972115 103.497143 100.7616 0 220.116114-72.967314 240.888685-203.585828 1.813943-11.410286 14.1312-18.8416 25.512229-22.6304 6.0416-2.033371 14.175086-6.890057 24.3712-14.599315 0.848457-65.214171 0.848457-101.712457 0-109.494857C518.158629 617.340343 428.573257 516.388571 366.738286 408.766171c-34.742857 86.571886-83.529143 175.747657-130.794057 189.791086z m15.798857-321.155657c-39.541029 38.224457-64 86.367086-73.333029 144.413257-2.647771 26.4192 27.150629 30.602971 36.673829 9.669486 5.690514-38.794971 26.287543-85.079771 55.764114-119.588572 9.406171-22.996114 3.042743-34.494171-19.090286-34.494171z m44.046628-0.029257c12.039314 0 21.796571-9.801143 21.796572-21.898972 0-12.097829-9.757257-21.898971-21.796572-21.898971s-21.796571 9.801143-21.796571 21.898971c0 12.0832 9.757257 21.898971 21.796571 21.898972z" fill="#1296db" p-id="1513">
</path></svg>
`;

    button.innerHTML = svgIcon;
    button.addEventListener("click", this.toggleChat.bind(this));
    dragElement(button);
    document.body.appendChild(button);

    function dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown =
          dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }

  toggleChat() {
    if (!this.iframe) {
      this.createChat();
    } else if (this.iframe.style.display === "none") {
      this.iframe.style.display = "block";
    } else {
      this.iframe.style.display = "none";
    }
  }

  createChat() {
    if (!this.iframe) {
      const iframe = document.createElement("iframe");
      const url = `http://leapcapital.cn:800/aics/#/?accessKey=${this.accessKey}`;
      iframe.src = url;
      iframe.style.position = "fixed";
      iframe.style.bottom = "120px"; // 根据实际需求调整位置
      iframe.style.right = "20px"; // 根据实际需求调整位置
      iframe.style.width = "300px";
      iframe.style.height = "500px";
      iframe.style.border = "none";
      iframe.style.zIndex = "9999";
      iframe.style.backgroundColor = "white";
      iframe.style.display = "block";
      this.iframe = iframe;
      document.body.appendChild(iframe);
    }
  }
}

// 创建一个CustomServiceButton实例
