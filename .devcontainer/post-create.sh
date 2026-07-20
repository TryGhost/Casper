#!/usr/bin/env bash
set -e

PNPM_HOME="/home/node/.local/share/pnpm"

sudo mkdir -p "$PNPM_HOME"
sudo chown -R node:node "$PNPM_HOME" "${PWD}/node_modules"

sudo corepack enable
sudo corepack prepare pnpm@11.5.2 --activate

pnpm config set store-dir "$PNPM_HOME/store"
pnpm install --frozen-lockfile

pnpm --version
node --version
