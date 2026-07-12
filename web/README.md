# 智慧化生产专业仓管理系统（Web 前端演示 v2.0）

面向电力行业「生产专业仓」场景的前端演示项目。Mock 数据 + localStorage 持久化，无需后端即可完整体验业务流程。

## v2.0 核心能力

| 模块 | 说明 |
|------|------|
| 生产仓地点 | **仓室主数据**（地点、所属单位、资产性质、使用状态、面积、库管人员）— 非仓内设备 |
| 仓内物资 | 备品备件 / 仪器仪表 / 工器具台账，录入时必须选择已登记的生产仓地点 |
| 生产仓概览 | 选仓 → 基本信息 + 仓内物资统计 + 台账下钻；智慧仓展示温湿度/烟感 Mock |
| 组织体系 | 东北分部 → 省公司 → 地市公司 → 县公司 → 班组 |
| 数据权限 | 按登录账号 org 子树过滤列表与统计；角色控制菜单与按钮 |
| 业务闭环 | 出入库、故障→维修、盘点下发与下钻、导出/打印 |

## 菜单结构

| 一级菜单 | 说明 |
|---------|------|
| 工作台 | 辖区仓室卡片、在库概况、待办盘点、故障/维修动态 |
| 生产仓管理 | 概览、生产仓台账（仓室 CRUD）、出入库/故障/维修/盘点（聚合三类物资） |
| 备品备件 / 仪器仪表 / 工器具 | 各类别台账与业务子模块 |
| 人员管理 | 人员与角色（按数据范围可见） |
| 生产厂家 / 设备类型 | 三类物资的字典维护（**不含**生产仓设备类型） |
| 系统功能设置 | 组织机构、角色权限 |

**已排除：** 故障应急抢修模块

## 演示账号

密码均为 **`123456`**：

| 账号 | 组织 | 数据范围 | 典型用途 |
|------|------|----------|----------|
| `admin` | 东北分部 | 全部 | 全量数据、系统设置 |
| `ln_province` | 辽宁省公司 | 本单位及下级 | 省级视角 |
| `sy_city` | 沈阳地市公司 | 本单位及下级 | 地市隔离验证 |
| `hp_county` | 和平县公司 | 本单位及下级 | 县级视角 |
| `keeper01` | 运维一班 | 仅本组织 | 库管员，无系统菜单 |

## 快速启动

```bash
cd web
npm install
npm run dev
```

浏览器访问 http://localhost:5173

**公网演示：** https://wadecheung-sys.github.io/production-warehouse-management/

**数据重置：** 登录后顶栏用户菜单 →「恢复初始数据」；或清除浏览器 localStorage 中 `pwms_business` / `pwms_user_context`。

## 领域模型（v2.0）

```
Organization（组织树）
    └── WarehouseSite（生产仓地点 / 仓室主数据）
            └── AssetLedger（仓内物资：spare | instrument | tool）
                    └── InOut / Fault / Maintenance / Inventory
```

- `WarehouseSite`：仓室本身（地点、库管、面积等）
- `AssetLedger`：存放在某仓室内的备品/仪器/工器具，含 `warehouseId`
- `UserContext`：登录用户 org、角色、permissions、dataScope

## 技术栈

- Vue 3 + TypeScript + Vite 8
- Element Plus、Pinia、Vue Router
- Mock 默认开启（`VITE_USE_MOCK=true`）
- API 抽象层就绪（`src/api/`，可切换 HTTP 模式）

## 项目结构

```
web/src/
├── views/
│   ├── warehouse/     # 生产仓概览、生产仓台账（仓室）
│   ├── asset/         # 备品/仪器/工器具共用业务页
│   ├── dashboard/     # 工作台
│   └── system/        # 组织、角色
├── composables/       # useDataScope 等
├── utils/             # dataScope、permission、org
├── mock/              # 种子数据、演示账号、智慧仓环境 Mock
├── stores/            # data（业务）、user（登录上下文）
└── types/             # 领域类型
```

## 版本历史

### v2.0（当前）
- 生产仓地点主数据（`WarehouseSite`）与仓内物资分离
- 五级组织树 + 数据范围过滤 + 多角色演示账号
- 生产仓概览、智慧仓环境 Mock、工作台辖区视图
- 角色权限码（`ledger:edit`、`warehouse:view` 等）控制菜单与按钮

### v1.0
- 统一资产 CRUD、Mock 持久化、导出/打印、API 层抽象

## 对接后端

复制 `.env.production.example` 为 `.env.production`，设置 `VITE_USE_MOCK=false`，API 路径参照 `src/api/endpoints.ts`。

## 后续规划（v2.1+）

- 调拨 / 转仓、RFID 赋码、送检提醒
- 决策分析 / 全省一张图
- 真实后端 API 对接

## 参考

- 需求来源：`reference/`（本地，未入库）
- 过程文档：`workspace/`（本地，未入库）
