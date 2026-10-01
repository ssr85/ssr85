# MCP Configuration Cleanup and uvx Setup Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Install Astral `uv`/`uvx`, verify `google-ads-mcp`, `google-analytics-mcp`, and `chrome-devtools` MCP servers, and clean up broken/misconfigured entries in `mcp_config.json`.

**Architecture:** Install `uv` and `uvx` to `~/.cargo/bin` (which is already in the system PATH), test execution of Python-based MCP servers via `uvx`, adjust chrome-devtools arguments, remove obsolete/broken MCP definitions, and verify config consistency across `~/.gemini/config/mcp_config.json` and `~/.gemini/antigravity/mcp_config.json`.

**Tech Stack:** Node.js / npx, Python 3 / Astral uv (`uvx`), MCP (Model Context Protocol), JSON.

---

### Task 1: Install Astral uv / uvx and Verify PATH

**Files:**
- System binary: `~/.cargo/bin/uv`, `~/.cargo/bin/uvx`

**Step 1: Install `uv` via the official installer script**
Run:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```
Expected output: Installed `uv` and `uvx` successfully.

**Step 2: Ensure `uvx` and `uv` binaries are in PATH**
Run:
```bash
which uv uvx && uvx --version
```
Expected output: Path to `uvx` returned and version reported (e.g. `uv 0.x.x`).

---

### Task 2: Validate google-ads-mcp and google-analytics-mcp

**Files:**
- Credentials file: `/Users/ssrrattan/Documents/WP Sites/oghemp/graceful-cider-490012-f4-0bf5e65fc42f.json`
- Config file: `/Users/ssrrattan/.gemini/config/mcp_config.json`

**Step 1: Test `google-analytics-mcp` execution with uvx**
Run:
```bash
uvx --from git+https://github.com/googleanalytics/google-analytics-mcp.git google-analytics-mcp --help
```
Expected output: Help message for `google-analytics-mcp` or server startup verification without crashing.

**Step 2: Test `google-ads-mcp` execution with uvx**
Run:
```bash
uvx --from git+https://github.com/googleads/google-ads-mcp.git google-ads-mcp --help
```
Expected output: Help message for `google-ads-mcp` or server startup verification without crashing.

---

### Task 3: Configure and Test chrome-devtools MCP

**Files:**
- Config file: `/Users/ssrrattan/.gemini/config/mcp_config.json`

**Step 1: Standardize `chrome-devtools` args format**
Ensure `args` uses `["-y", "chrome-devtools-mcp@latest", "--browser-url=http://127.0.0.1:9222"]` with `-y` first for non-interactive npx execution.

**Step 2: Test `npx -y chrome-devtools-mcp@latest --help`**
Run:
```bash
npx -y chrome-devtools-mcp@latest --help
```
Expected output: Help options displayed for `chrome-devtools-mcp`.

---

### Task 4: Clean Up Misconfigured MCPs in `mcp_config.json`

**Files:**
- Modify: `/Users/ssrrattan/.gemini/config/mcp_config.json`
- Sync to: `/Users/ssrrattan/.gemini/antigravity/mcp_config.json`

**Step 1: Remove broken and obsolete MCP entries**
Remove:
- `lm_studio` (missing script file and bad python path)
- `velocity-shipping` (unsupported CLI flags)
- `StitchMCP` (unsupported CLI flags and internal metadata)
- `Railway` (disabled placeholder)

Keep and retain:
- `sequential-thinking`
- `github-mcp-server`
- `google-ads-mcp` (working via `uvx`)
- `google-ads-oghemplife` (working via `uvx`)
- `google-analytics-mcp` (working via `uvx`)
- `chrome-devtools`
- `mapi-devdocs`
- `seo`
- `librecrawl`
- `supabase`

**Step 2: Validate JSON syntax and structure**
Run:
```bash
python3 -c 'import json; json.load(open("/Users/ssrrattan/.gemini/config/mcp_config.json")); print("Config valid JSON")'
```
Expected output: `Config valid JSON`.

---

### Task 5: Final End-to-End Health Verification

**Files:**
- Config file: `/Users/ssrrattan/.gemini/config/mcp_config.json`

**Step 1: Run diagnostic script verifying all remaining MCP servers**
Run:
```bash
python3 -c '
import os, json, shutil
with open("/Users/ssrrattan/.gemini/config/mcp_config.json") as f:
    cfg = json.load(f)
for name, s in cfg.get("mcpServers", {}).items():
    cmd = s.get("command")
    found = shutil.which(cmd) is not None if cmd else True
    print(f"{name}: {\"READY\" if found else \"FAILED\"}")
'
```
Expected output: All active servers show `READY`.
