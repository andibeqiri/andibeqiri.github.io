---
title: Xcode 27 - UIDesignRequiresCompatibility flag is ignored
author: Andi Beqiri
pubDatetime: 2026-08-30T07:16:01Z
featured: false
draft: false
tags:
  - Xcode
  - iOS
description: The UIDesignRequiresCompatibility flag will no longer be respected when building with Xcode 27.
---

Later this year Apple will release iOS 27 and all the tooling upgrades that come with it.

When you upgrade to building your app with Xcode 27, make sure to do an audit of your app since the `UIDesignRequiresCompatibility` set to `YES` will no longer be respected.

Apple introduced `UIDesignRequiresCompatibility` flag for the liquid glass UI update, to give developers 1 year to upgrade their UI to support liquid glass look.

If your app is still not ready there is some more wiggle room until April, when Apple enforces that new builds need to be submitted with the latest Xcode.

## Timeline

- September / October - New Stable iOS release and tooling
- April - hard enforcement to upload build using the new version of Xcode
