# TodoApp - 待办事项管理应用

一个现代化的待办事项管理应用，提供直观的用户界面和丰富的功能。

## 功能特点

- 📝 待办事项管理
  - 创建、编辑、删除待办事项
  - 设置标题、描述、截止日期和优先级
  - 标记待办事项为已完成
  - 按优先级和完成状态筛选

- 📅 日历视图
  - 月历视图展示待办事项
  - 快速切换月份
  - 显示每日待办事项数量和预览
  - 选择日期添加/查看待办事项

- 📋 列表和标签
  - 创建自定义列表
  - 添加标签分类待办事项
  - 按列表或标签筛选待办事项

## 技术栈

### 前端
- **框架**: Next.js 14+ (App Router)
- **UI 组件**: 
  - Tailwind CSS (样式)
  - HeadlessUI (无样式组件)
  - HeroIcons (图标)
- **状态管理**: React Context API
- **日期处理**: date-fns

### 后端
- **API**: Next.js API Routes
- **数据库**: NeonDB (PostgreSQL)
- **ORM**: Prisma
- **认证**: NextAuth.js (计划中)

## 项目结构

src/
├── app/                    # Next.js App Router 目录
│   ├── api/               # API 路由
│   │   └── todos/        # 待办事项 API
│   ├── calendar/         # 日历视图页面
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── components/           # React 组件
│   ├── AddTodoForm.tsx   # 添加待办事项表单
│   ├── Calendar.tsx      # 日历组件
│   ├── EditTodoForm.tsx  # 编辑待办事项表单
│   └── TodoList.tsx      # 待办事项列表
├── lib/                  # 工具函数和配置
│   └── prisma.ts        # Prisma 客户端配置
└── styles/              # 样式文件
    └── globals.css      # 全局样式

## 数据库设计

### 表结构
- \`users\`: 用户信息
- \`todos\`: 待办事项
- \`lists\`: 自定义列表
- \`todo_lists\`: 待办事项与列表关联
- \`tags\`: 标签
- \`todo_tags\`: 待办事项与标签关联

## 开发指南

### 环境要求
- Node.js 18+
- npm 或 yarn
- PostgreSQL (通过 NeonDB 提供)

### 环境变量
创建 \`.env\` 文件并添加以下配置：
\`\`\`env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
\`\`\`

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 数据库迁移
\`\`\`bash
npx prisma generate   # 生成 Prisma Client
npx prisma db push    # 同步数据库架构
\`\`\`

### 开发服务器
\`\`\`bash
npm run dev
\`\`\`
访问 http://localhost:3000

### 构建生产版本
\`\`\`bash
npm run build
npm start
\`\`\`

## API 文档

### 待办事项 API
- \`GET /api/todos\` - 获取所有待办事项
- \`POST /api/todos\` - 创建新待办事项
- \`PUT /api/todos/:id\` - 更新待办事项
- \`DELETE /api/todos/:id\` - 删除待办事项

### 列表 API (计划中)
- \`GET /api/lists\` - 获取所有列表
- \`POST /api/lists\` - 创建新列表
- \`PUT /api/lists/:id\` - 更新列表
- \`DELETE /api/lists/:id\` - 删除列表

### 标签 API (计划中)
- \`GET /api/tags\` - 获取所有标签
- \`POST /api/tags\` - 创建新标签
- \`PUT /api/tags/:id\` - 更新标签
- \`DELETE /api/tags/:id\` - 删除标签

## 部署说明

1. **准备工作**
   - 创建 NeonDB 数据库
   - 配置环境变量
   - 准备生产环境域名和 SSL 证书

2. **部署选项**
   - Vercel (推荐)
     1. 连接 GitHub 仓库
     2. 配置环境变量
     3. 自动部署
   
   - 自托管
     1. 克隆代码仓库
     2. 安装依赖
     3. 构建生产版本
     4. 使用 PM2 或 Docker 运行

3. **数据库迁移**
   ```bash
   npx prisma db push
   ```

## 开发计划

- [ ] 用户认证
  - [ ] 邮箱注册/登录
  - [ ] 社交媒体登录
  - [ ] 密码重置

- [ ] 列表和标签功能
  - [ ] 创建和管理列表
  - [ ] 添加和管理标签
  - [ ] 按列表/标签筛选

- [ ] 提醒功能
  - [ ] 邮件提醒
  - [ ] 浏览器通知
  - [ ] 自定义提醒时间

## 贡献指南

1. Fork 项目
2. 创建功能分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交更改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 创建 Pull Request

## 许可证

[MIT License](LICENSE)