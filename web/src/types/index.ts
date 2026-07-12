export type AssetCategory = 'spare' | 'instrument' | 'tool'

/** 设备台账类别（不含生产仓地点本身） */
export type AssetLedgerCategory = AssetCategory

/** 组织机构类型：东北分部 → 省公司 → 地市公司 → 县公司 → 班组 */
export type OrgType = 'division' | 'province' | 'city' | 'county' | 'team'

export interface Organization {
  id: string
  name: string
  code: string
  type: OrgType
  parentId: string | null
  level: number
  shortName?: string
  leader?: string
  phone?: string
}

export interface Role {
  id: string
  name: string
  code: string
  description: string
  permissions: string[]
}

/** 用户数据可见范围 */
export type DataScope = 'all' | 'org_and_children' | 'org_only'

/** 登录用户上下文（阶段 5） */
export interface UserContext {
  token: string
  username: string
  displayName: string
  personId: string
  orgId: string
  orgName: string
  orgType: OrgType
  roleId: string
  roleName: string
  permissions: string[]
  dataScope: DataScope
}

export interface Person {
  id: string
  name: string
  employeeNo: string
  orgId: string
  orgName: string
  roleId: string
  roleName: string
  phone: string
  status: '在职' | '离职'
}

/** 生产仓地点 / 仓室主数据（阶段 2） */
export type WarehouseUseStatus = '在用' | '停用' | '改造中' | '待建'

export type WarehouseAssetNature = '自有' | '租赁' | '借用'

export type WarehouseSiteType = '备品仓' | '仪器室' | '工器具室' | '综合仓'

export interface WarehouseSite {
  id: string
  code: string
  name: string
  location: string
  orgId: string
  orgName: string
  assetNature: WarehouseAssetNature
  useStatus: WarehouseUseStatus
  area: number
  keeperId: string
  keeperName: string
  contactPhone?: string
  warehouseType?: WarehouseSiteType
  isSmart?: boolean
  remark?: string
  createdAt: string
}

export const warehouseUseStatusOptions: WarehouseUseStatus[] = ['在用', '停用', '改造中', '待建']

export const warehouseAssetNatureOptions: WarehouseAssetNature[] = ['自有', '租赁', '借用']

export const warehouseSiteTypeOptions: WarehouseSiteType[] = ['备品仓', '仪器室', '工器具室', '综合仓']

export interface Manufacturer {
  id: string
  name: string
  category: 'spare' | 'instrument' | 'tool'
  contact: string
  phone: string
  address: string
  qualification: string
}

export interface DeviceType {
  id: string
  name: string
  category: AssetCategory
  code: string
  unit: string
  description: string
}

export interface AssetLedger {
  id: string
  category: AssetCategory
  assetCode: string
  name: string
  typeId: string
  typeName: string
  orgId: string
  orgName: string
  warehouseId: string
  warehouseName: string
  manufacturer: string
  model: string
  quantity: number
  unit: string
  status: '在库' | '在用' | '维修中' | '报废'
  purchaseDate: string
  warrantyDate: string
  remark?: string
}

export interface InOutRecord {
  id: string
  category: AssetCategory
  assetCode: string
  assetName: string
  type: '入库' | '出库'
  quantity: number
  operator: string
  orgName: string
  reason: string
  operateTime: string
}

export interface FaultRecord {
  id: string
  category: AssetCategory
  assetCode: string
  assetName: string
  faultDesc: string
  faultLevel: '一般' | '严重' | '紧急'
  reporter: string
  orgName: string
  reportTime: string
  status: '待处理' | '处理中' | '已关闭'
  /** 关联维修记录 ID（转维修后写入） */
  maintenanceId?: string | null
}

export interface MaintenanceRecord {
  id: string
  category: AssetCategory
  assetCode: string
  assetName: string
  projectName: string
  fundingSource: string
  amount: number
  vendor: string
  startDate: string
  endDate: string
  operator: string
  status: '进行中' | '已完成'
  remark?: string
  /** 来源故障记录 ID */
  faultId?: string | null
}

/** 资产生命周期时间线条目 */
export interface AssetLifecycleEvent {
  id: string
  type: 'ledger' | 'inout' | 'fault' | 'maintenance' | 'inventory'
  title: string
  time: string
  description: string
  tag?: string
  tagType?: '' | 'success' | 'warning' | 'danger' | 'info'
}

export interface InventoryTask {
  id: string
  category: AssetCategory
  taskName: string
  orgId: string
  orgName: string
  assignee: string
  totalCount: number
  checkedCount: number
  status: '待盘点' | '盘点中' | '已完成'
  deadline: string
  createTime: string
  /** 上级任务 ID，中心级任务为 null */
  parentId: string | null
  /** center=中心汇总任务（可下钻至生产仓），warehouse=生产仓执行任务（可下钻至资产明细） */
  level: 'center' | 'warehouse'
}

/** 盘点资产明细行（生产仓级任务下钻） */
export interface InventoryLineItem {
  id: string
  taskId: string
  assetCode: string
  assetName: string
  typeName: string
  warehouseName: string
  bookQuantity: number
  actualQuantity: number | null
  status: '待盘' | '已盘' | '有差异'
}

export interface MenuItem {
  path: string
  title: string
  icon?: string
  children?: MenuItem[]
}

export const categoryLabels: Record<AssetCategory, string> = {
  spare: '备品备件',
  instrument: '仪器仪表',
  tool: '工器具',
}

export const subModuleLabels = {
  ledger: '台账录入',
  inout: '出入库记录',
  fault: '故障记录',
  maintenance: '维修记录',
  inventory: '盘点记录',
} as const

export type SubModule = keyof typeof subModuleLabels
