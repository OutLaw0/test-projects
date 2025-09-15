import { defineStore } from 'pinia';

export type AccountType = 'LDAP' | 'Локальная';

export interface AccountLabelObject {
  text: string;
}

export interface AccountItem {
  id: string;
  labels: AccountLabelObject[]; // parsed from labelsInput
  labelsInput: string; // raw input string
  type: AccountType;
  login: string;
  password: string | null; // null for LDAP
}

const STORAGE_KEY = 'accounts_store_v1';

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function parseLabels(input: string): AccountLabelObject[] {
  return input
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 100)
    .map(text => ({ text }));
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as AccountItem[],
  }),
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as AccountItem[];
        // Ensure password null for LDAP
        this.accounts = parsed.map(a => ({
          ...a,
          password: a.type === 'LDAP' ? null : a.password ?? '',
        }));
      } catch {
        // ignore
      }
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts));
    },
    addEmpty() {
      const item: AccountItem = {
        id: generateId(),
        labels: [],
        labelsInput: '',
        type: 'Локальная',
        login: '',
        password: '',
      };
      this.accounts.push(item);
      this.persist();
    },
    remove(id: string) {
      this.accounts = this.accounts.filter(a => a.id !== id);
      this.persist();
    },
    updateFromInputs(id: string, payload: Partial<Pick<AccountItem, 'labelsInput' | 'type' | 'login' | 'password'>>) {
      const idx = this.accounts.findIndex(a => a.id === id);
      if (idx === -1) return;
      const current = this.accounts[idx];
      const next: AccountItem = {
        ...current,
        ...payload,
      };
      next.labels = parseLabels(next.labelsInput.substring(0, 50 * 3));
      if (next.type === 'LDAP') {
        next.password = null;
      }
      this.accounts.splice(idx, 1, next);
      this.persist();
    },
  },
});


