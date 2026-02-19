# Fix SSH Push to zigueroutine GitHub Account

## Problem

`git push` to `zigueroutine/www` failed because the SSH key `~/.ssh/zigueroutine` was registered with the `pedrosantosbr` GitHub account, not `zigueroutine`.

Additionally, the Formation Bio SSH config (`~/.config/formation-bio/ssh/config`) sets `ControlMaster auto` globally, causing SSH to reuse a cached connection authenticated as `pedrosantosbr` — even when a different key was specified.

## Solution

### 1. Generate a new SSH key

```bash
ssh-keygen -t ed25519 -C "zigueroutine" -f ~/.ssh/zigueroutine_new -N ""
```

### 2. Add the public key to the zigueroutine GitHub account

Copy the output of `cat ~/.ssh/zigueroutine_new.pub` and add it at https://github.com/settings/keys while logged in as `zigueroutine`.

### 3. Update `~/.ssh/config`

```
Host github-zigueroutine
    HostName github.com
    User git
    IdentityFile ~/.ssh/zigueroutine_new
    IdentitiesOnly yes
    ControlMaster no
```

`ControlMaster no` prevents SSH from reusing a multiplexed connection that authenticated as `pedrosantosbr`.

### 4. Update `.envrc`

```bash
export GIT_SSH_COMMAND="ssh -i ~/.ssh/zigueroutine_new -o IdentitiesOnly=yes"
```

Then run `direnv allow` to reload.

### 5. Verify

```bash
ssh -T git@github-zigueroutine
# Expected: Hi zigueroutine! You've successfully authenticated, ...
```
