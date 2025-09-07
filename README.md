# TodoApp - 待办事项管理应用

一个现代化的待办事项管理应用，提供直观的用户界面和丰富的功能。

## 项目结构

```
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
```
