import type {
  AssetLedger,
  DeviceType,
  FaultRecord,
  InOutRecord,
  InventoryLineItem,
  InventoryTask,
  MaintenanceRecord,
  Manufacturer,
  Person,
  Role,
} from '@/types'
import { organizations } from './organizations'
import { warehouseSites } from './warehouseSites'

export { organizations, warehouseSites }

export const roles: Role[] = [
  { id: 'role-1', name: '系统管理员', code: 'admin', description: '拥有全部系统权限', permissions: ['*'] },
  {
    id: 'role-5',
    name: '组织管理员',
    code: 'org_admin',
    description: '本单位及下级业务管理（无系统设置）',
    permissions: [
      'warehouse:view',
      'warehouse:edit',
      'ledger:view',
      'ledger:edit',
      'inout:view',
      'inout:edit',
      'fault:view',
      'fault:edit',
      'maintenance:view',
      'maintenance:edit',
      'inventory:view',
      'inventory:dispatch',
      'inventory:execute',
    ],
  },
  {
    id: 'role-2',
    name: '仓管员',
    code: 'warehouse_keeper',
    description: '负责台账、出入库与生产仓',
    permissions: [
      'warehouse:view',
      'warehouse:edit',
      'ledger:view',
      'ledger:edit',
      'inout:view',
      'inout:edit',
      'inventory:view',
      'inventory:execute',
    ],
  },
  {
    id: 'role-3',
    name: '维修员',
    code: 'maintainer',
    description: '负责故障与维修记录',
    permissions: ['ledger:view', 'fault:view', 'fault:edit', 'maintenance:view', 'maintenance:edit'],
  },
  {
    id: 'role-4',
    name: '盘点员',
    code: 'auditor',
    description: '负责盘点任务执行',
    permissions: ['ledger:view', 'inventory:view', 'inventory:execute'],
  },
]

export const persons: Person[] = [
  { id: 'p-1', name: '管理员', employeeNo: 'EMP001', orgId: 'org-div-ne', orgName: '东北分部', roleId: 'role-1', roleName: '系统管理员', phone: '13800000001', status: '在职' },
  { id: 'p-2', name: '李省管', employeeNo: 'EMP002', orgId: 'org-prov-ln', orgName: '辽宁省公司', roleId: 'role-5', roleName: '组织管理员', phone: '13800000011', status: '在职' },
  { id: 'p-3', name: '张市管', employeeNo: 'EMP003', orgId: 'org-city-sy', orgName: '沈阳地市公司', roleId: 'role-5', roleName: '组织管理员', phone: '13800000012', status: '在职' },
  { id: 'p-8', name: '孙县管', employeeNo: 'EMP008', orgId: 'org-county-hp', orgName: '和平县公司', roleId: 'role-5', roleName: '组织管理员', phone: '13800000013', status: '在职' },
  { id: 'p-4', name: '王仓管', employeeNo: 'EMP004', orgId: 'org-team-yw1', orgName: '运维一班', roleId: 'role-2', roleName: '仓管员', phone: '13800000002', status: '在职' },
  { id: 'p-5', name: '赵仓管', employeeNo: 'EMP005', orgId: 'org-county-sh', orgName: '沈河区公司', roleId: 'role-2', roleName: '仓管员', phone: '13800000003', status: '在职' },
  { id: 'p-6', name: '陈盘点', employeeNo: 'EMP006', orgId: 'org-team-yw2', orgName: '运维二班', roleId: 'role-4', roleName: '盘点员', phone: '13800000005', status: '在职' },
  { id: 'p-7', name: '刘维修', employeeNo: 'EMP007', orgId: 'org-team-jx', orgName: '检修班', roleId: 'role-3', roleName: '维修员', phone: '13800000004', status: '在职' },
]

export const manufacturers: Manufacturer[] = [
  { id: 'm-1', name: '华北机电有限公司', category: 'spare', contact: '孙经理', phone: '13900000001', address: '北京市顺义区', qualification: 'ISO9001' },
  { id: 'm-2', name: '精密仪器科技', category: 'instrument', contact: '周经理', phone: '13900000002', address: '上海市浦东新区', qualification: 'CNAS认证' },
  { id: 'm-3', name: '工器具制造厂', category: 'tool', contact: '吴经理', phone: '13900000003', address: '天津市武清区', qualification: '生产许可证' },
  { id: 'm-4', name: '中电备件供应', category: 'spare', contact: '郑经理', phone: '13900000004', address: '深圳市南山区', qualification: 'ISO9001' },
]

export const deviceTypes: DeviceType[] = [
  { id: 'dt-7', name: '轴承', category: 'spare', code: 'SP-001', unit: '个', description: '通用轴承备件' },
  { id: 'dt-8', name: '密封件', category: 'spare', code: 'SP-002', unit: '套', description: '设备密封备件' },
  { id: 'dt-9', name: '压力表', category: 'instrument', code: 'IN-001', unit: '块', description: '0-1.6MPa压力表' },
  { id: 'dt-10', name: '万用表', category: 'instrument', code: 'IN-002', unit: '台', description: '数字万用表' },
  { id: 'dt-11', name: '扳手套装', category: 'tool', code: 'TL-001', unit: '套', description: '标准扳手工具组' },
  { id: 'dt-12', name: '绝缘手套', category: 'tool', code: 'TL-002', unit: '副', description: '电工绝缘防护' },
]

