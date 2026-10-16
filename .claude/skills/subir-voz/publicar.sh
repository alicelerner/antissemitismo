#!/bin/zsh
# Merge one committed Vozes branch into main, push, deploy to production and check the live domain.
# Usage: publicar.sh <worktree> "<plain text that must appear in the live HTML>"
set -euo pipefail

wt=${1:?usage: publicar.sh <worktree> <check text>}
check=${2:?missing check text}
domain="https://bomprosjudeustambem.com.br"
cd "$wt"
br=$(git branch --show-current)
repo=$(cd "$(git rev-parse --git-common-dir)/.." && pwd)

[[ -z "$(git status --porcelain)" ]] || { echo "uncommitted changes in $wt" >&2; exit 1; }
if git worktree list --porcelain | grep -qx "branch refs/heads/main"; then
  echo "main is checked out in a worktree; merge by hand there" >&2; exit 1
fi

# Bring local main up to origin/main (fast-forward only), then put the branch on top of it,
# so the merged tree is exactly the tree that gets deployed.
git fetch -q origin main
git merge-base --is-ancestor main origin/main || { echo "local main has commits not on origin" >&2; exit 1; }
git update-ref refs/heads/main origin/main
git rebase -q main

# --no-ff merge without checking out main (the repo's convention: "Merge <branch> into main")
old=$(git rev-parse main)
tree=$(git merge-tree --write-tree main "$br")
merge=$(git commit-tree "$tree" -p main -p "$br" -m "Merge $br into main")
git update-ref refs/heads/main "$merge" "$old"
git push -q origin main

# New card images also go to the main checkout, the canonical local store for ignored media
cp -n site/img/vozes/* "$repo/site/img/vozes/" 2>/dev/null || true

vercel deploy --prod --cwd site --yes >/dev/null

# Live check on the official domain (cache-busted)
for i in 1 2 3 4 5 6; do
  if curl -fsSL "$domain/?v=$(date +%s)" | grep -qF -- "$check"; then
    echo "live: $domain"
    cd "$repo" && git worktree remove --force "$wt" && git branch -q -D "$br"   # merged into main above
    exit 0
  fi
  sleep 5
done
echo "deployed, but \"$check\" not found on $domain yet" >&2; exit 2
