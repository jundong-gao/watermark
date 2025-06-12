import { defineComponent, getCurrentInstance, ref, onMounted, onUnmounted, createElementBlock, openBlock, renderSlot } from "vue";
const defaultConfig = {
  color: "#ccc",
  fontSize: 14,
  text: "watermark",
  rotate: 45,
  gap: 50
};
const useCreateMarkBg = async (config) => {
  let _config = { ...defaultConfig, ...config };
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  await renderText(canvas, ctx, _config);
  if (!_config.image) {
    await renderText(canvas, ctx, _config);
  } else {
    await renderImage(canvas, ctx, _config);
  }
  return Promise.resolve({
    base64: canvas.toDataURL(),
    size: {
      width: canvas.width,
      height: canvas.height
    }
  });
};
function renderText(canvas, ctx, _config) {
  let fontSize = _config.fontSize * window.devicePixelRatio;
  ctx.font = `${fontSize}px Arial`;
  let text_arr = Array.isArray(_config.text) ? _config.text : [_config.text];
  let textWidth = Math.max(...text_arr.map((item) => ctx.measureText(item).width));
  let short_width = textWidth * Math.cos(Math.PI / 4) + text_arr.length * fontSize;
  let canvasWidth = 0;
  let canvasHeight = 0;
  if (Array.isArray(_config.gap)) {
    canvasWidth = Math.min(short_width, textWidth) + _config.gap[0] * devicePixelRatio;
    canvasHeight = Math.min(short_width, textWidth) + _config.gap[1] * devicePixelRatio;
  } else {
    canvasHeight = canvasWidth = Math.min(short_width, textWidth) + _config.gap * devicePixelRatio;
  }
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate(Math.PI / 180 * -_config.rotate);
  ctx.fillStyle = _config.color;
  ctx.font = `${fontSize}px Arial`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  text_arr.forEach((item, index) => {
    let y = index - text_arr.length / 2 + 0.5;
    ctx.fillText(item, 0, y * fontSize);
  });
  return Promise.resolve();
}
function renderImage(canvas, ctx, _config) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = _config.image;
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = () => {
      const maxWidth = Math.cos(_config.rotate) * image.width * 1.5;
      const maxHeight = Math.sin(_config.rotate) * image.width * 1.5 || image.height;
      canvas.width = Math.abs(maxWidth);
      canvas.height = Math.abs(maxHeight);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 180 * _config.rotate);
      ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
      resolve(null);
    };
    image.onerror = (err) => {
      console.warn(err);
      throw Error("图片加载失败");
    };
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "water-mark",
  props: {
    text: {},
    fontSize: {},
    color: {},
    gap: {},
    zIndex: {},
    rotate: {},
    image: {}
  },
  setup(__props) {
    let instance = getCurrentInstance();
    const defaultConf = {
      fontSize: 20,
      color: "rgba(0, 0, 0, .2)",
      text: "WaterMark",
      gap: 50,
      rotate: 45,
      zIndex: 9999
    };
    const props = __props;
    let userParams = instance.appContext.config.globalProperties._watermark_config || {};
    let watermarkConfig = { ...defaultConf };
    Object.keys(props).forEach((key) => {
      const typedKey = key;
      const propValue = props[typedKey];
      const userValue = userParams == null ? void 0 : userParams[typedKey];
      const defaultValue = defaultConf[typedKey];
      if (propValue !== void 0) {
        watermarkConfig[typedKey] = propValue;
      } else {
        watermarkConfig[typedKey] = userValue ?? defaultValue;
      }
    });
    const parentRef = ref(null);
    let base64 = "";
    let size = { width: 0, height: 0 };
    let div = null;
    const createWaterMark = () => {
      if (!parentRef.value) return;
      if (div) div.remove();
      div = document.createElement("div");
      div.style.position = "absolute";
      div.style.inset = "0";
      div.style.pointerEvents = "none";
      div.style.zIndex = String(watermarkConfig.zIndex);
      div.style.backgroundImage = `url(${base64})`;
      div.style.backgroundSize = `${size.width}px ${size.height}px`;
      div.style.backgroundRepeat = "repeat";
      parentRef.value.appendChild(div);
    };
    let ob = new MutationObserver((entries) => {
      for (const entry of entries) {
        for (const node of entry.removedNodes) {
          if (node === div) createWaterMark();
        }
        if (entry.target === div) createWaterMark();
      }
    });
    onMounted(async () => {
      let info = await useCreateMarkBg(watermarkConfig);
      base64 = info.base64;
      size = info.size;
      createWaterMark();
      ob.observe(parentRef.value, {
        attributes: true,
        childList: true,
        subtree: true
      });
    });
    onUnmounted(() => {
      ob.disconnect();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: { "position": "relative" },
        ref_key: "parentRef",
        ref: parentRef
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 512);
    };
  }
});
const install = (app, options) => {
  app.config.globalProperties._watermark_config = options || {};
  app.component("GaoWatermark", _sfc_main);
};
export {
  _sfc_main as GaoWatermark,
  install as default
};
