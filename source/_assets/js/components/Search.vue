<template>
  <div class="flex flex-1 justify-end items-center text-right px-4">
    <div
      class="absolute md:relative w-full justify-end left-0 top-0 z-10 mt-7 md:mt-0 px-4 md:px-0"
      :class="{'hidden md:flex': ! searching}"
    >
      <label for="search" class="hidden">Search</label>

      <input
        id="search"
        v-model="query"
        ref="search"
        class="transition-fast relative block h-10 w-full max-w-4xl lg:w-1/4 lg:focus:w-full bg-gray-900 border border-gray-500 focus:border-orange-400 outline-none cursor-pointer text-gray-100 px-4 pb-0 pt-px"
        :class="{ 'transition-border': query }"
        autocomplete="off"
        name="search"
        placeholder="Search"
        type="text"
        @keyup.esc="reset"
        @blur="reset"
      />

      <button
        v-if="query || searching"
        class="absolute top-0 right-0 leading-snug font-400 text-3xl text-orange-400 hover:text-orange-200 bg-transparent focus:outline-none pr-7 md:pr-3"
        @click="reset"
        aria-label="Reset Search"
      >&times;</button>

      <transition name="fade">
        <div
          v-if="query"
          class="absolute left-0 right-0 md:inset-auto w-full max-w-4xl text-left mb-4 md:mt-10 max-h-screen overflow-scroll border-b border-orange-400"
        >
          <div
            class="flex flex-col bg-black text-white border border-b-0 border-t-0 border-orange-400 rounded-b-lg shadow-lg mx-4 md:mx-0"
          >
            <a
              v-for="(result, index) in results"
              class="bg-black hover:bg-orange-900 border-b border-orange-400 text-xl cursor-pointer p-4"
              :class="{ 'rounded-b-lg' : (index === results.length - 1) }"
              :href="result.link"
              :title="result.title"
              :key="result.link"
              @mousedown.prevent
            >
              {{ result.title }}
              <span
                class="block font-normal text-sm text-white my-1"
                v-html="result.snippet"
              ></span>
            </a>

            <div
              v-if="! results.length"
              class="bg-white w-full hover:bg-blue-100 border-b border-blue-400 rounded-b-lg shadow cursor-pointer p-4"
            >
              <p class="my-0">
                No results for
                <strong>{{ query }}</strong>
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <button
      title="Start searching"
      type="button"
      class="flex md:hidden bg-gray-100 hover:bg-blue-100 justify-center items-center border border-gray-500 rounded-full focus:outline-none h-10 px-3"
      @click.prevent="showInput"
    >
      <img src="/assets/img/magnifying-glass.svg" alt="search icon" class="h-4 w-4 max-w-none" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fuse: null,
      searching: false,
      query: ""
    };
  },
  computed: {
    results() {
      return this.query ? this.fuse.search(this.query) : [];
    }
  },
  methods: {
    showInput() {
      this.searching = true;
      this.$nextTick(() => {
        this.$refs.search.focus();
      });
    },
    reset() {
      this.query = "";
      this.searching = false;
    }
  },
  created() {
    // first, determine current language
    const html = document.querySelector("html");
    const lang = html.getAttribute("lang");
    // then, base url to load from
    const base = document.querySelector("head base");
    const baseUrl = base.getAttribute("href");

    axios(baseUrl + "/index_" + lang + ".json")
      .then(response => {
        this.fuse = new fuse(response.data, {
          minMatchCharLength: 6,
          keys: ["title", "snippet", "categories"]
        });
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>

<style>
input[name="search"] {
  background-image: url("/assets/img/magnifying-glass.svg");
  background-position: 0.8em;
  background-repeat: no-repeat;
  border-radius: 25px;
  text-indent: 1.2em;
}

input[name="search"].transition-border {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
