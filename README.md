# 智慧化生产专业仓管理系统

本仓库为 **智慧化生产专业仓管理系统** 的前端演示工程，完整代码位于 [`web/`](./web/) 目录。

## 启动

```bash
cd web
npm install
npm run dev
```

访问 http://localhost:5173

**当前版本：v2.0** — 生产仓地点主数据、组织数据权限、多角色演示、智慧仓环境 Mock

详细功能说明、演示账号与领域模型见 **[web/README.md](./web/README.md)**。

**公网演示：** https://wadecheung-sys.github.io/production-warehouse-management/

## 演示账号（密码均为 123456）

| 账号 | 说明 |
|------|------|
| `admin` | 全部数据 |
| `sy_city` | 沈阳地市及下级 |
| `keeper01` | 运维一班库管员 |

更多账号见登录页或 `web/src/mock/auth.ts`。
