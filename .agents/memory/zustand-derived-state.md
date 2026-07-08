---
name: Zustand derived state (no getters)
description: Why computed getters on zustand state silently return stale/zero values
---

Do NOT define computed values as JS getters (`get total() {...}`) on a zustand
store's state object.

**Why:** zustand merges partial updates with `Object.assign({}, state, partial)`
on every `set`. `Object.assign` invokes the getter and copies its *value* (not the
descriptor), so after the first `set` the getter is flattened into a static value
(e.g. `0`) and never recomputes. Symptom: cart Subtotal showed `$0.00` despite items.

**How to apply:** compute derived values either in the component from raw state
(`const total = items.reduce(...)`) or via a zustand selector
(`useStore(s => s.items.reduce(...))`). Keep only primitive/array state + actions
in the store itself.
