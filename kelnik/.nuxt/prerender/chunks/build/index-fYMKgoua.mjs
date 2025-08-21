import { defineComponent, computed, unref, ref, mergeProps, watch, useSSRContext } from 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { _ as _export_sfc, d as defineStore, s as storeToRefs } from './server.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/h3/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/destr/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/hookable/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/ofetch/dist/node.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/node-mock-http/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/unstorage/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/unstorage/drivers/fs.mjs';
import 'file:///D:/Github/test-projects/kelnik/kelnik/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/ohash/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/klona/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/defu/dist/defu.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/scule/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/pathe/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/unhead/dist/server.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/devalue/index.js';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/unhead/dist/utils.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/unhead/dist/plugins.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/unctx/dist/index.mjs';
import 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/vue-router/dist/vue-router.node.mjs';

const _imports_0 = publicAssetsURL("/data/flat_furniture.svg");
const useApartmentsStore = defineStore("apartments", {
  state: () => ({
    apartments: [],
    total: 0,
    loading: false,
    locked: false,
    limit: 20,
    offset: 0,
    filters: {
      rooms: [],
      price: [0, 1e8],
      area: [0, 200]
    },
    meta: {
      priceMin: 0,
      priceMax: 1e8,
      areaMin: 0,
      areaMax: 200
    },
    orderBy: "none"
  }),
  getters: {
    canLoadMore(state) {
      return state.apartments.length < state.total;
    }
  },
  actions: {
    async fetchApartments(options = {}) {
      if (options.reset) {
        this.offset = 0;
        this.apartments = [];
        this.limit = 1e3;
      }
      this.loading = true;
      try {
        const params = new URLSearchParams();
        params.set("limit", String(this.limit));
        params.set("offset", String(this.offset));
        if (this.filters.rooms.length) {
          params.set("rooms", this.filters.rooms.join(","));
        }
        params.set("priceMin", String(this.filters.price[0]));
        params.set("priceMax", String(this.filters.price[1]));
        params.set("areaMin", String(this.filters.area[0]));
        params.set("areaMax", String(this.filters.area[1]));
        const data = await $fetch(`/api/apartments?${params.toString()}`);
        if (data) {
          let items = data.items;
          switch (this.orderBy) {
            case "priceAsc":
              items = [...items].sort((a, b) => a.price - b.price);
              break;
            case "priceDesc":
              items = [...items].sort((a, b) => b.price - a.price);
              break;
            case "areaAsc":
              items = [...items].sort((a, b) => a.area - b.area);
              break;
            case "areaDesc":
              items = [...items].sort((a, b) => b.area - a.area);
              break;
            case "floorAsc":
              items = [...items].sort((a, b) => a.floor - b.floor);
              break;
            case "floorDesc":
              items = [...items].sort((a, b) => b.floor - a.floor);
              break;
          }
          this.total = data.total;
          this.meta = data.meta;
          if (options.reset) {
            this.apartments = items;
          } else {
            this.apartments = this.apartments.concat(items);
          }
          this.offset += data.items.length;
        }
      } catch (error) {
        console.error("Failed to fetch apartments:", error);
      } finally {
        this.loading = false;
        this.locked = false;
      }
    },
    setOrder(order) {
      this.orderBy = order;
    },
    async applyFilters() {
      if (this.loading) return;
      this.locked = true;
      await this.fetchApartments({ reset: true });
    },
    async loadMore() {
      if (this.loading || !this.canLoadMore) return;
      await this.fetchApartments();
    },
    setRooms(rooms) {
      if (this.locked) return;
      this.filters.rooms = rooms;
    },
    setPriceRange(range) {
      if (this.locked) return;
      this.filters.price = range;
    },
    setAreaRange(range) {
      if (this.locked) return;
      this.filters.area = range;
    },
    resetFilters() {
      if (this.locked) return;
      this.filters.rooms = [];
      this.filters.price = [this.meta.priceMin, this.meta.priceMax];
      this.filters.area = [this.meta.areaMin, this.meta.areaMax];
    }
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ApartmentsTable",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const props = __props;
    const store = useApartmentsStore();
    const areaArrow = computed(() => store.orderBy === "areaAsc" ? "\u25B2" : store.orderBy === "areaDesc" ? "\u25BC" : "");
    const floorArrow = computed(() => store.orderBy === "floorAsc" ? "\u25B2" : store.orderBy === "floorDesc" ? "\u25BC" : "");
    const priceArrow = computed(() => store.orderBy === "priceAsc" ? "\u25B2" : store.orderBy === "priceDesc" ? "\u25BC" : "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "table card" }, _attrs))} data-v-3014dd19><div class="table-head" data-v-3014dd19><div class="th th-plan" data-v-3014dd19>\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430</div><div class="th th-title" data-v-3014dd19>\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430</div><button class="${ssrRenderClass([{ active: areaArrow.value }, "th th-area sort"])}" type="button" data-v-3014dd19> S, \u043C\xB2 <span class="arrow" data-v-3014dd19>${ssrInterpolate(areaArrow.value)}</span></button><button class="${ssrRenderClass([{ active: floorArrow.value }, "th th-floor sort"])}" type="button" data-v-3014dd19> \u042D\u0442\u0430\u0436 <span class="arrow" data-v-3014dd19>${ssrInterpolate(floorArrow.value)}</span></button><button class="${ssrRenderClass([{ active: priceArrow.value }, "th th-price sort"])}" type="button" data-v-3014dd19> \u0426\u0435\u043D\u0430, \u20BD <span class="arrow" data-v-3014dd19>${ssrInterpolate(priceArrow.value)}</span></button></div><div class="table-body" data-v-3014dd19><!--[-->`);
      ssrRenderList(props.items, (item) => {
        _push(`<div class="tr" data-v-3014dd19><div class="td td-plan" data-v-3014dd19><img class="plan"${ssrRenderAttr("src", _imports_0)} alt="\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430" data-v-3014dd19></div><div class="td td-title" data-v-3014dd19><div class="title" data-v-3014dd19>${ssrInterpolate(item.rooms)}-\u043A\u043E\u043C\u043D\u0430\u0442\u043D\u0430\u044F \u2116${ssrInterpolate(100 + item.id)}</div></div><div class="td td-area" data-v-3014dd19>${ssrInterpolate(item.area.toString().replace(".", ","))}</div><div class="td td-floor" data-v-3014dd19>${ssrInterpolate(item.floor)} \u0438\u0437 17</div><div class="td td-price" data-v-3014dd19>${ssrInterpolate(item.price.toLocaleString("ru-RU"))}</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ApartmentsTable.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3014dd19"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FilterPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useApartmentsStore();
    const { filters, loading, meta } = storeToRefs(store);
    const roomsList = [1, 2, 3, 4];
    ref(null);
    ref(null);
    watch(meta, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "filter" }, _attrs))} data-v-20699f05><div class="rooms" data-v-20699f05><!--[-->`);
      ssrRenderList(roomsList, (room) => {
        _push(`<button type="button" class="${ssrRenderClass([{ active: unref(filters).rooms[0] === room }, "pill"])}"${ssrIncludeBooleanAttr(unref(loading) || unref(store).locked) ? " disabled" : ""} data-v-20699f05>${ssrInterpolate(room)}\u043A</button>`);
      });
      _push(`<!--]--></div><div class="group" data-v-20699f05><div class="label" data-v-20699f05>\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u044B, \u20BD</div><div data-v-20699f05></div></div><div class="group" data-v-20699f05><div class="label" data-v-20699f05>\u041F\u043B\u043E\u0449\u0430\u0434\u044C, \u043C\xB2</div><div data-v-20699f05></div></div><div class="foot" data-v-20699f05><button class="reset" type="button"${ssrIncludeBooleanAttr(unref(loading) || unref(store).locked) ? " disabled" : ""} data-v-20699f05>\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u2715</button></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FilterPanel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-20699f05"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ScrollTop",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "scroll-top",
        style: visible.value ? null : { display: "none" }
      }, _attrs))}><button class="button btn-secondary" aria-label="\u041D\u0430\u0432\u0435\u0440\u0445">\u041D\u0430\u0432\u0435\u0440\u0445</button></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ScrollTop.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const apartmentsStore = useApartmentsStore();
    const { apartments, total, canLoadMore, loading } = storeToRefs(apartmentsStore);
    const heading = computed(() => `\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u044B`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ApartmentsTable = __nuxt_component_0;
      const _component_FilterPanel = __nuxt_component_1;
      const _component_ScrollTop = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-44c87ae4><header class="header container" data-v-44c87ae4><h1 style="${ssrRenderStyle({ "font-size": "40px", "line-height": "1.2", "margin": "0 0 12px 0", "color": "#0b254b" })}" data-v-44c87ae4>${ssrInterpolate(heading.value)}</h1></header><section class="section container layout" data-v-44c87ae4><div data-v-44c87ae4>`);
      _push(ssrRenderComponent(_component_ApartmentsTable, { items: unref(apartments) }, null, _parent));
      if (unref(canLoadMore)) {
        _push(`<div class="load-more" data-v-44c87ae4><button class="button btn-secondary"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-44c87ae4> \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><aside data-v-44c87ae4><div class="filter-card" data-v-44c87ae4>`);
      _push(ssrRenderComponent(_component_FilterPanel, null, null, _parent));
      _push(`</div></aside></section>`);
      _push(ssrRenderComponent(_component_ScrollTop, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-44c87ae4"]]);

export { index as default };
//# sourceMappingURL=index-fYMKgoua.mjs.map
