#!/bin/zsh
# Fresh worktree from origin/main for one new Vozes card, with the git-ignored media and the
# Vercel link copied from the main checkout, so the local preview and the deploy see the full site.
# Usage: preparar.sh <slug>     Branch voz-<slug>; prints the worktree path on the last line.
set -euo pipefail

slug=${1:?usage: preparar.sh <slug>}
repo=$(cd "$(git rev-parse --git-common-dir)/.." && pwd)   # main checkout
br="voz-$slug"
wt="$repo/.claude/worktrees/voz"   # fixed path: the "voz" preview in launch.json serves it
[[ ! -e "$wt" ]] || { echo "$wt exists: a previous run did not finish" >&2; exit 1; }

git -C "$repo" fetch -q origin main
git -C "$repo" worktree add -q -b "$br" "$wt" origin/main

# Ignored files that the live site needs: fonts, third-party images, .vercel, .vercelignore
for p in fonts img/capas img/episodios img/hero img/vozes .vercel .vercelignore; do
  [[ -e "$repo/site/$p" ]] || { echo "missing in main checkout: site/$p" >&2; exit 1; }
  mkdir -p "$wt/site/$(dirname $p)"
  cp -R "$repo/site/$p" "$wt/site/$(dirname $p)/"
done

echo "$wt"
