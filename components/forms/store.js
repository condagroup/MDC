import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export default (id) =>
  defineStore(`form/${id}`, () => {
    const request = reactive({});

    function initRequest(id, value) {
      request[id] = value;
    }

    function updateRequest(id, key, value) {
      request[id][key] = value;
    }

    const currentPage = ref(0);

    return {
      request,
      initRequest,
      updateRequest,
      currentPage,
    };
  })();
