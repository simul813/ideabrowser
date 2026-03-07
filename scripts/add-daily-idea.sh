#!/bin/bash
# Daily Idea Generator - Runs via macOS LaunchAgent at 6:00 AM
# Uses Claude Code CLI to research and add a new startup idea

set -e

PROJECT_DIR="/Users/Jay-Mac/claudecodeworking/ideabrowser"
LOG_DIR="$PROJECT_DIR/scripts/logs"
LOG_FILE="$LOG_DIR/daily-idea-$(date +%Y-%m-%d).log"
IDEAS_FILE="$PROJECT_DIR/src/lib/ideas.ts"

mkdir -p "$LOG_DIR"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "========================================"
echo "Daily Idea Generator - $(date)"
echo "========================================"

cd "$PROJECT_DIR"

# Get current idea count and next ID
IDEA_COUNT=$(grep -c '^  {' "$IDEAS_FILE")
NEXT_ID=$((IDEA_COUNT + 1))
echo "Current ideas: $IDEA_COUNT"
echo "Next ID: $NEXT_ID"

# Get existing titles to avoid duplicates
EXISTING_TITLES=$(grep 'title: "' "$IDEAS_FILE" | sed 's/.*title: "\([^"]*\)".*/\1/' | head -50 | tr '\n' '|')

# Use Claude Code to research and add a new idea
claude --print "You need to add ONE new startup idea (#$NEXT_ID) to the file $IDEAS_FILE.

CRITICAL RULES:
1. Read the file first to see ALL existing ideas and the data format
2. The idea must be COMPLETELY DIFFERENT from all existing ideas - do not duplicate any topic
3. Use WebSearch to research REAL market data:
   - TAM must be the SPECIFIC segment, not a parent market
   - Competitors must be REAL companies with verified Crunchbase funding
   - YoY growth must match published CAGR reports
   - generateTrendData base should match the stated search volume
4. Validate your data: search for each competitor's funding, search for the market size report
5. Add the idea to the END of the ideas array (before the closing \`];\`)
6. The idea needs a unique upvotes value (check existing ones)
7. Set dateAdded to today's date: $(date +%Y-%m-%d)
8. Run 'npm run build' to verify everything compiles

After adding the idea, commit with message 'Add daily idea #$NEXT_ID: [title]' and push to origin main. Then deploy with 'npx vercel --prod --yes'." --allowedTools "Read,Edit,Write,Bash,WebSearch,Grep,Glob" 2>&1

echo ""
echo "Daily idea generation complete at $(date)"
echo "========================================"
