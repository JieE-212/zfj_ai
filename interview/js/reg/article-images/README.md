# 文章配套图片说明

> 文章路径：`../article-juejin.md`
> ✅ **SVG 矢量图已生成！** 所有 7 张图片均为 SVG 格式，可直接在浏览器中打开查看，也支持导入 Figma/Illustrator 进一步编辑。
> 💡 如需 PNG/JPG 格式用于掘金发布，可用浏览器打开 SVG 后截图导出，或用 `inkscape --export-type=png *.svg` 批量转换。

---

## 图片清单与放置位置

| 序号 | 文件名 | 放置位置 | 类型 |
|------|--------|----------|------|
| 1 | `01-cover.svg` | 文章顶部，标题下方（封面图） | SVG 矢量 |
| 2 | `02-basics.svg` | 第二章"正则表达式基础三要素"末尾 | SVG 矢量 |
| 3 | `03-phone-validation.svg` | 第三章"手机号验证"代码块之后 | SVG 矢量 |
| 4 | `04-match-extraction.svg` | 第四章"字符串提取"代码块之后 | SVG 矢量 |
| 5 | `05-replace-capture.svg` | 第五章 5.2 节"代码实现"之后 | SVG 矢量 |
| 6 | `06-template-engine.svg` | 第六章"模板引擎"代码块之后 | SVG 矢量 |
| 7 | `07-learning-path.svg` | 第八章"学习路径"末尾 | SVG 矢量 |

> 温馨提示：掘金支持直接上传 SVG 文件，但部分场景下 PNG 兼容性更好。建议在浏览器中打开 SVG → 截图 → 保存为 PNG（2x 分辨率）后上传。
| 2 | `02-basics.png` | 第二章"正则表达式基础三要素"末尾 | 800×500 |
| 3 | `03-phone-validation.png` | 第三章"手机号验证"代码块之后 | 800×600 |
| 4 | `04-match-extraction.png` | 第四章"字符串提取"代码块之后 | 800×500 |
| 5 | `05-replace-capture.png` | 第五章 5.2 节"代码实现"之后 | 800×550 |
| 6 | `06-template-engine.png` | 第六章"模板引擎"代码块之后 | 800×550 |
| 7 | `07-learning-path.png` | 第八章"学习路径"末尾 | 800×500 |

---

## AI绘图详细 Prompt

### 图片 1：`01-cover.png` — 头图

**中文 Prompt（通义万相 / 文心一格）：**
> 一幅科技感插画，画面中心是一个发光的正则表达式符号 `/^1[3-9]\d{9}$/`，周围环绕着抽象的代码字符流（花括号、方括号、反斜杠、数字等）像魔法符文一样漂浮。配色方案：深蓝色背景，霓虹紫和青色的代码字符，金色高光点缀。风格：赛博朋克与魔法世界的融合，4K，高质量，适合技术博客封面。

**English Prompt（Midjourney / DALL·E 3）：**
> A tech-magic hybrid illustration for a blog cover. In the center, a glowing regular expression `/^1[3-9]\d{9}$/` floats like a magical incantation. Surrounding it, abstract code symbols — curly braces `{}`, square brackets `[]`, backslashes, digits — drift through the air like glowing runes. Color scheme: deep navy blue background, neon purple and cyan code characters, warm gold accents on the central regex. Style: cyberpunk meets fantasy magic, clean composition with ample negative space for text overlay. 4K, high quality, technical blog cover art, aspect ratio 16:9. --ar 16:9 --v 6

---

### 图片 2：`02-basics.png` — 正则基础三要素图解

**中文 Prompt：**
> 一张信息图解，三列并排展示正则表达式的三个核心概念。左列：`[]` 字符范围，配图是一个方框内包含可选字符 3、4、5、6、7、8、9。中列：`{}` 匹配次数，配图是一个计数器显示数字 9。右列：`\d` 预定义字符，配图是数字 0-9 组成的圆环。顶部标题"正则三要素"。风格：简洁扁平的科普插画，白底为主，蓝色和橙色强调色，适合技术文章内插图。

