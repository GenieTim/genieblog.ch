<div x-data="{
  init(){
      window.axios('/index_{{$page->language}}.json')
          .then(response => {
              this.fuse = new window.Fuse(response.data, {
                      minMatchCharLength: 3,
                      keys: ['title', 'snippet', 'categories'],
                      shouldSort: true,
                      includeMatches: true,
                      findAllMatches: true,
                  });
              });
  },
  get results() {
  if (!this.query) {
  return [];
  }
  const results = this.fuse.search(this.query);
  console.log('Results', results);
      return window.highlight_search(results, 'highlight text-primary') ?? results;
  },
  get isQuerying() {
      return Boolean( this.query );
  },
  fuse: null,
  searching: false,
  query: '',
  showInput() {
      this.searching = true;
      this.$nextTick(() => {
          this.$refs.search.focus();
      })
  },
  reset() {
      this.query = '';
      this.searching = false;
  },
}" x-cloak class="flex flex-1 justify-end items-center text-right px-4">
  <div
    class="absolute md:relative w-full justify-end bg-primary-complement-shade left-0 top-0 z-10 mt-7 md:mt-0 px-4 md:px-0"
    :class="{'hidden md:flex': ! searching}">
    <label for="search" class="hidden">Search</label>

    <input id="search" x-model="query" x-ref="search"
      class="relative block h-10 w-full lg:w-1/2 lg:focus:w-3/4 bg-primary-complement-shade border border-primary-shade focus:border-primary-shade outline-none cursor-pointer text-primary-shade px-4 pb-0 pt-px transition-all duration-200 ease-out bg-[url('/assets/img/magnifying-glass.svg')] bg-no-repeat bg-[0.8rem] indent-[1.2em]"
      :class="{ 'rounded-b-none rounded-t-lg': query, 'rounded-3xl': !query }" autocomplete="off" name="search"
      placeholder="Search" type="text" @keyup.esc="reset" @blur="reset">

    <button x-show="query || searching"
      class="absolute top-0 right-0 leading-snug font-400 text-3xl text-primary-shade hover:text-secondary focus:outline-none pr-7 md:pr-3 cursor-pointer"
      @click="reset">&times;</button>

    <div x-show="isQuerying" x-cloak x-transition:enter="transition ease-out duration-300"
      x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-none"
      x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
      class="absolute left-0 right-0 md:inset-auto w-full lg:w-3/4 text-left mb-4 md:mt-10">
      <div
        class="flex flex-col bg-primary-complement-shade text-primary-shade border border-b-0 border-t-0 border-primary-shade rounded-b-lg shadow-search mx-4 md:mx-0">
        <template x-for="(result, index) in results">
          <a class="bg-primary-complement-shade text-primary-shade hover:text-primary border-b border-primary-shade text-xl cursor-pointer p-4"
            :class="{ 'rounded-b-lg': (index === results.length - 1) }" :href="result.link"
            :title="result.title" :key="result.link" @mousedown.prevent>
            <span x-html="result.title" class=""></span>

            <span class="block font-normal text-sm my-1" x-html="result.snippet"></span>
          </a>
        </template>
        <div x-show="! results.length && query.length >= 3"
          class="bg-primary-complement-shade w-full hover:bg-secondary border-b border-primary-shade rounded-b-lg shadow cursor-pointer p-4">
          <p class="my-0">No results for <strong x-text="query"></strong></p>
        </div>
        <div x-show="! results.length  && query.length < 3"
          class="bg-primary-complement-shade w-full hover:bg-secondary border-b border-primary-shade rounded-b-lg shadow cursor-pointer p-4">
          <p class="my-0">Please type a bit more than <strong x-text="query"></strong></p>
        </div>
      </div>
    </div>
  </div>

  <button title="Start searching" type="button"
    class="flex md:hidden bg-gray-100 hover:bg-secondary justify-center items-center border border-gray-500 rounded-full focus:outline-none h-10 px-3"
    @click.prevent="showInput">
    <img src="/assets/img/magnifying-glass.svg" alt="search icon" class="h-4 w-4 max-w-none">
  </button>
</div>
