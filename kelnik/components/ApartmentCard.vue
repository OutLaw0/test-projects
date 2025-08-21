<script setup lang="ts">
import type { ApartmentItem } from '@/stores/apartments'

const props = defineProps<{ apartment: ApartmentItem }>()
</script>

<template>
  <article class="card">
    <img class="card-media" :src="props.apartment.image" :alt="props.apartment.title" loading="lazy" />
    <div class="card-body">
      <h3 class="card-title">{{ props.apartment.title }}</h3>
      <div class="card-meta">
        <span>{{ props.apartment.rooms }} комн.</span>
        <span>{{ props.apartment.area }} м²</span>
        <span>{{ props.apartment.floor }} этаж</span>
      </div>
      <div class="card-price">{{ props.apartment.price.toLocaleString('ru-RU') }} ₽</div>
    </div>
  </article>
</template> 