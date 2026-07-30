# 🐞 Rahand Cars - Known Issues

This document tracks all known issues, bugs, technical debt, and future improvements.

---

# Active Issues

At the moment, there are no active high-priority issues.

---

## ✅ Resolved Issues

### ISSUE-001

**Title**

Expo Go icons displayed as Chinese characters or square placeholders.

**Priority**

High

**Status**

Resolved ✅

**Root Cause**

The application was using invalid Feather icon names (such as `car`), which are not supported by the Feather icon set.

**Resolution**

Vehicle icons were migrated to **MaterialCommunityIcons**, which provides a complete automotive icon collection. The tab navigation was also updated to use the correct icon family.

---

### ISSUE-002

**Title**

Verify `useColors.ts` TypeScript compatibility.

**Priority**

Medium

**Status**

Resolved ✅

**Resolution**

The incorrect TypeScript type cast in `hooks/useColors.ts` was corrected. The project now passes TypeScript type checking with zero errors.

---

# Technical Debt

No technical debt has been identified at this stage.

---

# Future Monitoring

The following items should continue to be monitored during future development:

- Performance as the number of screens increases.
- Supabase integration once real backend services are connected.
- RTL layout consistency after new screens are added.
- Accessibility improvements.
- Animation performance on lower-end Android devices.

---

Last Updated: July 2026
