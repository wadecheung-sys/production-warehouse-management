import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { demoAccounts } from '@/mock/auth'
import { organizations } from '@/mock/organizations'
import { persons, roles } from '@/mock/data'
import type { DataScope, OrgType, UserContext } from '@/types'
import { orgTypeLabels } from '@/utils/org'

const STORAGE_KEY = 'pwms_user_context'

function emptyContext(): UserContext {
  return {
    token: '',
    username: '',
    displayName: '',
    personId: '',
    orgId: '',
    orgName: '',
    orgType: 'team',
    roleId: '',
    roleName: '',
    permissions: [],
    dataScope: 'org_only',
  }
}

function loadContext(): UserContext | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as UserContext
  } catch {
    return null
  }
}

function saveContext(ctx: UserContext | null) {
  if (!ctx?.token) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ctx))
}

function resolveLogin(username: string, password: string): UserContext | null {
  const account = demoAccounts.find((a) => a.username === username && a.password === password)
  if (!account) return null

  const person = persons.find((p) => p.id === account.personId)
  if (!person) return null

  const role = roles.find((r) => r.id === person.roleId)
  const org = organizations.find((o) => o.id === person.orgId)

  return {
    token: `demo-token-${account.username}`,
    username: account.username,
    displayName: person.name,
    personId: person.id,
    orgId: person.orgId,
    orgName: person.orgName,
    orgType: (org?.type ?? 'team') as OrgType,
    roleId: person.roleId,
    roleName: person.roleName,
    permissions: role?.permissions ?? [],
    dataScope: account.dataScope as DataScope,
  }
}

export const useUserStore = defineStore('user', () => {
  const context = ref<UserContext>(loadContext() ?? emptyContext())

  const token = computed(() => context.value.token || null)
  const username = computed(() => context.value.username)
  const displayName = computed(() => context.value.displayName)
  const orgLabel = computed(() => {
    if (!context.value.orgName) return ''
    return `${orgTypeLabels[context.value.orgType]} · ${context.value.orgName}`
  })

  function login(user: string, password: string): boolean {
    const resolved = resolveLogin(user, password)
    if (!resolved) return false
    context.value = resolved
    saveContext(resolved)
    return true
  }

  function logout() {
    context.value = emptyContext()
    saveContext(null)
  }

  function isLoggedIn() {
    return !!context.value.token
  }

  return {
    context,
    token,
    username,
    displayName,
    orgLabel,
    login,
    logout,
    isLoggedIn,
  }
})