export const ledgers: AssetLedger[] = [
  { id: 'l-4', category: 'spare', assetCode: 'SP20250001', name: '6205轴承', typeId: 'dt-7', typeName: '轴承', orgId: 'org-team-yw1', orgName: '运维一班', warehouseId: 'ws-1', warehouseName: '沈阳和平备品仓', manufacturer: '华北机电', model: '6205-2RS', quantity: 50, unit: '个', status: '在库', purchaseDate: '2025-01-10', warrantyDate: '2026-01-10' },
  { id: 'l-5', category: 'spare', assetCode: 'SP20250002', name: 'O型密封圈组', typeId: 'dt-8', typeName: '密封件', orgId: 'org-county-sh', orgName: '沈河区公司', warehouseId: 'ws-3', warehouseName: '沈河综合生产仓', manufacturer: '中电备件', model: 'NBR-50', quantity: 120, unit: '套', status: '在库', purchaseDate: '2024-09-01', warrantyDate: '2026-09-01' },
  { id: 'l-6', category: 'instrument', assetCode: 'IN20250001', name: '压力表P01', typeId: 'dt-9', typeName: '压力表', orgId: 'org-county-sh', orgName: '沈河区公司', warehouseId: 'ws-3', warehouseName: '沈河综合生产仓', manufacturer: '精密仪器科技', model: 'Y-100', quantity: 5, unit: '块', status: '在用', purchaseDate: '2024-06-01', warrantyDate: '2026-06-01' },
  { id: 'l-7', category: 'instrument', assetCode: 'IN20250002', name: '数字万用表M01', typeId: 'dt-10', typeName: '万用表', orgId: 'org-team-jx', orgName: '检修班', warehouseId: 'ws-4', warehouseName: '沈河检修班工器具室', manufacturer: '精密仪器科技', model: 'FLUKE-17B', quantity: 3, unit: '台', status: '在库', purchaseDate: '2024-12-01', warrantyDate: '2027-12-01' },
  { id: 'l-8', category: 'tool', assetCode: 'TL20250001', name: '扳手工具组', typeId: 'dt-11', typeName: '扳手套装', orgId: 'org-team-jx', orgName: '检修班', warehouseId: 'ws-4', warehouseName: '沈河检修班工器具室', manufacturer: '工器具制造厂', model: 'BS-32', quantity: 8, unit: '套', status: '在库', purchaseDate: '2024-11-05', warrantyDate: '2027-11-05' },
  { id: 'l-9', category: 'tool', assetCode: 'TL20250002', name: '绝缘手套', typeId: 'dt-12', typeName: '绝缘手套', orgId: 'org-team-yw1', orgName: '运维一班', warehouseId: 'ws-2', warehouseName: '和平运维一班仪器室', manufacturer: '工器具制造厂', model: '12KV', quantity: 15, unit: '副', status: '在用', purchaseDate: '2025-02-20', warrantyDate: '2026-02-20' },
]

export const inOutRecords: InOutRecord[] = [
  { id: 'io-1', category: 'spare', assetCode: 'SP20250001', assetName: '6205轴承', type: '入库', quantity: 30, operator: '王仓管', orgName: '运维一班', reason: '采购入库', operateTime: '2025-01-10 09:30:00' },
  { id: 'io-2', category: 'spare', assetCode: 'SP20250001', assetName: '6205轴承', type: '出库', quantity: 5, operator: '王仓管', orgName: '运维一班', reason: '设备维修领用', operateTime: '2025-02-15 14:20:00' },
  { id: 'io-3', category: 'tool', assetCode: 'TL20250001', assetName: '扳手工具组', type: '出库', quantity: 2, operator: '赵仓管', orgName: '沈河区公司', reason: '现场作业领用', operateTime: '2025-03-01 08:45:00' },
  { id: 'io-5', category: 'instrument', assetCode: 'IN20250001', assetName: '压力表P01', type: '出库', quantity: 1, operator: '赵仓管', orgName: '沈河区公司', reason: '校准送检', operateTime: '2025-04-01 11:30:00' },
  { id: 'io-6', category: 'spare', assetCode: 'SP20250002', assetName: 'O型密封圈组', type: '入库', quantity: 50, operator: '赵仓管', orgName: '沈河区公司', reason: '补货入库', operateTime: '2025-05-08 09:15:00' },
]

export const faultRecords: FaultRecord[] = [
  { id: 'f-2', category: 'instrument', assetCode: 'IN20250001', assetName: '压力表P01', faultDesc: '指针偏差超出允许范围', faultLevel: '一般', reporter: '赵仓管', orgName: '沈河区公司', reportTime: '2025-04-12 15:30:00', status: '待处理' },
  { id: 'f-4', category: 'tool', assetCode: 'TL20250002', assetName: '绝缘手套', faultDesc: '表面老化裂纹', faultLevel: '一般', reporter: '王仓管', orgName: '运维一班', reportTime: '2025-06-01 14:00:00', status: '已关闭' },
]

