import type { DataScope } from '@/types'

/** 演示登录账号（密码统一 123456） */
export interface DemoAccount {
  username: string
  password: string
  personId: string
  dataScope: DataScope
}

export const demoAccounts: DemoAccount[] = [
  { username: 'admin', password: '123456', personId: 'p-1', dataScope: 'all' },
  { username: 'ln_province', password: '123456', personId: 'p-2', dataScope: 'org_and_children' },
  { username: 'sy_city', password: '123456', personId: 'p-3', dataScope: 'org_and_children' },
  { username: 'hp_county', password: '123456', personId: 'p-8', dataScope: 'org_and_children' },
  { username: 'keeper01', password: '123456', personId: 'p-4', dataScope: 'org_only' },
]
