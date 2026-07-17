# 会议纪要 / Meeting Minutes

---

## 一、会议基本信息 / Meeting Basic Info

| 项目 / Item | 内容 / Content |
|---|---|
| **会议主题 / Subject** | XX云迁移项目复盘会 / XX Cloud Migration Project Review |
| **日期 / Date** | 未提及 / Not mentioned |
| **时间 / Time** | 09:30 — 09:39 |
| **地点 / Location** | 未提及 / Not mentioned |
| **主持人 / Chair** | 陈总 / Mr. Chen |
| **记录人 / Note Taker** | 未提及 / Not mentioned |
| **参会人员 / Attendees** | 陈总（主持人）、张鹏（技术负责人）、李明（后端开发）、王婷（测试负责人）、赵强（运维负责人） / Mr. Chen (Chair), Zhang Peng (Tech Lead), Li Ming (Backend Developer), Wang Ting (Test Lead), Zhao Qiang (Ops Lead) |
| **缺席人员 / Absentees** | 无 / None |

---

## 二、会议目标 / Meeting Objectives

| 目标 / Objective | 说明 / Description |
|---|---|
| **会议目的 / Purpose** | 针对XX云迁移项目当前遇到的进度延迟与各项技术/管理问题进行复盘，明确解决方案与分工 / Review the delays and technical/management issues in the XX Cloud Migration Project; define solutions and assign responsibilities |
| **预算/资源 / Budget & Resources** | 云原生监控CloudMonitor年费约15万元需评估；人力方面涉及技术、测试、运维各线人员 / CloudMonitor annual fee ~150,000 RMB to be evaluated; personnel from tech, testing, and ops teams involved |
| **背景信息 / Background** | XX云迁移项目已执行三个月，迁移进度约60%，比原计划晚约两周。涉及从Oracle迁移至PostgreSQL，需处理200+存储过程、数据一致性验证、云上运维监控方案、停机窗口等多项问题 / The XX Cloud Migration Project has been running for 3 months, ~60% complete, ~2 weeks behind schedule. The migration involves moving from Oracle to PostgreSQL, with challenges including 200+ stored procedures, data consistency verification, cloud monitoring, and downtime window negotiation |

---

## 三、会议内容 / Meeting Discussion

### 议题一 / Topic 1：数据迁移与存储过程处理 / Data Migration & Stored Procedure Handling

**讨论要点 / Key Discussion Points：**

- 迁移进度完成约60%，比原计划延迟约两周 / Migration progress at ~60%, ~2 weeks behind schedule
- 原Oracle系统约200+存储过程，年代久远，原作者已离职，无人能完全理解 / 200+ legacy Oracle stored procedures, original authors have left, no one fully understands them
- 实际在用的估计仅40-50个，但无人能区分哪些在用、哪些废弃 / Only an estimated 40-50 are actually in use, but no one can identify which are active vs. deprecated

**主要观点 / Main Viewpoints：**

| 发言人 / Speaker | 观点 / Viewpoint |
|---|---|
| 张鹏 / Zhang Peng | 存储过程是迁移最大阻塞点，不敢直接迁移到PostgreSQL；真正在用的估计四五十个 / Stored procedures are the main blocker; cannot safely migrate directly to PostgreSQL |
| 李明 / Li Ming | 业务方也说不清哪些在用，原开发人员早已离职 / Business team also cannot identify active procedures; original developers left long ago |
| 陈总 / Mr. Chen | 建议部署监控脚本跑一个月，识别实际被调用的存储过程，不用的去掉，用到的逐个重写 / Proposed deploying a monitoring script for one month to identify actually invoked procedures, remove unused ones, rewrite the rest one by one |

**结论/决策 / Conclusion / Decision：**
- 张鹏负责部署存储过程监控脚本，监控周期一个月，监控结束后整理实际在用的存储过程清单 / Zhang Peng to deploy monitoring script for stored procedures, monitor for one month, then compile a list of actually-in-use procedures

---

### 议题二 / Topic 2：数据一致性验证 / Data Consistency Verification

**讨论要点 / Key Discussion Points：**

- 当前无人负责迁移后数据一致性验证 / No one is currently responsible for verifying data consistency post-migration
- 测试团队仅有功能测试能力，缺乏数据对比工具和专人 / Testing team only does functional testing; lacks data comparison tools and dedicated personnel
- 需开发自动化数据对比工具 / An automated data comparison tool needs to be built

**主要观点 / Main Viewpoints：**

| 发言人 / Speaker | 观点 / Viewpoint |
|---|---|
| 王婷 / Wang Ting | 测试团队只做功能测试，数据对比这块无工具也无人负责 / Testing team only handles functional testing; no tools or personnel for data comparison |
| 陈总 / Mr. Chen | 数据一致性验证至关重要，迁移数据不准确会导致上线灾难 / Data consistency verification is critical; discrepancies could lead to production disaster |
| 张鹏 / Zhang Peng | 可写自动化对比工具，两边数据库连接后直接对比 / Can build an automated comparison tool that connects to both databases for direct comparison |
| 李明 / Li Ming | 自愿承接开发任务，近期有空闲 / Volunteered for the task; has bandwidth recently |

