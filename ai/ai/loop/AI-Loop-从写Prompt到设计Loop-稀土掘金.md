# AI Loop：别再给 AI 写提示词了，你应该去设计 Loop

> 一条推文引来 700 万人围观，Claude Code 作者也说："我不写 Prompt，我 Loop。"

---

## 一、你在手动，别人在自动化

先问你一个问题：**你每天跟 AI 协作，有多少时间花在了"反复改提示词"上？**

写一个 Prompt → 看结果 → 不满意 → 改 Prompt → 再看结果 → 还是不满意 → 再改……

这个循环，99% 的人都在**手动**做。你盯着屏幕，像个质检员一样，一遍遍地判断 AI 的输出好不好，然后一遍遍地调整措辞。你以为是你在用 AI，实际上是 AI 在用你——用你的时间、你的注意力、你的判断力。

但有一群人已经开始用另一种方式工作：**他们不写 Prompt，他们设计 Loop。**

这不是什么高深的理论。Loop（循环）是计算机科学最基础的能力之一——从哪开始，重复做什么，什么时候停。一万行数据要逐行检查格式，你不会一行行手动改，你会写一个循环程序。那为什么面对 AI，你还在手动循环？

---

## 二、什么是 AI Loop？

AI Loop 的核心思想极其简单，只有三个要素：

1. **从哪开始（Start）**：定义你的目标和约束条件
2. **重复做什么（Repeat）**：生成 → 校验 → 反馈，循环往复
3. **什么时候停（Stop）**：达到目标、超出预算、或者连续无效

用伪代码表示就是这样：

```
while (!goalReached && !overBudget) {
    output = AI.generate(task)
    result = AI.check(output, rules)
    if (result.pass) break
    feedback(result.fail)  // 把失败的规则反馈给下一轮
}
```

你看，这和训练大语言模型的底层逻辑一模一样——拿一批数据给模型看，算它错了多少，调整参数，再来一轮。万亿次循环之后，AI 就学会了对话和推理。

**DeepSeek 是 Loop 跑出来的，Claude 是 Loop 跑出来的，Qwen 也是 Loop 跑出来的。**

训练的底层都是同一个逻辑：**生成 → 评估 → 调整 → 再来。** 既然 AI 自己都是 Loop 训练出来的，那用 AI 的最佳方式，凭什么不是 Loop？

---

## 三、一个真实的 AI Loop 实战

光说不练假把式。我们来看一个可以直接运行的 AI Loop 实现——用 DeepSeek 自动生成小红书爆款文案。

### 3.1 项目结构

```
loop/
├── readme.md          # 核心理念
└── demo/
    ├── .env           # API 密钥配置
    ├── main.mjs       # Loop 核心代码
    ├── package.json   # 依赖：openai + dotenv
    └── pnpm-lock.yaml
```

技术栈非常简单：Node.js + OpenAI SDK（兼容 DeepSeek API）+ dotenv。仅此而已，不需要任何框架，不需要复杂的架构。

### 3.2 核心代码解析

首先，定义 Loop 的**三大刹车机制**：

```javascript
const limit = {
  maxRound: 5,    // 最多跑 5 轮，防止死循环
  maxToken: 2000, // Token 预算上限，防止费用爆炸
  sameStop: 2     // 连续 2 次结果相同则停止（收敛信号）
}
```

这三种停止策略分别对应不同的场景：

- **maxRound（最大轮次）**：防止任务本身无法完成时无限循环。比如你让 AI "写一首超越李白的诗"，它可能永远达不到。
- **maxToken（Token 预算）**：直接控制成本。再好的文案，也不值得花 100 块钱的 API 费用。
- **sameStop（收敛检测）**：当连续 N 次输出都一样，说明模型已经"江郎才尽"，继续循环只是在浪费 Token。

然后是**任务定义**：

```javascript
const task = {
  desc: '小红书美妆文案',
  rules: [
    "标题带数字",
    "正文小于300字",
    "大爆款",
    "结尾有行动号召"
  ]
}
```

注意这里的 `rules`——它们不是 Prompt 里的"建议"，而是**可被程序校验的硬约束**。这是 AI Loop 与普通 Prompt 的本质区别：你的要求不是"希望能做到"，而是"必须通过检查"。

接下来是 Loop 的两个核心函数：

