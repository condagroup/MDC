<script setup>
const props = defineProps({
  placeholder: {
    type: String
  },
  options: {
    type: Array
  },
  setCurrentTypology: {
    type: Function
  },
  setCurrentArtist: {
    type: Function
  },
  currentValue: {
    type: undefined
  },
  dropType: {
    type: String
  }
})
const DEFAULT_VALUE = props.dropType == 'typo' ? 'shop' : 'all';
const isOpen = ref(false);
const search = ref('');
const el = ref('');
const filteredOptions = computed(() => {
  let res = props.options.filter((item) => {
    if (item.title.toLowerCase().includes(search.value.toLowerCase())) {
      return true;
    }
    return false;
  })
  return res;
})

function coloredString (str, strcommon) {
  if(strcommon !== ""){
    const regex = new RegExp(strcommon, 'gi');
    const replacement = `<span class="matching-substring">$&</span>`;
    return str.replace(regex, replacement);
  }
  return str
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (el.value) {
      if (!el.value.contains(e.target)) {
        isOpen.value = false;
      }
    }
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', (e) => {});
})

function toggle() {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    search.value = '';
  }
}

function onClickItem(ct) {
  if (props.dropType == 'typo') {
    props.setCurrentTypology(isSelectedItem(ct) ? 'shop' : ct);
  } else {
    props.setCurrentArtist(isSelectedItem(ct) ? 'all' : ct);
  }
  toggle();
}

function isSelectedItem(ct) {
  if (props.currentValue == DEFAULT_VALUE) {
    return false;
  }
  if (props.dropType == 'typo') {
    if (props.currentValue != ct.slug)
      return false;
  } else {
    if (typeof props.currentValue == 'string') {
      if (props.currentValue != ct.slug)
        return false;
    } else {
      if (props.currentValue.slug != ct.slug)
      return false;
    }
  }
  return true;
}
</script>

<template>
  <div class="dropdown-container" ref="el">
    <div @click="toggle" class="selected-item">
      <slot />
    </div>
    <div>
      <div
        v-if="isOpen"
        :class="props.dropType === 'artist' ? 'dropdown-select-artist' : 'dropdown-select'"
      >
        <div>
          <input
            type="text"
            placeholder="Search..."
            v-model="search"
            class="input-box"
            v-if="props.dropType === 'artist'"
          />
        </div>
        <div class="dropdown-menu nice-scroll">
          <div class="dropdown-menu-item" @click="() => { dropType == 'typo' ? setCurrentTypology('shop') : setCurrentArtist('all') }">
            <div v-if="currentValue == DEFAULT_VALUE" class="selected-value">
              <div class="dot"></div>
              <ElementsText :data="{text: dropType == 'typo' ? 'All products' : 'All artists', color: 'orange'}" />
            </div>
            <div v-else>
              <ElementsText :data="{text: dropType == 'typo' ? 'All products' : 'All artists'}" />
            </div>
          </div>
          <div
            v-for="typology in filteredOptions"
            :key="typology.title"
            class="dropdown-menu-item"
            @click="() => onClickItem(typology)"
          >
            <div v-if="isSelectedItem(typology)" class="selected-value">
              <div class="dot"></div>
              <ElementsText :data="{text: typology.title, color: 'orange'}" />
            </div>
            <div v-else>
              <div v-html="coloredString( typology.title, search)"></div>
            </div>
          </div>
          <div v-if="!filteredOptions.length" class="no-option">
            <ElementsText :data="{text: 'No Search Options'}" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}
.dropdown-container {
  width: 228px;
  position: relative;
  margin-top: 5px;
  z-index: 10;
}
.dropdown-select-artist {
  position: absolute;
  border: 1px solid black;
  display: flex;
  height: 358px;
  width: 100%;
  flex-direction: column;
  padding: 8px 10px 0px 10px;
  background: rgba(255, 255, 255, 0.7);
  bottom: 36px;
  backdrop-filter: blur(20px);
}

.dropdown-select {
  position: absolute;
  border: 1px solid black;
  display: flex;
  width: 225px;
  flex-direction: column;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.7);
  bottom: 36px;
  backdrop-filter: blur(20px);
}

.dropdown-menu::-webkit-scrollbar {
  display: none;
}


.input-box {
  border: none;
  color: grey;
  background: none;
}

.input-box:focus {
  outline: none;
}

.dropdown-menu {
  overflow: auto;
  margin-top: 4px;
  margin-bottom: 4px;
}

.dropdown-menu-item {
  padding-top: 2px;
  padding-bottom: 2px;
  cursor: pointer;
}

.selected-value {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #FF901B;
  margin-left: 2px;
  margin-right: 4px;
}

.nice-scroll::-webkit-scrollbar {
  width: 5px;
}
.nice-scroll::-webkit-scrollbar-track {
  background: #ffffff73;
  border-radius: 5px;
}

.nice-scroll::-webkit-scrollbar-thumb {
  background: #000000;
  border-radius: 5px;
}

.nice-scroll::-webkit-scrollbar-thumb:hover {
  background: white;
}

@media screen and (max-width: 768px) {
  .dropdown-container {
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid black;
    margin-top: 0px;
  }

  .dropdown-select {
    position: relative;
    bottom: 0px;
    opacity: 100%;
    width: 100%;
  }

  .dropdown-select {
    border: none;
    padding: 0px 0px;
  }

  .dropdown-select-artist {
    position: relative;
    bottom: 0px;
    opacity: 100%;
    border: none;
    width: 100%;
  }
  .selected-item {
    padding-bottom: 10px;
  }

  .input-box {
    padding-bottom: 5px;
    padding-top: 10px;
    border-top: 1px solid black;
    text-align: center;
  }

  .dropdown-menu-item {
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .no-option {
    padding-top: 10px;
    border-top: 1px solid black;
    text-align: center;
  }
}
</style>