**English Prompt：**
> An educational infographic showing three core concepts of Regular Expressions in three columns. Left column: `[]` character range — illustrated as a box containing selectable characters 3,4,5,6,7,8,9. Middle column: `{}` quantifier — illustrated as a counter dial showing the number 9. Right column: `\d` predefined character class — illustrated as a ring of digits 0-9. Title at top: "Regex Core Concepts". Style: clean flat vector illustration, white background, blue and orange accent colors, suitable for in-article technical illustration. --ar 16:10 --v 6

---

### 图片 3：`03-phone-validation.png` — 手机号验证流程图

**中文 Prompt：**
> 一张手机号正则验证的流程图解。左侧是一个手机输入框显示"13888888888"，右侧逐步拆解正则表达式 `/^1[3-9]\d{9}$/`：第1位 `1`（红色高亮）、第2位 `[3-9]`（橙色高亮，标注"不能是0/1/2"）、后9位 `\d{9}`（绿色高亮，标注"任意数字×9"），首尾的 `^` 和 `$` 有锚点图标。底部展示 ✓ 通过 和 ✗ 不通过的测试用例对比。风格：现代UI设计风格，深色主题，带有代码编辑器配色。

**English Prompt：**
> A visual breakdown of phone number regex validation. Left side: a phone input field showing "13888888888". Right side: the regex `/^1[3-9]\d{9}$/` exploded step by step — position 1 `1` highlighted in red, position 2 `[3-9]` in orange with annotation "Cannot be 0/1/2", remaining 9 digits `\d{9}` in green with annotation "Any digit ×9". Anchor symbols `^` and `$` shown as lock icons at boundaries. Bottom: side-by-side comparison of ✓ passing and ✗ failing test cases. Style: modern dark-themed UI design, code-editor-inspired color palette (one dark pro vibes). --ar 4:3 --v 6

---

### 图片 4：`04-match-extraction.png` — 字符串提取示意图

**中文 Prompt：**
> 一张图解，展示正则表达式 `/\d+/g` 如何从字符串中提取数字。顶部是一个原始字符串"价格是100元，进价是80元，赚了20元"。中间是正则引擎的"扫描线"从左到右扫描，每次遇到连续数字就高亮捕获。底部显示提取结果数组 `['100', '80', '20']`，每个结果用不同颜色标记并连线回原字符串。左侧标注 `g` 修饰符 = "全局匹配，不停止"，`\d+` = "一个或多个数字"。风格：扁平矢量图解，浅色背景。

**English Prompt：**
> An infographic showing how the regex `/\d+/g` extracts numbers from a string. Top: the original Chinese string "价格是100元，进价是80元，赚了20元" (Prices: 100 yuan, cost 80 yuan, profit 20 yuan). Middle: a scanning beam moving left to right across the text, highlighting consecutive digits as it finds them. Bottom: the result array `['100', '80', '20']` with each number color-coded and connected back to its position in the source string via colored lines. Left sidebar annotations: `g` flag = "global match, don't stop", `\d+` = "one or more digits". Style: clean flat vector infographic, light background. --ar 16:10 --v 6

---

### 图片 5：`05-replace-capture.png` — 分组替换原理图

**中文 Prompt：**
> 一张展示正则分组 `(\w)` 捕获与替换原理的图解。原始字符串"hello-world"显示在顶部。中间的箭头指向正则 `/-(\w)/` 的匹配过程：`-w` 被完整匹配（灰色高亮），其中 `w` 被分组 `()` 单独捕获（橙色高亮，箭头指向"分组1"标签）。下方展示 `replace()` 回调函数的参数映射：第1个参数 = `'-w'`（完整匹配），第2个参数 = `'w'`（分组捕获）。底部显示结果 `helloWorld`，其中 `W` 被高亮为大写。风格：现代技术图解，代码风格配色。

**English Prompt：**
> A technical illustration showing regex capture group mechanics in string replacement. Top: the source string "hello-world". Middle arrow pointing to the regex `/-(\w)/` matching process — `-w` is the full match (gray highlight), and the `w` inside parentheses is separately captured (orange highlight with arrow to "Group 1" label). Below: the `replace()` callback function parameter mapping — parameter 1 = `'-w'` (full match), parameter 2 = `'w'` (captured group). Bottom: the result `helloWorld` with the uppercase `W` highlighted. Style: modern code-themed technical diagram, dark background with syntax-highlighting-inspired colors. --ar 16:11 --v 6