**结论/决策 / Decision：**
- 李明一周内完成核心30张业务表的自动化数据对比工具开发；第二周起王婷团队使用工具进行数据一致性验证 / Li Ming to build the automated data comparison tool for 30 core business tables within one week; Wang Ting's team to start verification using the tool from week two

---

### 议题三 / Topic 3：云上运维监控方案 / Cloud Operations Monitoring Solution

**讨论要点 / Key Discussion Points：**

- 旧系统使用Zabbix监控，迁移至云上后监控方案未定 / Current system uses Zabbix; post-migration monitoring approach is undecided
- 云原生CloudMonitor需要额外年费约15万元 / Cloud-native CloudMonitor requires additional annual fee of ~150,000 RMB
- Zabbix可继续使用但维护成本较高 / Zabbix can be migrated and reused with no license cost but higher maintenance overhead
- 两个方案的监控指标不完全一致 / The two solutions have different monitoring metric sets

**主要观点 / Main Viewpoints：**

| 发言人 / Speaker | 观点 / Viewpoint |
|---|---|
| 赵强 / Zhao Qiang | 运维团队对两套方案尚未做出决策；CloudMonitor需额外付费15万/年 / Ops team has not decided between the two solutions; CloudMonitor costs extra 150K/year |
| 陈总 / Mr. Chen | 要求先出客观对比方案，覆盖优缺点、成本、风险，再与财务总监一起决策 / Requested an objective comparison covering pros/cons, cost, and risk; will decide together with CFO |

**结论/决策 / Decision：**
- 赵强下周内输出两套监控方案的对比文档（优缺点、成本、风险），提交陈总与财务总监评审 / Zhao Qiang to deliver a comparison document (pros/cons, cost, risk) by end of next week for review by Mr. Chen and CFO

---

### 议题四 / Topic 4：停机窗口调整 / Downtime Window Adjustment

**讨论要点 / Key Discussion Points：**

- 原与业务约定最多停机8小时，实际可能需要12小时 / Originally agreed downtime with business: max 8 hours; actual estimate now 12 hours
- 需与业务方重新确认停机窗口 / Need to renegotiate downtime window with business stakeholders

**主要观点 / Main Viewpoints：**

| 发言人 / Speaker | 观点 / Viewpoint |
|---|---|
| 张鹏 / Zhang Peng | 实际迁移时间需要约12小时，超出原约定8小时 / Actual migration requires ~12 hours, exceeding the original 8-hour agreement |
| 陈总 / Mr. Chen | 由张鹏负责与业务沟通，因其最了解技术细节，确认结果同步至项目群 / Zhang Peng to communicate with business team as he knows the technical details best; results to be shared in the project group |

**结论/决策 / Decision：**
- 张鹏负责与业务方沟通停机窗口调整（8→12小时），确认后同步至项目群 / Zhang Peng to negotiate downtime window extension (8→12 hours) with the business team and share the confirmed result in the project group chat

---

## 四、行动项 / Action Items

| 编号 / No. | 行动项 / Action | 负责人 / Owner | 截止日期 / Due Date | 优先级 / Priority | 状态 / Status |
|---|---|---|---|---|---|
| 1 | 部署存储过程监控脚本，监控一个月，整理实际在用的存储过程清单 / Deploy stored procedure monitoring script, monitor for one month, compile list of active procedures | 张鹏 / Zhang Peng | 监控结束后 / After monitoring period | 高 / High | 待开始 / Pending |
| 2 | 开发自动化数据对比工具，覆盖核心30张业务表 / Build automated data comparison tool for 30 core business tables | 李明 / Li Ming | 一周内 / Within 1 week | 高 / High | 待开始 / Pending |
| 3 | 使用数据对比工具进行数据一致性验证 / Perform data consistency verification using the comparison tool | 王婷 / Wang Ting | 第二周起 / Starting from week 2 | 高 / High | 待开始 / Pending |
| 4 | 输出云上监控方案对比文档（Zabbix vs CloudMonitor，含优缺点、成本、风险） / Deliver cloud monitoring solution comparison document (Zabbix vs CloudMonitor: pros/cons, cost, risk) | 赵强 / Zhao Qiang | 下周内 / By end of next week | 中 / Medium | 待开始 / Pending |
| 5 | 与业务方沟通停机窗口调整（8→12小时），确认结果同步至项目群 / Negotiate downtime window extension (8→12 hours) with business team, share result in project group | 张鹏 / Zhang Peng | 未提及 / Not mentioned | 高 / High | 待开始 / Pending |

---

## 五、下次会议 / Next Meeting

| 项目 / Item | 内容 / Content |
|---|---|
| **时间 / Time** | 下周一同一时间 09:30 / Next Monday, same time 09:30 |
| **议题预告 / Tentative Agenda** | 各行动项进度同步 / Progress sync on all action items |
