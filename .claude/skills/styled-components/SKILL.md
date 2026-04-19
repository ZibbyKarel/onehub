---
name: styled-components
description: Use when writing, reviewing, or refactoring React styled-components code to ensure consistent patterns, proper props handling, and co-located architecture. Also use for migrating CSS modules to styled-components or optimizing existing component structure.
---

# Styled Components

## Overview

Styled-components enables type-safe CSS-in-JS in React. The skill ensures team consistency: when to use template literals vs. functions, prop handling patterns, file structure, and when styled-components solve the problem (vs. plain CSS).

**Core principle:** Props determine structure. Literal templates are for styling; functions handle logic.

## When to Use

Use this skill in these scenarios:

- **Writing new components:** Deciding between styled literals and functional forms
- **Code review:** Checking for proper prop patterns, file structure, import conventions
- **Refactoring:** Converting CSS modules or inline styles to styled-components
- **Architecture decisions:** Whether styled-components fit the use case

## Core Pattern: Prop Count Rule (MANDATORY)

**The rule is simple and mechanical — NO EXCEPTIONS:**

| Prop count | Form | Action |
|-----------|------|--------|
| 0 props | Literal template | ✅ Use: `const Container = styled.div` ```css` padding: 16px; ` ``` |
| 1 prop | Literal single interpolation | ✅ Use: `const Box = styled.div` ```css` padding: ${p => p.padding}; ` ``` |
| 2 props | Literal multiple interpolations | ✅ Use: `const Button = styled.button` ```css` color: ${p => p.color}; font-size: ${p => p.size}; ` ``` |
| **3+ props** | **Functional form with `css` fragments** | ❌ **NOT allowed in template literals** |

**Why this threshold:** At 3+ props, inline ternaries and conditions become unreadable and unmaintainable. Functional form separates concerns: logic in TypeScript, styles in CSS fragments.

### NO EXCEPTIONS CLAUSE

**You are NOT allowed to:**
- Use `padding: ${props => props.compact ? '8px' : '16px'};` when you have 3+ other props
- Rationalize with "small tweaks only"
- Create switch statements in template literals when you have 3+ props
- Say "it's flexible, so template literal is better"

**If you have 3+ dynamic props → functional form ALWAYS.**

### Functional Form (3+ Props)

When you hit 3+ dynamic props, use this pattern:

**Key points:**
- Define style fragments as `css` objects keyed by prop value
- Use function body to compose them
- Pseudo-selectors (`:hover`, `:disabled`) stay in template
- Transient props (prefixed `$`) prevent DOM pollution: `<Button $debug={true}>` won't create a `debug` DOM attribute

See [`examples/functional-form.ts`](./examples/functional-form.ts) for a complete working example with variant and size composition.

### Transient Props (Recommended)

Use the `$` prefix for props that are logic-only, not styling:

See [`examples/transient-props.ts`](./examples/transient-props.ts) for good and bad patterns.

The `$` prefix prevents logic-only props from being written to the DOM, keeping your HTML clean.

## File Structure (Flexible)

Both approaches work; choose one and be consistent:

**Option A: Co-located in `styles.ts`**
```
Button/
  Button.tsx       # Component logic
  Button.styles.ts # Styled components
  index.ts         # Exports
```

**Option B: Same file**
```
Button.tsx         # Component + styled-components together
```

**Import convention (consistent with your preference):**
```typescript
import * as Styled from './Button.styles';

// Usage
<Styled.Container>
  <Styled.Title>Hello</Styled.Title>
</Styled.Container>
```

## Props vs. CSS Classes

**Use CSS classes for static/grouped styles:**

Instead of many boolean props, use a variant prop that groups related styles together.

See [`examples/props-vs-css-classes.ts`](./examples/props-vs-css-classes.ts) for the pattern: replace scattered boolean props with a single enum prop.

## Red Flags — STOP and Refactor

If you catch yourself thinking any of these, STOP — you're about to violate the rule:

- "It's just 3 props, template literal is cleaner"
- "The ternaries are simple enough to read"
- "I'll use a template literal now, refactor later"
- "It's only style tweaks, not structural"
- "This component is small, so template literal works"
- "Other team members have done this"

**ALL of these = functional form is mandatory. Refactor now.**

## Rationalization Table

| Excuse | Reality |
|--------|---------|
| "3 props in template literal is fine" | No. 3+ props = functional form. Always. |
| "Ternary operators keep it readable" | Inline ternaries become unreadable at 3+ props. Use `css` fragments instead. |
| "I'll refactor to functional later" | Refactor now. Ternary debt accrues fast. |
| "Other code does this" | Find and refactor that code too. Don't copy bad patterns. |
| "This is different because..." | No exceptions. 3+ props = functional form. |
| "Flexibility is more important than structure" | Functional form is MORE flexible, not less. You can easily add new variants without template bloat. |
| "It's just padding and color tweaks" | Size of changes doesn't matter. Prop count does. 3+ = functional. |

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| **5+ props in template literal** | Switch to functional form with `css` fragments |
| **String interpolation in props** | Use `css` helper + TypeScript unions (type-safe variants) |
| **Not using `$` for internal logic** | Prefix non-styling props with `$` to prevent DOM pollution |
| **Mixing styled-components with CSS modules** | Pick one approach per component; don't mix patterns |
| **Creating too many wrapper divs** | Use polymorphic `as` prop: `<Button as="a" href="...">` |
| **Forgetting TypeScript interfaces** | Always define `interface ComponentProps` for type safety |

## Quick Reference: When to Refactor

**Refactor TO styled-components if:**
- Component needs dynamic styles based on props
- You want type-safe CSS with TypeScript
- CSS is tightly coupled to component logic
- Team is already using styled-components

**Keep CSS modules if:**
- Styles are mostly static (little-to-no prop variation)
- Large stylesheet shared across many components
- CSS-first team preference (not runtime styling)

**Avoid styled-components if:**
- Pure static CSS (no props needed)
- Bundle size is critical and you're not using styled-components elsewhere
- Team prefers CSS separation from logic

## TypeScript Best Practices

Always type your props:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  $isLoading?: boolean; // Transient prop
}

export const Button = styled.button<ButtonProps>`
  /* ... */
`;
```

This ensures:
- IDE autocompletion in JSX: `<Button variant="primary" />`
- Type safety at call site
- Clear contract for component consumers

## When NOT to Use This Skill

- **Pure CSS components:** Doesn't need styled-components
- **Static stylesheets:** Use CSS modules or plain CSS
- **Third-party component styling:** Use `styled()` wrapper, not rebuilding
