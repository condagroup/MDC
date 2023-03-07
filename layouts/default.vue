<script setup>
import { useStore } from "@/store";
const router = useRouter();

const { locale } = useI18n();
watch(locale, async (newlocal) => {
  setTimeout(() => {
    location.reload();
  }, 100)
})

const prevPath = computed(() =>
  router.currentRoute.value?.meta?.overlay ? router.currentRoute.value?.meta?.fromPath : router.currentRoute.value?.path
);

const store = useStore();
const { overlayReady, lockBody } = storeToRefs(store);

const nuxtApp = useNuxtApp();

onMounted(() => {
  document.body.classList.add("loaded")

  lockBody.value = useScrollLock(document.querySelector("body"));
  nuxtApp.hook("page:finish", (component) => {
    if (component.ctx.props.name === "overlay") {
      overlayReady.value = true;
      lockBody.value.value = true;
    }
  });
});

const getPageName = (path) => {
  if (path === '/') {
    return 'Shop'
  } else if (path) {
    return path.slice(1).charAt(0).toUpperCase() + path.slice(2)
  }
}

</script>

<template>
  <div>
    <main v-pad="'xs'" class="main-wrapper">
      <LayoutHeader />
      <Transition name="vertical-slide">
        <div v-show="router.currentRoute.value?.meta?.overlay && overlayReady" class="overlay">
          <NuxtPage name="overlay"></NuxtPage>
        </div>
      </Transition>

      <NuxtPage :page-key="prevPath"></NuxtPage>

      <aside class="mainAside" v-grid="{ cols: $mq.m ? '2' : '1', dir: $mq.m ? 'h' : 'v', align: ['center', 'even'] }">
        <div class="page-name-desktop">
          <ElementsText :data="{ text: getPageName(router.currentRoute.value?.path), typo: 'm' }" class="packing" />
        </div>
        <div v-lay="{ align: ['center', 'even'], dir: $mq.m ? 'h' : 'v', fluid: $mq.m ? true : false }">
          <div id="filters"></div>
          <div class="page-chat-bot">
            <div class="page-name-mobile">
              <ElementsText :data="{ text: getPageName(router.currentRoute.value?.path), typo: 'm' }" class="packing" />
            </div>
            <ElementsText :data="{ text: 'Support', typo: 'm', color: 'orange' }" class="packing" />
          </div>
        </div>
      </aside>
    </main>

    <ClientOnly>
      <Modal />
    </ClientOnly>

    <ShopCart />
    <LayoutFooter />
  </div>
</template>

<style lang="postcss">
.main-wrapper {
  background: var(--color-white);
  position: relative;
  z-index: 1;
  margin-bottom: calc(var(--vh) * 100);
  min-height: calc(var(--vh) * 100);
}

.mainAside {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 38px;
  background-color: var(--color-white);
  z-index: 0;
  border-top: 1px solid;
}

.footerContent li {
  height: 25px;
}

.overlay {
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 1;
  height: calc(100 * var(--vh));
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--color-white);
}

.page-chat-bot {
  .page-name-mobile {
    display: none;
  }
}

.page-name-desktop {
  display: block;
}

@media screen and (max-width: 768px) {
  .dialog_mobile {
    text-align: center;
  }

  .dialog_mobile li {
    border-top: 1px solid #000;
    padding: 5px;
  }

  .search-input {
    text-align: center;
  }

  .dialog_mobile :placeholder-shown {
    text-align: center;
  }

  .mainAside {
    height: auto;
    width: 100%;
    border: none;
    padding-bottom: 10px;
  }

  .page-chat-bot {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .page-name-mobile {
      display: block;
    }
  }

  .page-name-desktop {
    display: none;
  }
}

.matching-substring {
  color: orange;
}

.search-input {
  outline: none;
  border: none;
  padding-left: 0px;
  color: gray;
  background: none;
}

.search-input:focus {
  outline: none;
}
</style>