```javascript
// 生成函数 —— 负责"干活"
async function gen() {
  const res = await client.chat.completions.create({
    model: 'deepseek-v4-flash',
    messages: [{
      role: 'user',
      content: `假如你是一位资深小红书美妆博主，
        写一篇${task.desc}，严格遵守：
        ${task.rules.join('、')}，只输出文案`
    }]
  })
  return {
    text: res.choices[0].message.content.trim(),
    token: res.usage.total_tokens,
  }
}

// 校验函数 —— 负责"把关"
async function check(text) {
  const res = await client.chat.completions.create({
    model: 'deepseek-v4-flash',
    messages: [{
      role: 'user',
      content: `校验文案${text}
        规则：${task.rules.join('、')}
        仅输出JSON{pass: 布尔, fail: 数组}`
    }]
  })
  return JSON.parse(res.choices[0].message.content.trim())
}
```

这里有一个关键设计：**生成和校验分离**。

`gen()` 只管创作，`check()` 只管评审。同一个模型扮演两个角色——先是创作者，再是裁判。这种"一人分饰两角"的模式，让 AI 自己对自己的输出进行质量把关，你不需要盯着屏幕看。

最后是主循环：

```javascript
async function runLoop() {
  console.log('AI Loop 开始')
  while (!needStop()) {
    console.log(`\n第${round}轮`)
    round++
    const { text, token } = await gen()
    totalToken += token

    // 收敛检测
    sameCount = text === lastText ? sameCount + 1 : 0
    lastText = text
    lastResult = text

    // 规则校验
    const { pass, fail } = await check(text)
    if (pass) {
      console.log('全部规则通过，循环结束')
      console.log(`最终的文案：${text}`)
      return
    }
    console.log(`不满足${fail}`)
  }
  // 触发刹车
  console.log(`\n触发刹车强制停止，最后一次内容：${lastResult}`)
  console.log(`\n结束，总 token：${totalToken}`)
}
```

### 3.3 运行效果

当你执行 `node main.mjs`，你会看到类似这样的输出：

```
AI Loop 开始

第1轮
不满足["正文超过300字", "结尾缺少行动号召"]

第2轮
不满足["标题没有数字"]

第3轮
全部规则通过，循环结束
最终的文案：5款平价粉底液测评...
```

整个过程，你不需要做任何事情。你只需要在开始之前定义好目标和规则，然后 Loop 自动运行，直到产出满足所有条件的结果——或者触发刹车条件，把当前最好的结果返回给你。

---

## 四、Loop 的三种停止策略深度解析

前面提到了三种刹车机制，这里展开讲讲它们在实际应用中的意义。

### 4.1 maxRound —— 防止死循环

这是最直观的保护机制。有些任务天然需要多轮迭代，比如代码生成（生成 → 运行 → 看报错 → 修复），但你不希望它永远跑下去。设置一个合理的上限，比如 5 轮或 10 轮，确保程序最终一定会停下来。

### 4.2 maxToken —— 成本控制

很多人没意识到，AI Loop 的最大风险不是"跑不出来"，而是"Token 大爆炸"。每次循环都在消耗 Token，如果任务很难达标，费用可能会远超预期。maxToken 就像给 Loop 装了一个"油表"——油烧完了就停，避免账单失控。

**实际建议：** 对于简单任务（文案生成、翻译校对），设 2000-5000 Token 足够；对于复杂任务（代码重构、长文写作），可以放宽到 10000-20000 Token。

### 4.3 sameStop —— 收敛检测

这是最巧妙的一个。当模型连续输出相同的内容，意味着在当前约束下它已经找不到更好的解了。继续循环只是在原地踏步，白白烧 Token。sameStop 让 Loop 具备了"自知之明"——知道什么时候该认输。

这三种策略可以组合使用，也可以根据业务场景自定义。比如你还可以加入：
- **timeStop**：超过 N 秒停止（适合对延迟敏感的场景）
- **qualityThreshold**：达到某个质量分数停止（适合有明确评分标准的场景）
- **humanInTheLoop**：每 N 轮暂停，等人工确认后继续（适合高风险决策场景）

---

## 五、从"写 Prompt"到"设计 Loop"的思维转变

这才是本文最想传达的核心洞见。

### 旧范式：写 Prompt

```
你 → 写 Prompt → AI 生成 → 你看结果 → 改 Prompt → AI 再生成 → ...
```

你在这个循环的**里面**，你是循环的一部分。你的时间和注意力被绑定了。

### 新范式：设计 Loop

```
你 → 定义目标 + 规则 + 停止条件 → AI Loop 自动运行 → 你拿到最终结果
```

