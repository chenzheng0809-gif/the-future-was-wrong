# THE FUTURE WAS WRONG.｜文明误读局

目标：约两分钟的完整叙事闭环，私人记忆自由书写、无倒计时。机器不替亲历者衡量感情，不评分。
技术：Vite / React / TypeScript / Tailwind / Three / R3F / Drei。
美术：LOST TOMORROWS。胡桃木 #513D32、旧纸 #E8DCC3、黄铜 #C69A62、橄榄 #87917D、青绿 #7AABA6。保留正式档案馆背景，不使用霓虹或 SaaS 风格。

状态：INTRO → DR_WRONG_AWAKENING → ARTIFACT_1/2/3 → CIVILIZATION_REVEAL → FINAL_ARTIFACT → ARCHIVE_DECISION → PRIVATE_MEMORY → ENDING。
三轮选项只显示 A–E 和解释，不显示文明名称或图标，读屏标签也不得泄露文明类型。已确认的路径纹章可在顶部收集槽展示。文明 ID 与确定性生成规则保持，最终揭晓和档案展示类型。

## 最新正式模型映射（本次用户明确改订，覆盖历史映射）
- Dr. Wrong：mr wrong.glb
- CAT：国王猫
- OCEAN：海洋.glb
- FUNGI：菌菇.glb
- MACHINE：Hi3D_复古科幻人形机器人3D模型_allparts_20261108_135658.glb
- WORKER：打工机器人.glb
- 三件遗物：milk-tea、airpods-max、photo-projector（第三轮已由用户改为照片投影仪，取代手写信）
所有资产和文明模型映射集中在 src/assets.ts；两个结果页面读取同一映射。五大文明均有正式模型，科幻机器人现已绑定 MACHINE。

## 资源与性能
只在开发阶段生成压缩衍生 GLB。scripts/optimize-models.mjs 使用 Meshopt 几何压缩、16位位置量化及最大2048像素WebP贴图；不减面。运行时只加载 public/models 中的本地 GLB，解码器随应用打包，不依赖 CDN。原始文件保存在 work/original-models，Downloads 源文件不改动。原始与压缩校验值见 outputs/模型压缩报告.json。所有模型 URL 使用 v=3 避免旧缓存。
活动场景最多一个 Canvas。静态模型按需渲染；退出场景释放材质、纹理、几何和加载缓存，兼容 StrictMode。加载失败或渲染异常用2D复原图回退，可重试，不阻断剧情。
普通合影为内置 imagegen 创作，public/images/memory-photo.png；正式背景及正式模型不得随意替换。独立馆长头像未提供，继续标注轮廓占位。

## 界面与隐私
三轮：旧纸资料卡＋中央模型＋右侧对白、选项、常驻确认按钮。手机换轮回到顶部。
后半段：大型文明标题＋纸质报告；叠放相片＋平等三分支；邮戳信纸；最终档案突出玩家原文。
私人记忆只存当前 React 会话内存，不写 localStorage、不上传、不发送 AI。存在非空记忆时，返回/重开显示清除确认，刷新注册 beforeunload 提醒。复制仅由玩家主动触发。
禁止数据库、账号、多人、外部 AI API、情感评分和默认持久化记忆。

验证命令：npm test；npm run build。离线重新压缩：npm run models:optimize（需要 work/original-models 原始文件）。组件与解码器测试不能替代实际 WebGL、朝向与手机帧率验收，不得虚构结果。
