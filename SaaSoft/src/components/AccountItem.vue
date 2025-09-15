<template>
  <el-form :model="model" :rules="rules" ref="formRef" label-position="top" @submit.prevent>
    <el-row :gutter="12" style="margin-bottom:8px; align-items:center">
      <el-col :span="8">
        <el-form-item prop="labelsInput">
          <el-input
            v-model.trim="model.labelsInput"
            placeholder="Метки через ;"
            :maxlength="50"
            @blur="commit('labelsInput', model.labelsInput)"
            show-word-limit
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="type">
          <el-select v-model="model.type" @change="commit('type', model.type)">
            <el-option label="Локальная" value="Локальная" />
            <el-option label="LDAP" value="LDAP" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item prop="login">
          <el-input
            v-model.trim="model.login"
            placeholder="Значение"
            :maxlength="100"
            show-word-limit
            @blur="commit('login', model.login)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item v-if="model.type === 'Локальная'" prop="password">
          <el-input
            v-model.trim="model.passwordStr"
            type="password"
            show-password
            :maxlength="100"
            show-word-limit
            placeholder="Пароль"
            @blur="commit('password', model.passwordStr)"
          />
        </el-form-item>
        <div v-else style="height:1px"></div>
      </el-col>
      <el-col :span="1" style="display:flex; justify-content:center">
        <el-button type="danger" circle @click="$emit('remove')" :icon="Delete" />
      </el-col>
    </el-row>
  </el-form>
  </template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import type { AccountItem as Item, AccountType } from '../stores/accounts';

const props = defineProps<{ account: Item }>();
const emit = defineEmits<{ (e: 'commit', payload: { field: string; value: unknown }): void; (e: 'remove'): void }>();

const formRef = ref();

const model = reactive({
  labelsInput: props.account.labelsInput,
  type: props.account.type as AccountType,
  login: props.account.login,
  passwordStr: props.account.password ?? '',
});

watch(
  () => props.account,
  (acc) => {
    model.labelsInput = acc.labelsInput;
    model.type = acc.type;
    model.login = acc.login;
    model.passwordStr = acc.password ?? '';
  },
  { deep: true }
);

const rules = computed(() => ({
  login: [
    { required: true, message: 'Обязательное поле', trigger: 'blur' },
    { min: 1, max: 100, message: 'До 100 символов', trigger: 'blur' },
  ],
  password: [
    { validator: (_: any, value: string, cb: any) => {
      if (model.type === 'Локальная' && (!value || value.length === 0)) cb(new Error('Пароль обязателен'));
      else if (model.type === 'Локальная' && value.length > 100) cb(new Error('До 100 символов'));
      else cb();
    }, trigger: 'blur' },
  ],
  labelsInput: [
    { max: 50, message: 'До 50 символов', trigger: 'blur' },
  ],
  type: [{ required: true, message: 'Выберите тип', trigger: 'change' }],
}));

function commit(field: 'labelsInput' | 'type' | 'login' | 'password', value: unknown) {
  if (field === 'password' && model.type !== 'Локальная') return;
  emit('commit', { field, value });
}
</script>


