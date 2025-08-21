<script setup lang="ts">
import type { ApartmentItem } from '@/stores/apartments'
import { useApartmentsStore } from '@/stores/apartments'
import { computed } from 'vue'

const props = defineProps<{ items: ApartmentItem[] }>()
const store = useApartmentsStore()

function toggleArea() {
	store.setOrder(store.orderBy === 'areaAsc' ? 'areaDesc' : 'areaAsc')
	store.applyFilters()
}
function toggleFloor() {
	store.setOrder(store.orderBy === 'floorAsc' ? 'floorDesc' : 'floorAsc')
	store.applyFilters()
}
function togglePrice() {
	store.setOrder(store.orderBy === 'priceAsc' ? 'priceDesc' : 'priceAsc')
	store.applyFilters()
}

const areaArrow = computed(() => store.orderBy === 'areaAsc' ? '▲' : store.orderBy === 'areaDesc' ? '▼' : '')
const floorArrow = computed(() => store.orderBy === 'floorAsc' ? '▲' : store.orderBy === 'floorDesc' ? '▼' : '')
const priceArrow = computed(() => store.orderBy === 'priceAsc' ? '▲' : store.orderBy === 'priceDesc' ? '▼' : '')
</script>

<template>
  <div class="table card">
    <div class="table-head">
      <div class="th th-plan">Планировка</div>
      <div class="th th-title">Квартира</div>
      <button class="th th-area sort" :class="{active: areaArrow}" type="button" @click="toggleArea">
        S, м² <span class="arrow">{{ areaArrow }}</span>
      </button>
      <button class="th th-floor sort" :class="{active: floorArrow}" type="button" @click="toggleFloor">
        Этаж <span class="arrow">{{ floorArrow }}</span>
      </button>
      <button class="th th-price sort" :class="{active: priceArrow}" type="button" @click="togglePrice">
        Цена, ₽ <span class="arrow">{{ priceArrow }}</span>
      </button>
    </div>
    <div class="table-body">
      <div v-for="item in props.items" :key="item.id" class="tr">
        <div class="td td-plan">
          <img class="plan" src="/data/flat_furniture.svg" alt="Планировка" />
        </div>
        <div class="td td-title">
          <div class="title">{{ item.rooms }}-комнатная №{{ 100 + item.id }}</div>
        </div>
        <div class="td td-area">{{ item.area.toString().replace('.', ',') }}</div>
        <div class="td td-floor">{{ item.floor }} из 17</div>
        <div class="td td-price">{{ item.price.toLocaleString('ru-RU') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table { overflow: hidden; }
.table-head { display: grid; grid-template-columns: 120px 1fr 120px 120px 160px; padding: 14px 16px; color: #6b7280; font-size: 13px; }
.table-body { display: block; }
.tr { display: grid; grid-template-columns: 120px 1fr 120px 120px 160px; align-items: center; padding: 14px 16px; border-top: 1px solid var(--color-border); }
.th, .td { display: flex; align-items: center; }
.sort { appearance:none; background:none; border:none; text-align:left; color:#6b7280; cursor:pointer; font: inherit; padding:0; gap:6px; display:inline-flex; align-items:center; }
.sort.active { color:#0b254b; font-weight:600; }
.arrow { font-size: 12px; }
.plan { width: 64px; height: 64px; object-fit: cover; }
.title { color: #0b254b; font-weight: 600; }
.td-price { color: #0b254b; font-weight: 600; }
@media (max-width: 959px) {
  .table-head { display: none; }
  .tr { grid-template-columns: 80px 1fr; grid-auto-rows: auto; gap: 8px 12px; }
  .td-plan { grid-column: 1; grid-row: 1 / span 2; }
  .td-title { grid-column: 2; grid-row: 1; }
  .td-area, .td-floor, .td-price { grid-column: 2; }
}
</style>
