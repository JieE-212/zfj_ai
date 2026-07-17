#!/bin/bash
WS="C:/Users/ZFJJi/Desktop/workspace/zfj_ai/ai/ai/skills/hys/meeting/.claude/skills/meeting-minutes-workspace/iteration-1"

grade_file() {
  local out="$1"
  local name="$2"
  local passed=0 failed=0 total=0
  local expectations="["

  check() { grep -qi "$1" "$out" 2>/dev/null && return 0 || return 1; }

  add_result() {
    local text="$1" p="$2" ev="$3"
    [ "$expectations" != "[" ] && expectations+=","
    expectations+="{\"text\":\"$text\",\"passed\":$p,\"evidence\":\"$ev\"}"
    [ "$p" = "true" ] && passed=$((passed+1)) || failed=$((failed+1))
  }

  case "$name" in
    eval-product-planning)
      total=10
      check "会议基本信息\|Meeting Basic Info" && add_result "has basic info section" true "found" || add_result "has basic info section" false "not found"
      (check "刘总" && check "赵PM" && check "王工" && check "小周") && add_result "all 4 attendees" true "all found" || add_result "all 4 attendees" false "missing some"
      check "onboarding" && check "搜索" && check "推送" && add_result "three topics covered" true "all found" || add_result "three topics covered" false "missing"
      check "15%" && add_result "retention rate 15%" true "found" || add_result "retention rate 15%" false "not found"
      check "行动项\|Action Items" && add_result "has action items section" true "found" || add_result "has action items section" false "not found"
      check "|---\|:---" && add_result "markdown tables" true "found" || add_result "markdown tables" false "not found"
      (check "[一-鿿]" && grep -qi "[a-zA-Z]\{10,\}" "$out") && add_result "bilingual" true "both languages" || add_result "bilingual" false "not bilingual"
      check "未提及\|Not mentioned\|N/A\|留空" && add_result "blanks unknowns" true "found" || add_result "blanks unknowns" false "not found"
      (check "嗯嗯" || check "对吧" || check "就是说" || check "然后呢") && add_result "no filler words" false "fillers found" || add_result "no filler words" true "clean"
      check "优先\|priority\|P0" && add_result "priority decision captured" true "found" || add_result "priority decision captured" false "not found"
      ;;
    eval-marketing-sync)
      total=10
      check "会议基本信息\|Meeting Basic Info" && add_result "has basic info" true "found" || add_result "has basic info" false "not found"
      (check "Emily" && check "David" && check "Lisa") && add_result "correct attendees" true "all found" || add_result "correct attendees" false "missing"
      (check "Double.11\|campaign\|双十一" && check "social\|日历\|calendar" && check "budget\|预算\|Q4") && add_result "three agenda items" true "found" || add_result "three agenda items" false "missing"
      check "2.million\|200万" && add_result "budget 2M mentioned" true "found" || add_result "budget 2M mentioned" false "not found"
      (check "influencer\|网红" && check "phas\|15%\|分阶段") && add_result "influencer phased cut" true "found" || add_result "influencer phased cut" false "not found"
      (check "video\|视频" && check "editor\|freelancer\|编辑\|借调") && add_result "video editor need" true "found" || add_result "video editor need" false "not found"
      check "brief\|简报" && add_result "video brief action" true "found" || add_result "video brief action" false "not found"
      (check "[一-鿿]" && grep -qi "[a-zA-Z]\{10,\}" "$out") && add_result "bilingual" true "both languages" || add_result "bilingual" false "not bilingual"
      check "Black.Friday\|黑五\|SEA\|东南亚" && add_result "black friday SEA" true "found" || add_result "black friday SEA" false "not found"
      check "October.25\|10月25\|10.25" && add_result "Oct 25 deadline" true "found" || add_result "Oct 25 deadline" false "not found"
      ;;
    eval-cloud-migration)
      total=10
      check "会议基本信息\|Meeting Basic Info" && add_result "has basic info" true "found" || add_result "has basic info" false "not found"
      (check "两周\|2.week" && check "60%") && add_result "delay 2 weeks 60%" true "found" || add_result "delay 2 weeks 60%" false "not found"
      (check "200" && check "50\|四五十") && add_result "stored proc counts" true "found" || add_result "stored proc counts" false "not found"
      check "一个月\|1.month\|监控" && add_result "monitoring 1 month" true "found" || add_result "monitoring 1 month" false "not found"
      (check "李明" && check "30\|三十") && add_result "data comparison li ming" true "found" || add_result "data comparison li ming" false "not found"
      (check "Zabbix" && check "CloudMonitor") && add_result "zabbix vs cloudmonitor" true "found" || add_result "zabbix vs cloudmonitor" false "not found"
      (check "12" && check "停机\|downtime") && add_result "downtime 12h" true "found" || add_result "downtime 12h" false "not found"
      check "周一\|Monday" && add_result "next meeting monday" true "found" || add_result "next meeting monday" false "not found"
      (check "[一-鿿]" && grep -qi "[a-zA-Z]\{10,\}" "$out") && add_result "bilingual" true "both languages" || add_result "bilingual" false "not bilingual"
      check "未提及\|Not mentioned\|N/A\|留空" && add_result "blanks unknowns" true "found" || add_result "blanks unknowns" false "not found"
      ;;
  esac

  expectations+="]"
  echo "{\"total\":$total,\"passed\":$passed,\"failed\":$failed,\"manual_review_needed\":0,\"expectations\":$expectations}"
}

for eval_name in eval-product-planning eval-marketing-sync eval-cloud-migration; do
  for config in with_skill without_skill; do
    out="$WS/$eval_name/$config/outputs/meeting_minutes.md"
    if [ -f "$out" ]; then
      echo "=== $eval_name / $config ==="
      grade_file "$out" "$eval_name" > "$WS/$eval_name/$config/grading.json"
      cat "$WS/$eval_name/$config/grading.json"
      echo ""
    else
      echo "MISSING: $eval_name / $config"
    fi
  done
done