---

### 图片 6：`06-template-engine.png` — 模板引擎递归示意图

**中文 Prompt：**
> 一张展示递归模板引擎执行过程的图解。三个步骤从左到右排列。步骤1：模板"我是{{name}}，年龄{{age}}，性别{{sex}}"中，正则匹配到 `{{name}}`（高亮），提取变量名 `name`。步骤2：将 `{{name}}` 替换为数据中的"赖庆庆"，剩余模板显示为"我是赖庆庆，年龄{{age}}，性别{{sex}}"，其中 `{{age}}` 被高亮。步骤3：最终结果"我是赖庆庆，年龄17，性别男"完整显示，一个循环箭头标注"递归调用，直到没有 {{}}"。底部展示 `person` 数据对象作为数据源。风格：流程图风格，纵向为主，现代配色。

**English Prompt：**
> A three-step flowchart illustrating a recursive template engine. Step 1: The template "我是{{name}}，年龄{{age}}，性别{{sex}}" with `{{name}}` highlighted — regex extracts variable name `name`. Step 2: `{{name}}` replaced with "赖庆庆", now showing "我是赖庆庆，年龄{{age}}，性别{{sex}}" with `{{age}}` highlighted. Step 3: Final result "我是赖庆庆，年龄17，性别男" fully rendered. A curved recursive arrow labeled "Recursively call until no {{}} remains" loops from step 2 back. Bottom: the `person` data object `{name: '赖庆庆', age: 17, sex: '男'}` shown as the data source. Style: clean flowchart style, modern color palette, light background. --ar 16:11 --v 6

---

### 图片 7：`07-learning-path.png` — 正则学习路径图

**中文 Prompt：**
> 一张正则表达式学习路径的阶梯图。自下而上的五个台阶：台阶1"字符类 [] 与 量词 {}"（灰色基石图标），台阶2"锚点 ^ 和 $"（锁图标），台阶3"分组 () 与引用"（链接图标，标注"分水岭"），台阶4"修饰符 g/i/m"（旗帜图标），台阶5"项目实战"（火箭图标，金色高亮）。右侧标注每个阶段的关键词和避坑提示。风格：现代扁平化阶梯图，渐变配色（从灰色到金色），激励感。

**English Prompt：**
> A staircase-style learning path diagram for Regular Expressions. Five ascending steps from bottom to top: Step 1 "Character Classes [] & Quantifiers {}" (foundation stone icon, gray), Step 2 "Anchors ^ and $" (lock icon), Step 3 "Groups () & Backreferences" (link icon, labeled "Watershed"), Step 4 "Flags g/i/m" (flag icon), Step 5 "Real Project Practice" (rocket icon, highlighted in gold). Right side annotations show key concepts and common pitfalls for each step. Style: modern flat staircase diagram with gradient color scheme (gray to gold), motivational feel. --ar 16:10 --v 6

---

## 图片使用说明

1. 将生成的图片按上述文件名保存到当前文件夹（`article-images/`）
2. 文章 `article-juejin.md` 中已用 `![图片名]` 占位符标注了每张图片的位置
3. 发布到掘金时将占位符替换为实际图片上传后的链接
4. **头图**（`01-cover.png`）建议上传为掘金文章的封面图，其余图片作为正文插图

---

## 快速生成命令（Midjourney）

将以下命令逐条复制到 Midjourney Discord 中即可：

```
/imagine prompt: A tech-magic hybrid illustration for a blog cover... (见上方 English Prompt 1)
/imagine prompt: An educational infographic showing three core concepts... (见上方 English Prompt 2)
/imagine prompt: A visual breakdown of phone number regex validation... (见上方 English Prompt 3)
/imagine prompt: An infographic showing how the regex... (见上方 English Prompt 4)
/imagine prompt: A technical illustration showing regex capture group mechanics... (见上方 English Prompt 5)
/imagine prompt: A three-step flowchart illustrating a recursive template engine... (见上方 English Prompt 6)
/imagine prompt: A staircase-style learning path diagram for Regular Expressions... (见上方 English Prompt 7)
```
