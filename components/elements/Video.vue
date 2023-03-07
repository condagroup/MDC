<script setup>
import Hls from "hls.js/dist/hls.min";

const props = defineProps({
  data: {
    type: Object,
  },
});

const video = ref();
const hls = ref();

const mq = inject("mq");

const { autoplay, poster } = props.data;
const src = computed(() => {
  let value = props.data.src;
  if (!mq.value.s) {
    value = props.data.mobileSrc;
  }
  return value;
});
const ratio = computed(() => {
  let value = props.data.ratio.length ? props.data.ratio[0] : [16, 9];
  // if (!mq.value.s) {
  //   value = props.data.mobileRatio[0];
  // }
  return value;
});

onMounted(() => {
  if (!Hls.isSupported()) {
    video.value.src = src.value;
  } else {
    hls.value = new Hls({
      startLevel: 5,
    });
    hls.value.loadSource(src.value);
    hls.value.attachMedia(video.value);
  }
});

watch(
  () => mq.value.s,
  () => {
    playing.value = false;
    hls.value.loadSource(src.value);
  }
);

const { playing, currentTime, duration, muted } = useMediaControls(video);

const scrubber = ref();
const scrubbing = ref(false);
const scrub = ref(0);
const { elementX, elementWidth } = useMouseInElement(scrubber);

watch([scrubbing, elementX], () => {
  scrub.value = Math.max(0, Math.min(1, elementX.value / elementWidth.value));
  if (scrubbing.value) {
    currentTime.value = scrub.value * duration.value;
  }
});
useEventListener("mouseup", () => (scrubbing.value = false));

const videoContainer = ref();
const { isOutside } = useMouseInElement(videoContainer);
</script>

<template>
  <div v-lay="{ gap: 'xs' }">
    <div v-ratio="[ratio.x, ratio.y]" class="video" ref="videoContainer" v-lay="{ dir: 'o', align: ['center'] }">
      <video @click="playing = !playing" ref="video" :autoplay="autoplay" :muted="autoplay" playsinline />
      <Transition name="fade">
        <div v-space="'m'" class="controls" v-lay="{ dir: 'h', gap: 'm', align: ['center'], fluid: true }"
          v-show="!isOutside || (isOutside && !playing)">
          <ElementsLink :data="{ themes: ['button', 'dark-button', 'icon'] }" @click="playing = !playing">
            {{ $t(playing? "pause" : "play") }}
          </ElementsLink>
          <div ref="scrubber" v-lay="'o'" class="scrubber" @mousedown="scrubbing = true">
            <div class="below" />
            <div :style="{ width: `${(currentTime / duration) * 100}%` }" class="above" />
          </div>
          <ElementsLink :data="{ themes: ['button', 'dark-button', 'icon'] }" @click="muted = !muted">
            {{ $t(muted? "unmute" : "mute") }}
          </ElementsLink>
        </div>
      </Transition>
      <Transition name="fade">
        <ElementsFigure v-show="!playing" v-if="poster && poster.image" :data="{ image: poster, theme: 'poster' }" />
      </Transition>
    </div>
    <ElementsText v-show="data.caption" :data="{
      text: data.caption,
      typo: '4',
    }" />
  </div>
</template>

<style lang="postcss" scoped>
.video {
  color: var(--color-white);

  video {
    border-radius: var(--radius);
  }
}

.controls {
  align-self: end;
  z-index: 1;
  grid-template-columns: auto minmax(0, 1fr);
}

.scrubber {
  --size: var(--spacer-xs);
  height: var(--size);
  cursor: pointer;

  .below {
    border-radius: var(--radius);
    background: var(--color-alpha3);
  }

  .above {
    border-radius: var(--radius);
    background: var(--color-white);
  }
}
</style>
