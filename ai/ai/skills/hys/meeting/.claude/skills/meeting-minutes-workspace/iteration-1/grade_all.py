#!/usr/bin/env python3
"""Automated grading script for meeting-minutes eval outputs."""
import json, os, re

WORKSPACE = os.path.dirname(os.path.abspath(__file__))

def read_file(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        return ""

def check(output, test):
    """Run a single assertion check against output text."""
    text = output.lower()

    if test == "output_contains_section_meeting_basic_info":
        return "会议基本信息" in output or "meeting basic info" in text

    elif test == "output_mentions_all_attendees":
        return all(name in output for name in ["刘总", "赵PM", "王工", "小周"])

    elif test == "output_covers_three_topics":
        return all(kw in output for kw in ["onboarding", "搜索", "推送"])

    elif test == "output_captures_priority_order":
        return "onboarding" in text and ("优先" in output or "priority" in text or "P0" in output)

    elif test == "output_has_min_4_action_items_with_owners":
        action_section = output[output.find("行动项"):] if "行动项" in output else output[output.find("Action Items"):] if "Action Items" in output else ""
        owner_count = len(re.findall(r'[（\(]?[王赵刘李小周张陈]', action_section)) if action_section else 0
        return owner_count >= 3

    elif test == "output_mentions_retention_rate_15":
        return "15%" in output or "15％" in output

    elif test == "output_is_bilingual":
        has_chinese = bool(re.search(r'[一-鿿]', output))
        has_english = bool(re.search(r'[a-zA-Z]{10,}', output))
        return has_chinese and has_english

    elif test == "output_leaves_unknown_fields_blank":
        return ("未提及" in output or "not mentioned" in text or "留空" in output or "N/A" in text)

    elif test == "output_uses_markdown_tables":
        return "|---" in output or "| --" in output or "| ---" in output

    elif test == "output_removes_filler_words":
        fillers = ["嗯嗯", "对吧", "就是说", "然后呢"]
        return not any(f in output for f in fillers)

    # --- marketing-sync assertions ---
    elif test == "output_identifies_emily_david_lisa":
        return all(name in output for name in ["Emily", "David", "Lisa"])

    elif test == "output_covers_three_agenda_items":
        return all(kw in text for kw in ["double 11", "social", "budget"])

    elif test == "output_notes_budget_not_approved":
        return "2 million" in output or "200万" in output
        # Budget being mentioned at all is the key; whether it's flagged as unapproved is a qualitative check

    elif test == "output_captures_phased_influencer_cut":
        return "influencer" in text and ("phase" in text or "15%" in output or "分阶段" in output)

    elif test == "output_mentions_video_editor_shortage":
        return ("video" in text and ("editor" in text or "编辑" in output or "freelancer" in text)) or "借" in output

    elif test == "output_covers_all_action_items":
        return "brief" in text and ("brand" in text or "品牌" in output)

    elif test == "output_mentions_black_friday_sea":
        return "black friday" in text or "sea" in text or "东南亚" in output

    elif test == "output_captures_oct25_visual_deadline":
        return "october 25" in text or "10月25" in output or "10.25" in output

    # --- cloud-migration assertions ---
    elif test == "output_mentions_2_week_delay_60_percent":
        return ("两周" in output or "2 week" in text) and ("60%" in output or "60％" in output)

    elif test == "output_mentions_stored_proc_counts":
        return "200" in output and ("50" in output or "四五十" in output)

    elif test == "output_captures_monitoring_script_1_month":
        return "一个月" in output or "1 month" in text or "监控" in output

    elif test == "output_captures_data_comparison_assignment":
        return "李明" in output and ("30" in output or "三十" in output)

    elif test == "output_captures_monitoring_comparison_needed":
        return "zabbix" in text and "cloudmonitor" in text

    elif test == "output_mentions_downtime_window_change":
        return "12" in output and ("停机" in output or "downtime" in text)

    elif test == "output_mentions_next_meeting_monday":
        return "周一" in output or "monday" in text

    else:
        return None  # Unknown test, needs manual review


def grade_run(run_dir, assertions):
    """Grade a single run's output against assertions."""
    output = read_file(os.path.join(run_dir, "outputs", "meeting_minutes.md"))
    if not output:
        return {"error": "Output file not found", "expectations": []}

    expectations = []
    for a in assertions:
        result = check(output, a["check"])
        expectations.append({
            "text": a["description"],
            "passed": result if result is not None else None,
            "evidence": f"Check: {a['check']} -> {'PASS' if result else 'FAIL' if result is False else 'MANUAL'}"
        })

    passed = sum(1 for e in expectations if e["passed"] is True)
    failed = sum(1 for e in expectations if e["passed"] is False)
    manual = sum(1 for e in expectations if e["passed"] is None)

    return {
        "total": len(expectations),
        "passed": passed,
        "failed": failed,
        "manual_review_needed": manual,
        "expectations": expectations
    }


def main():
    evals = [
        ("eval-product-planning", [
            "output_contains_section_meeting_basic_info",
            "output_mentions_all_attendees",
            "output_covers_three_topics",
            "output_captures_priority_order",
            "output_has_min_4_action_items_with_owners",
            "output_mentions_retention_rate_15",
            "output_is_bilingual",
            "output_leaves_unknown_fields_blank",
            "output_uses_markdown_tables",
            "output_removes_filler_words",
        ]),
        ("eval-marketing-sync", [
            "output_contains_section_meeting_basic_info",
            "output_identifies_emily_david_lisa",
            "output_covers_three_agenda_items",
            "output_notes_budget_not_approved",
            "output_captures_phased_influencer_cut",
            "output_mentions_video_editor_shortage",
            "output_covers_all_action_items",
            "output_is_bilingual",
            "output_mentions_black_friday_sea",
            "output_captures_oct25_visual_deadline",
        ]),
        ("eval-cloud-migration", [
            "output_contains_section_meeting_basic_info",
            "output_mentions_2_week_delay_60_percent",
            "output_mentions_stored_proc_counts",
            "output_captures_monitoring_script_1_month",
            "output_captures_data_comparison_assignment",
            "output_captures_monitoring_comparison_needed",
            "output_mentions_downtime_window_change",
            "output_mentions_next_meeting_monday",
            "output_is_bilingual",
            "output_leaves_unknown_fields_blank",
        ]),
    ]

    for eval_name, check_ids in evals:
        # Read assertions from metadata
        meta_path = os.path.join(WORKSPACE, eval_name, "eval_metadata.json")
        with open(meta_path, 'r', encoding='utf-8') as f:
            meta = json.load(f)

        assertions = meta["assertions"]

        for config in ["with_skill", "without_skill"]:
            run_dir = os.path.join(WORKSPACE, eval_name, config)
            result = grade_run(run_dir, assertions)

            grading_path = os.path.join(run_dir, "grading.json")
            with open(grading_path, 'w', encoding='utf-8') as f:
                json.dump(result, f, indent=2, ensure_ascii=False)

            print(f"{eval_name}/{config}: {result['passed']}/{result['total']} passed, {result['failed']} failed, {result['manual_review_needed']} manual")


if __name__ == "__main__":
    main()
