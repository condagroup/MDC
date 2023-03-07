<script setup>
import {
  Application,
  Sprite,
  Assets,
  Container,
  Graphics,
  RenderTexture,
} from "pixi.js";
import DropSVG from "@/assets/svg/icons/stroke.svg?component";
import { background } from '@/utils/pixi'

const props = defineProps({
  data: {
    type: Object
  }
})
const { t } = useI18n();

const width = props.data.dimensions[0].width;

Assets.init({
  preferences: {
    crossOrigin: '',
  },
});

const size = ref();
const sizeEl = ref();
const unit = ref('cm');
const input = ref();
const wrapper = ref();
const filename = ref(' ')
const disabled = ref(true)

const initPointer = ref();
const finalPointer = ref();

const steps = computed(() => ([
  {
    index: 1,
    title: t('upload'),
    text: t('upload_text'),
  },
  {
    index: 2,
    title: t('measure'),
    text: t('measure_text'),
  },
  {
    index: 3,
    title: t('position'),
    text: t('position_text'),
  },
]))

const stepActive = ref(1)

const widthArtwork = computed(() =>
  unit.value === "cm" ? width : (width / 2.54)
);

watch(size, () => {
  if (finalPointer.value) {
    disabled.value = false;
  }
});

// pixi stuff
let firstInit = true;
let image = null;
let app = null;
let sprite = null;
let path = null;
let artwork = null;
let originalWidth = 0;
let dragTarget = null;
let mouseContainer = null;
let line = null;
let annoRef = null;
let arrowLeftAsset = null;
let arrowRightAsset = null;
let arrowLeft = null;
let arrowRight = null;

let isMouseButtonDown = false;
let firstClick = false;

const handleFileUpload = async () => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    path = e.target.result;
    filename.value = input.value.files[0].name

    image = await Assets.load(path);
    originalWidth = image.width;

    if (sprite && sprite.container) {
      sprite.container.destroy();
      sprite = null;
    }

    sprite = background(
      { x: app.renderer.width, y: app.renderer.height },
      new Sprite(image)
    );

    app.stage.addChild(sprite.container);
    disabled.value = false;
  };
  reader.readAsDataURL(input.value.files[0]);
}

function onDragStart() {
  dragTarget = this;
  app.stage.on("pointermove", onDragMove);
}

function onDragMove(event) {
  if (dragTarget) {
    dragTarget.parent.toLocal(event.global, null, dragTarget.position);
  }
}

function onDragEnd() {
  if (dragTarget) {
    app.stage.off("pointermove", onDragMove);
    dragTarget = null;
  }
}

const setArtwork = async (raz) => {
  if (artwork) {
    artwork.destroy();
    artwork = null;
  }
  line.clear();
  sprite.container.eventMode = "static";
  artwork = new Sprite(image);

  artwork.eventMode = "static";
  artwork.buttonMode = true

  artwork.on("pointerdown", onDragStart, artwork);
  artwork.x = app.renderer.width / 2;
  artwork.y = app.renderer.height / 2;
  artwork.anchor.x = 0.5;
  artwork.anchor.y = 0.5;

  artwork.scale.x = app.renderer.width * (1 / artwork.width) * (raz / app.renderer.width);
  artwork.scale.y = artwork.scale.x;

  app.stage.removeChild(mouseContainer);
  app.stage.removeChild(annoRef);
  sprite.container.addChild(artwork);
};

watch(stepActive, (val) => {
  if (val === 1) {
    disabled.value = false;
  }

  if (val === 2) {
    disabled.value = true;

    init();
  } else if (mouseContainer) {
    mouseContainer.off("click", onMouseDown);
    mouseContainer.off("touchstart", onMouseDown);
    mouseContainer.off("pointerup", onMouseUp);
    mouseContainer.off("pointermove", onMouseMove);
  }

  if (val === 3) {
    const finalSize = Math.abs(finalPointer.value.x - initPointer.value.x);
    const raz = widthArtwork.value * (finalSize / size.value);
    setArtwork(raz);
  } else {
    if (artwork) {
      artwork.destroy();
      artwork = null;
      sprite.container.eventMode = "auto";
    }

    initPointer.value = null;
    finalPointer.value = null;
    isMouseButtonDown = false;
    firstClick = false;
    if (line) {
      line.clear();
    }
    size.value = null
  }
})