你在循环的**外面**，你是循环的设计者。你只需要在一开始投入思考，剩下的交给机器。

这个转变的意义不亚于从"手工作坊"到"流水线"的跨越。在工业革命之前，每个产品都是工匠亲手做的；工厂出现后，工匠变成了工厂的设计者——他们不再亲手做每一个产品，而是设计能自动生产产品的机器。

AI Loop 就是 AI 时代的"自动化流水线"。**你的角色从"操作工"变成了"工程师"。**

---

## 六、AI Loop 的深层哲学

回到文章开头那句话：Claude Code 的作者说"我也不写 Prompt，我也 Loop"。

Claude Code 的底层工作方式其实就是一个巨大的 Loop：理解用户意图 → 生成代码 → 执行 → 看结果 → 修正 → 再执行。这个循环不断地转，直到任务完成或者用户叫停。

你会发现，几乎所有真正好用的 AI 产品，底层都是一个 Loop：
- **Cursor / Claude Code**：生成代码 → 运行 → 看报错 → 修复 → 再运行
- **Devin（AI 程序员）**：理解需求 → 写代码 → 测试 → 修 Bug → 提交 PR
- **AI 搜索（Perplexity）**：生成查询 → 搜索 → 评估结果 → 优化查询 → 再搜索

Loop 不是某个特定产品的功能，而是**AI 应用的底层范式**。

更进一步想，人类的思考方式本身也是一个 Loop：观察 → 假设 → 验证 → 修正假设 → 再观察。科学方法是 Loop，设计思维（Design Thinking）是 Loop，精益创业（Build-Measure-Learn）也是 Loop。

**Loop 是智能的底层操作系统。**

---

## 七、优势与挑战

### 优势

1. **解放人力**：你不再需要盯着 AI 干活，Loop 自动迭代直到出结果。
2. **质量可控**：规则是可编程的、可复现的，不是"看感觉"。
3. **可扩展**：一个 Loop 可以处理一批任务（比如批量生成 100 篇文案），你只需要改参数。
4. **成本透明**：maxToken 让你清楚地知道最多花多少钱。

### 挑战

1. **Token 大爆炸**：如果规则太严格或者任务太模糊，Loop 可能会消耗大量 Token。解决方法是合理设置刹车条件，以及选择性价比高的模型（比如代码示例中用的 deepseek-v4-flash）。
2. **规则设计难度**：好的规则需要能清晰量化。像"大爆款"这种模糊规则，AI 的评判也不一定可靠。
3. **适用边界**：不是所有任务都适合 Loop。简单的翻译、摘要可能一轮就够了；而创意类任务（写诗、作曲）的"好"很难用规则定义。
4. **校验的准确性**：用 AI 校验 AI 的输出，存在"裁判也犯错"的可能。对于关键任务，建议加入人工抽检环节。

---

## 八、如何开始你的第一个 AI Loop

给你一个最小的启动模板：

1. **选一个重复性任务**：比如写周报、生成测试用例、翻译文档。
2. **定义 3-5 条可检查的规则**：比如"包含本周的关键数据""不超过 500 字""使用项目符号列表"。
3. **设置刹车条件**：maxRound=5, maxToken=3000, sameStop=2。
4. **用你熟悉的语言写一个 Loop**：Python、JavaScript、甚至 Shell 脚本都可以。
5. **跑起来，观察，调优**。

本文的示例代码就是一个完整的起点，你只需要换掉 `task.desc` 和 `task.rules`，就能适配不同的场景。

---

## 九、写在最后

2025 年，AI 编程工具爆发式增长，但大多数人还停留在"写更好的 Prompt"的思维里。Prompt Engineering 当然重要，但它只是"术"——让你在手动循环中效率更高。

而 AI Loop，是"道"——让你从根本上改变与 AI 协作的方式。

**别再给 AI 写提示词了，你应该去设计 Loop。**

当你的 Loop 在后台自动运转、不断优化输出的时候，你已经在做更重要的事情了——而那个还在改 Prompt 的人，还在盯着屏幕。

---

> **代码地址**：[GitHub - AI Loop](https://github.com)
>
> **运行方式**：
> ```bash
> cd demo
> pnpm install
> # 配置 .env 中的 API Key
> node main.mjs
> ```
>
> **技术栈**：Node.js + DeepSeek API + OpenAI SDK

---

*本文首发于稀土掘金，转载请注明出处。*