export const maintenanceRecords: MaintenanceRecord[] = [
  { id: 'mr-2', category: 'instrument', assetCode: 'IN20250001', assetName: '压力表P01', projectName: '压力表校准', fundingSource: '专项校准经费', amount: 1200, vendor: '精密仪器科技', startDate: '2025-03-20', endDate: '2025-03-22', operator: '刘维修', status: '已完成' },
  { id: 'mr-4', category: 'tool', assetCode: 'TL20250002', assetName: '绝缘手套', projectName: '绝缘手套更换', fundingSource: '日常维护经费', amount: 680, vendor: '工器具制造厂', startDate: '2025-06-02', endDate: '2025-06-02', operator: '刘维修', status: '已完成' },
]

/** 盘点任务：中心级 parentId=null，生产仓级 parentId 指向中心任务 */
export const inventoryTasks: InventoryTask[] = [
  { id: 'inv-root-2', category: 'spare', taskName: '2025年Q2辽宁全省备件盘点', orgId: 'org-prov-ln', orgName: '辽宁省公司', assignee: '李省管', totalCount: 170, checkedCount: 170, status: '已完成', deadline: '2025-06-15', createTime: '2025-06-01 08:00:00', parentId: null, level: 'center' },
  { id: 'inv-2', category: 'spare', taskName: '2025年Q2运维一班备件库盘点', orgId: 'org-team-yw1', orgName: '运维一班', assignee: '王仓管', totalCount: 50, checkedCount: 50, status: '已完成', deadline: '2025-06-15', createTime: '2025-06-01 08:30:00', parentId: 'inv-root-2', level: 'warehouse' },
  { id: 'inv-5', category: 'spare', taskName: '2025年Q2沈河区备件库盘点', orgId: 'org-county-sh', orgName: '沈河区公司', assignee: '赵仓管', totalCount: 120, checkedCount: 120, status: '已完成', deadline: '2025-06-15', createTime: '2025-06-01 08:30:00', parentId: 'inv-root-2', level: 'warehouse' },
  { id: 'inv-root-3', category: 'tool', taskName: '2025年Q2辽宁全省工器具盘点', orgId: 'org-city-sy', orgName: '沈阳地市公司', assignee: '张市管', totalCount: 23, checkedCount: 15, status: '盘点中', deadline: '2025-07-15', createTime: '2025-07-01 08:00:00', parentId: null, level: 'center' },
  { id: 'inv-3', category: 'tool', taskName: '2025年Q2检修班工器具盘点', orgId: 'org-team-jx', orgName: '检修班', assignee: '刘维修', totalCount: 8, checkedCount: 0, status: '待盘点', deadline: '2025-07-15', createTime: '2025-07-01 08:30:00', parentId: 'inv-root-3', level: 'warehouse' },
  { id: 'inv-6', category: 'tool', taskName: '2025年Q2运维一班工器具盘点', orgId: 'org-team-yw1', orgName: '运维一班', assignee: '王仓管', totalCount: 15, checkedCount: 15, status: '已完成', deadline: '2025-07-10', createTime: '2025-07-01 08:30:00', parentId: 'inv-root-3', level: 'warehouse' },
]

export const inventoryLineItems: InventoryLineItem[] = [
  { id: 'ili-3', taskId: 'inv-6', assetCode: 'TL20250002', assetName: '绝缘手套', typeName: '绝缘手套', warehouseName: '和平运维一班仪器室', bookQuantity: 15, actualQuantity: 14, status: '有差异' },
  { id: 'ili-5', taskId: 'inv-5', assetCode: 'IN20250001', assetName: '压力表P01', typeName: '压力表', warehouseName: '沈河综合生产仓', bookQuantity: 5, actualQuantity: 5, status: '已盘' },
  { id: 'ili-6', taskId: 'inv-2', assetCode: 'SP20250001', assetName: '6205轴承', typeName: '轴承', warehouseName: '沈阳和平备品仓', bookQuantity: 50, actualQuantity: 50, status: '已盘' },
  { id: 'ili-7', taskId: 'inv-3', assetCode: 'TL20250001', assetName: '扳手工具组', typeName: '扳手套装', warehouseName: '沈河检修班工器具室', bookQuantity: 8, actualQuantity: null, status: '待盘' },
  { id: 'ili-8', taskId: 'inv-6', assetCode: 'TL20250002', assetName: '绝缘手套', typeName: '绝缘手套', warehouseName: '和平运维一班仪器室', bookQuantity: 15, actualQuantity: 15, status: '已盘' },
]

export const dashboardStats = {
  warehouseCount: 6,
  spareCount: 350,
  instrumentCount: 48,
  toolCount: 86,
  pendingFaults: 1,
  ongoingMaintenance: 1,
  inventoryProgress: 72,
  orgCount: organizations.length,
}