onMounted(async () => {
  const url = props.data.images[0].jpegs;
  image = await Assets.load(url);

  arrowLeftAsset = await Assets.load('/img/left.png');
  arrowRightAsset = await Assets.load('/img/right.png');

  nextTick(() => {
    app = new Application({
      resizeTo: wrapper.value,
      backgroundAlpha: 0,
    });
    wrapper.value.appendChild(app.view);

    app.stage.on("pointerup", onDragEnd);
    app.stage.on("pointerupoutside", onDragEnd);
  })
});

onBeforeUnmount(() => {
  if (app) {
    app.destroy();
    app = null;
  }
})

const onMouseMove = (e) => {
  if (isMouseButtonDown) {
    firstClick = true;
    if (initPointer.value == null) return;
    line.clear();
    line.lineStyle({
      width: 1,
      color: 0x000000,
      alpha: 1,
    });
    line.moveTo(initPointer.value.x, initPointer.value.y);
    line.lineTo(e.global.x, initPointer.value.y);
  }
};

const onMouseDown = (e) => {
  if (!firstClick) {
    const global = { ...e.global };
    initPointer.value = global;

    line = new Graphics();
    line.lineStyle({
      width: 1,
      color: 0x000000,
      alpha: 1,
    });
    line.moveTo(e.global.x, e.global.y);

    arrowLeft = new Sprite(arrowLeftAsset);
    arrowLeft.scale.x = 0.25;
    arrowLeft.scale.y = 0.25;
    arrowLeft.x = e.global.x - 1;
    arrowLeft.y = initPointer.value.y - (arrowLeft.height / 2);

    annoRef.addChild(line);
    annoRef.addChild(arrowLeft);

    isMouseButtonDown = true;
  }
};

const onMouseUp = (e) => {
  if (firstClick && isMouseButtonDown && !finalPointer.value) {
    const global = { ...e.global };
    finalPointer.value = { ...global };
    isMouseButtonDown = false;

    arrowRight = new Sprite(arrowRightAsset);
    arrowRight.scale.x = 0.25;
    arrowRight.scale.y = 0.25;
    arrowRight.x = finalPointer.value.x - arrowRight.width + 1;
    arrowRight.y = initPointer.value.y - (arrowRight.height / 2);

    annoRef.addChild(arrowRight);

    sizeEl.value.focus();
    if (size.value) {
      disabled.value = false;
    }
  }
};

const download = async () => {
  const prev = sprite.container.position.y
  const width = originalWidth;
  const height = sprite.container.height / sprite.container.width * originalWidth
  const printContainer = new Container();
  const prevScale = app.renderer.width / sprite.container.width;
  sprite.container.position.y = (sprite.container.height * prevScale - app.renderer.height) / 2;

  printContainer.addChild(sprite.container);
  const scale = originalWidth / sprite.container.width
  printContainer.scale.x = scale
  printContainer.scale.y = height / sprite.container.height

  print = new Application({
    width,
    height,
    backgroundAlpha: 0,
  });

  const renderTexture = RenderTexture.create({ width, height });
  print.renderer.render(printContainer, renderTexture);

  sprite.container.position.y = prev;
  app.stage.addChild(sprite.container);

  const img = await print.renderer.extract.image();

  print.destroy();
  print = null;

  var a = document.createElement("a");
  a.href = img.src;
  a.download = `${props.data.slug}.jpg`;
  a.click();
};

const init = () => {
  annoRef = new Container();
  mouseContainer = new Sprite();

  mouseContainer.x = 0;
  mouseContainer.y = 0;
  mouseContainer.width = app.renderer.width;
  mouseContainer.height = app.renderer.height;
  app.stage.addChild(mouseContainer);
  app.stage.addChild(annoRef);

  mouseContainer.eventMode = "static";
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  mouseContainer.on("click", onMouseDown);
  mouseContainer.on("touchstart", onMouseDown);
  mouseContainer.on("pointerup", onMouseUp);
  mouseContainer.on("pointermove", onMouseMove);
};

</script>

