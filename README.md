# THE FUTURE WAS WRONG.｜文明误读局

启动：`npm install` → `npm run dev`。测试：`npm test`。生产：`npm run build`。生产预览：`npx vite preview`。
当前独立预览地址 http://localhost:5182/ 。默认 Vite 端口可用 `npm run dev -- --port 5182 --strictPort` 指定。

## 最新资源映射
| 模型文件 | 用途 |
|---|---|
| mr wrong.glb | Dr. Wrong |
| 国王猫 GLB | CAT 猫咪 |
| 海洋.glb | OCEAN 海洋共同体 |
| 菌菇.glb | FUNGI 菌菇 |
| 复古科幻人形机器人 GLB | MACHINE 机械共同体 |
| 打工机器人.glb | WORKER 加班共同体 |
| 珍珠奶茶杯 GLB | 第一轮 |
| 头戴式耳机 GLB | 第二轮 |
| 蒸汽朋克照片投影仪 GLB | 第三轮 |

五大文明模型现已齐全，第三轮按用户指定取代手写信。正式背景保留；普通朋友合影由内置 imagegen 创作，非真实历史照片，提示词见 outputs/美术素材说明.md。独立馆长肖像未提供，轻量头像仍是明确的 CRT 轮廓示意。

## 本次优化
9 个活动模型合计 **436.4 MiB → 124.9 MiB，减少71.4%**。保留网格面数；离线进行 Meshopt 几何压缩、16位位置量化和最大2048像素WebP贴图转换。原始 GLB 不修改，保存在 work/original-models；Downloads 文件保持原样。public/models 只提供优化版。压缩报告记录前后文件大小与 SHA-256。

`npm run models:optimize` 可从本地原始文件重建。源码包只包含优化版本；要重新压缩，先按目标模型名称准备 work/original-models 中的9个原始GLB。脚本拒绝将已压缩版本误作原始文件。优化是开发阶段步骤，游戏运行时不生成GLB，也不调用外部服务。

加载改进：本地 Meshopt 解码器随JS打包，不访问CDN；实际资源进度、失败回退、重试、重置视角、加载完成淡入。场景离开时释放几何、材质、纹理和GLTF缓存，防止一局依次浏览多个百万顶点模型后一直驻留。静态模型按需渲染，DPR上限1.25。

私人记忆：仅存内存。有非空文字时，返回首页/重新开始会先确认；刷新或关闭注册浏览器退出提醒。仍须主动复制才能导出，默认不上传、不分析、不评分、不写localStorage。

## 保留的完整流程
三轮各五选一（A–E＋解释，不提前显示文明类型）→ 确定性文明融合 → 正式文明角色/宣言/历史/三枚路径纹章 → 普通照片与翻面 → 三种平等归档分支 → 自由记忆书写或跳过 → 最终档案、复制、重开与首页。

## 结构
- src/App.tsx：状态机与会话记忆
- src/ArtifactScene.tsx、ArchiveVisuals.tsx：考古界面和线描/纹章
- src/NarrativeScenes.tsx：文明、照片、分支、信纸、最终档案
- src/ModelViewer.tsx、modelResources.ts：模型加载和资源生命周期
- src/ExitConfirmation.tsx：记忆清除确认
- src/game.ts、assets.ts：剧情、融合算法、正式资源映射
- src/style.css、interaction.css、narrative.css：统一复古视觉与响应式布局
- scripts/optimize-models.mjs：离线资源优化

## 验证与限制
17个测试、125种文明组合、TypeScript检查和生产构建通过。

125种选择组合保持有效、确定性与正确主导规则；模型文件头、内容长度、9份压缩文件的游戏实际解码器兼容性均有测试。三照片分支均可到达记忆卡，允许跳过，最终档案保留文明与原文。资源释放测试覆盖共享资源和StrictMode。

此前版本已实际看到奶茶、投影仪、猫咪、翻照片、选分支与信纸输入；**本次压缩优化后的浏览器连接连续超时，因此没有完成新的实际WebGL或手机帧率验收**。模型仍是百万顶点，文件缩小不代表低端手机帧率必然提高。生产构建的Three代码块体积警告仍存在。当前不含独立馆长肖像和音频。
