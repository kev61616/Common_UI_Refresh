#!/bin/bash

# cleanup_variants.sh
# Script to safely clean up and fix problematic view variants in the project
# Usage: 
#   ./cleanup_variants.sh --check    # Just check what would be removed (dry run)
#   ./cleanup_variants.sh --execute  # Actually remove the files

# Set initial mode to check (dry run)
MODE="check"

# Process command line arguments
if [ "$1" == "--execute" ]; then
  MODE="execute"
  echo "⚠️  Running in EXECUTE mode - files will be modified/removed"
elif [ "$1" == "--check" ]; then
  echo "ℹ️  Running in CHECK mode - no files will be modified/removed"
else
  echo "ℹ️  Running in CHECK mode (default) - no files will be modified/removed"
  echo "    Use --execute to actually remove files"
fi

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Define problematic view variants with their specific issues
declare -a PROBLEMATIC_FILES=(
  "src/components/review/set-view-variants/ParallelCoordinatesView.tsx:useMemo called conditionally (react-hooks/rules-of-hooks)"
  "src/components/review/set-view-variants/ParticleFlowView.tsx:useEffect missing dependencies (react-hooks/exhaustive-deps)"
  "src/components/review/set-view-variants/SunburstChartView.tsx:useMemo called conditionally (react-hooks/rules-of-hooks)"
  "src/components/review/set-view-variants/TreeMapView.tsx:useMemo missing dependency (react-hooks/exhaustive-deps)"
  "src/components/review/set-view-variants/VoronoiTreemapView.tsx:useMemo called conditionally (react-hooks/rules-of-hooks)"
  "src/components/review/set-view-variants/variant-25/Component.tsx:useEffect missing dependency (react-hooks/exhaustive-deps)"
  "src/components/review/set-view-variants/variant-63/index.ts:Anonymous default export (import/no-anonymous-default-export)"
  "src/components/review/set-view-variants/variant-64/index.ts:Anonymous default export (import/no-anonymous-default-export)"
  "src/components/review/set-view-variants/variant-65/index.ts:Anonymous default export (import/no-anonymous-default-export)"
  "src/components/review/set-view-variants/variant-66/index.ts:Anonymous default export (import/no-anonymous-default-export)"
)

# Define problematic variant directories to scan for additional issues
VARIANT_DIR="src/components/review/set-view-variants"

echo "🔍 Scanning for problematic view variants..."
echo ""

# Function to check or remove a file
check_or_remove_file() {
  local file=$1
  local issue=$2
  
  if [ ! -f "$file" ]; then
    echo -e "${YELLOW}⚠️  File not found: $file${NC}"
    return
  fi
  
  echo -e "${BLUE}Found:${NC} $file"
  echo -e "${YELLOW}Issue:${NC} $issue"
  
  if [ "$MODE" == "execute" ]; then
    rm "$file"
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}✅ Removed${NC}"
    else
      echo -e "${RED}❌ Failed to remove${NC}"
    fi
  else
    echo -e "${BLUE}Would remove if running with --execute${NC}"
  fi
  echo ""
}

# Process known problematic files
for item in "${PROBLEMATIC_FILES[@]}"; do
  IFS=':' read -r file issue <<< "$item"
  check_or_remove_file "$file" "$issue"
done

# Find additional problematic variant directories with conditional hooks
echo "🔍 Scanning for additional problematic variants with conditional hooks..."
grep -r "if.*useMemo\|useMemo.*if\|if.*useState\|useState.*if\|if.*useEffect\|useEffect.*if" $VARIANT_DIR --include="*.tsx" | while read -r line; do
  file=$(echo "$line" | cut -d':' -f1)
  issue="Likely conditional hook usage detected"
  check_or_remove_file "$file" "$issue"
done

# Function to check for missing variant import references
check_variant_imports() {
  echo "🔍 Checking for variant import references..."
  
  # Find all variant imports in the codebase
  grep -r "import.*from.*set-view-variants/variant-" --include="*.tsx" --include="*.ts" src/ | sort | uniq > /tmp/variant_imports.txt
  
  if [ -s /tmp/variant_imports.txt ]; then
    echo -e "${BLUE}Found the following variant imports that may need updating:${NC}"
    cat /tmp/variant_imports.txt
    echo ""
    echo -e "${YELLOW}⚠️  You may need to update these imports after removing problematic variants${NC}"
  else
    echo -e "${GREEN}✅ No variant imports found${NC}"
  fi
  echo ""
}

check_variant_imports

# Final summary
if [ "$MODE" == "check" ]; then
  echo -e "${BLUE}=============================================${NC}"
  echo -e "${BLUE}This was a dry run. No files were modified.${NC}"
  echo -e "${BLUE}Run with --execute to actually remove files.${NC}"
  echo -e "${BLUE}=============================================${NC}"
else
  echo -e "${GREEN}=============================================${NC}"
  echo -e "${GREEN}Cleanup completed in execute mode.${NC}"
  echo -e "${GREEN}Problematic variants have been removed.${NC}"
  echo -e "${GREEN}=============================================${NC}"
  
  echo -e "${YELLOW}Remember to:${NC}"
  echo "1. Update any import references to the removed variants"
  echo "2. Run 'npm run build' to verify fixes"
  echo "3. Check the components that still use these variants"
fi
