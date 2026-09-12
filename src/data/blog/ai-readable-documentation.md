---
title: Make Apple Documentation AI-Readable
author: Andi Beqiri
pubDatetime: 2026-09-12T16:15:20Z
featured: false
draft: false
tags:
  - AI
  - Apple
  - Software Development
description: A simple way to make Apple documentation easier for AI agents to read.
---

If your AI agent struggles to retrieve information from Apple's official developer documentation, there is a very simple trick: add `.md` to the end of the URL.

For example, change:

[https://developer.apple.com/documentation/avfoundation](https://developer.apple.com/documentation/avfoundation)

to:

[https://developer.apple.com/documentation/avfoundation.md](https://developer.apple.com/documentation/avfoundation.md)

The regular page relies on JavaScript to load much of its content, which can make it difficult for an agent to read. Adding `.md` fetches a Markdown version of the page instead, giving the agent direct access to the documentation.

You can also add this instruction to your `AGENTS.md` file so the agent does it automatically:

```md
## Apple documentation

When reading a developer.apple.com/documentation URL, append `.md` to fetch the Markdown version.
```