<template>
  <div v-lay v-pad="{ x: 'xs' }" class="preview">
    <div class="header" v-pad="{ y: 'xs' }" v-space="{ top: 'xs' }">
      <div v-grid="2" class="header-grid">
        <div>
          <ElementsLink @click="$emit('closeModal')">
            <div v-lay="{ dir: 'h', gap: 'm', align: ['center', 'start'], fluid: true }">
              <ElementsIcon :data="{ name: 'close' }" size="24" />
              <ElementsText :data="{ text: t('preview'), typo: 'm' }" />
            </div>
          </ElementsLink>
        </div>
        <div class="steps-header">
          <CustomStepPreview v-for="(step, index) in steps" :data="step" :active="stepActive"
            @click="stepActive >= step.index ? stepActive = step.index : undefined" />
        </div>
      </div>
    </div>
    <div v-grid="$mq.m ? 2 : 1">
      <div v-lay="{ align: 'start' }" v-show="$mq.m">
        <div v-lay="{ dir: 'h', fluid: true }" class="thumb-mini">
          <ElementsFigure :data="{ image: data.images, ratio: [5, 7] }" />
          <div>
            <ElementsText :data="{ text: `${data.title}, ${data.year}` }" />
            <ElementsText :data="{ text: data.artists }" />
          </div>
        </div>
      </div>
      <div class="slider-wrapper">
        <div class="slider">
          <TransitionGroup name="fade-group">
            <div v-show="stepActive === 1" key="1">
              <div v-lay>
                <ElementsText :data="{ text: steps[0].text, typo: 'l' }" />
                <ElementsText :data="{ text: filename, typo: 'l', color: 'gray' }" v-if="filename" class="truncate" />
                <input ref="input" type="file" accept="image/*" @change="handleFileUpload" v-show="false" />
              </div>
            </div>
            <div v-show="stepActive === 2" key="2">
              <div v-lay>
                <ElementsText :data="{ text: steps[1].text, typo: 'l' }" />
                <div class="typo--l" v-lay="{ dir: 'h', fluid: true, align: ['center', 'start'] }">
                  <input type="number" :placeholder="t('placeholder_type')" v-model="size" class="size" ref="sizeEl" />
                  <div class="select-custom">
                    <DropSVG />
                    <select name="unit" v-model="unit">
                      <option value="cm">cm</option>
                      <option value="inch">inch</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="stepActive === 3" key="3">
              <ElementsText :data="{ text: steps[2].text, typo: 'l' }" />
            </div>
          </TransitionGroup>
        </div>
        <div class="pixi-wrapper">
          <ClientOnly>
            <div class="pixi-canvas" ref="wrapper"></div>
          </ClientOnly>
        </div>
      </div>
    </div>
    <div class="controls" v-pad="{ y: 'xs' }" v-space="{ top: 'xs' }">
      <div v-lay="{ dir: 'h', fluid: true, align: ['center', 'even'] }">
        <div class="action">
          <ElementsLink v-if="stepActive === 1" @click="input.click()">
            {{ t('select_image') }}
          </ElementsLink>
          <ElementsLink v-if="stepActive === 3" @click="download">
            {{ t('download') }}
          </ElementsLink>
        </div>
        <div class="next" v-if="stepActive < steps.length">
          <ElementsLink @click="stepActive += 1" :data="{ disabled }">
            {{ t('confirm') }}
          </ElementsLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.preview {
  min-height: 100%;
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.header {
  position: sticky;
  top: 0;
  border-top: 1px solid var(--color-black);

  &-grid {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;

    @media (--m) {
      grid-template-columns: repeat(var(--g-cols), minmax(var(--g-min), 1fr));
    }
  }
}

.thumb-mini {
  grid-template-columns: 120px auto;
}

.slider-wrapper {
  display: grid;
  grid-template-rows: minmax(calc(var(--vh) * 10), auto) minmax(0, 1fr) auto;
}

.pixi-canvas {
  width: 100%;
  height: 100%;
}

.controls {
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--color-black);

  @media (--m) {
    width: 50%;
    left: 50%;

  }
}

.steps-header {
  display: grid;
  grid-template-columns: repeat(3, min-content);
  width: 100%;
}

.size {
  max-width: 170px;
}

input,
select {
  appearance: none;
  border: 0;
  background: transparent;
  outline: 0;

  &::placeholder {
    color: var(--color-gray);
  }
}

.select-custom {
  position: relative;

  svg {
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  select {
    padding-left: 14px;
  }
}
</style>