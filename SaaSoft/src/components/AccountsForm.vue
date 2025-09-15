<template>
  <div>
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
      <h2 style="margin:0">Учетные записи</h2>
      <el-button type="primary" circle @click="onAdd" :icon="Plus" />
    </div>

    <el-alert type="info" :closable="false" show-icon style="margin-bottom:16px">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </el-alert>

    <div v-if="!store.accounts.length" style="color:#909399; margin-bottom:8px">Нет записей. Добавьте первую.</div>

    <el-row style="font-weight:600; color:#606266; margin-bottom:6px" :gutter="12" v-if="store.accounts.length">
      <el-col :span="8">Метки</el-col>
      <el-col :span="4">Тип записи</el-col>
      <el-col :span="6">Логин</el-col>
      <el-col :span="6">Пароль</el-col>
    </el-row>

    <AccountItem
      v-for="acc in store.accounts"
      :key="acc.id"
      :account="acc"
      @remove="store.remove(acc.id)"
      @commit="onCommit(acc.id, $event)"
    />
  </div>
  </template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { useAccountsStore } from '../stores/accounts';
import AccountItem from './AccountItem.vue';

const store = useAccountsStore();

onMounted(() => {
  store.load();
});

function onAdd() {
  store.addEmpty();
}

function onCommit(id: string, payload: { field: string; value: unknown }) {
  if (payload.field === 'type' || payload.field === 'login' || payload.field === 'password' || payload.field === 'labelsInput') {
    store.updateFromInputs(id, { [payload.field]: payload.value } as any);
  }
}
</script>


