# TanStack Query & Mutation Refactoring Summary

## Overview

This document summarizes the refactoring of `apps/web` to extract all TanStack Query hooks into dedicated, modular files. The refactoring improves code organization, reusability, and testability by establishing a clear, consistent structure where each query and mutation lives in its own file under dedicated `queries/` and `mutations/` directories.

## Status: ✅ Complete

**Date:** April 17, 2026  
**Scope:** Extract 5 hooks (1 query + 4 mutations) from 2 components into dedicated files

## Changes Overview

### Phase 1: Discovery & Directory Setup
- ✅ Created `apps/web/src/lib/queries/` directory
- ✅ Created `apps/web/src/lib/mutations/` directory
- ✅ Documented complete inventory of all TanStack Query hooks

### Phase 2: Extract Query Hooks
- ✅ **fetchAccountsQuery.ts** - Extracted from AccountsManager.tsx
  - Exports: `fetchAccounts` (async fn), `accountsQueryKeys` (key factory), `useFetchAccountsQuery` (hook)
  - Type: Fetches array of AccountSummary
  - Query Key: `['accounts']`

### Phase 3: Extract Mutation Hooks
- ✅ **createAccountMutation.ts** - Extracted from AccountsManager.tsx
  - Exports: `createAccount` (async fn), `useCreateAccountMutation` (hook)
  - Input: `AccountFormValues`
  - Invalidates: `['accounts']`

- ✅ **updateAccountMutation.ts** - Extracted from AccountsManager.tsx
  - Exports: `updateAccount` (async fn), `useUpdateAccountMutation` (hook)
  - Input: `{ id: string; patch: Partial<AccountFormValues> }`
  - Invalidates: `['accounts']`

- ✅ **deleteAccountMutation.ts** - Extracted from AccountsManager.tsx
  - Exports: `deleteAccount` (async fn), `useDeleteAccountMutation` (hook)
  - Input: `string` (id)
  - Invalidates: `['accounts']`

- ✅ **updateStatusMutation.ts** - Extracted from ContestList.tsx
  - Exports: `updateStatus` (async fn), `useUpdateStatusMutation` (hook)
  - Input: `{ postId: string; status: ContestStatus }`
  - Invalidates: `['contests']`

### Phase 4: Update Component Imports
- ✅ **AccountsManager.tsx**
  - Removed inline async functions: `fetchAccounts`, `createAccount`, `updateAccount`, `deleteAccount`
  - Removed inline hook definitions
  - Added imports: `useFetchAccountsQuery`, `useCreateAccountMutation`, `useUpdateAccountMutation`, `useDeleteAccountMutation`
  - Updated hook usage to match extracted interface
  - Re-exported `AccountSummary` type with proper `export type` syntax

- ✅ **ContestList.tsx**
  - Removed inline `updateStatus` async function
  - Removed inline `useMutation` call
  - Added import: `useUpdateStatusMutation`
  - Simplified component to use extracted hook

### Phase 5: Verification
- ✅ TypeScript type checking - No errors introduced by refactoring
- ✅ No leftover inline hooks in components
- ✅ All imports resolve correctly
- ✅ File structure follows naming convention

## File Structure

```
apps/web/src/lib/
├── queries/
│   └── fetchAccountsQuery.ts          (1 query file)
├── mutations/
│   ├── createAccountMutation.ts        (4 mutation files)
│   ├── deleteAccountMutation.ts
│   ├── updateAccountMutation.ts
│   └── updateStatusMutation.ts
└── [existing utilities]
```

## Import Path Changes

### AccountsManager.tsx
**Before:**
```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Inline async functions
async function fetchAccounts(): Promise<AccountSummary[]> { ... }
async function createAccount(values: AccountFormValues): Promise<void> { ... }
async function updateAccount(id: string, patch: Partial<AccountFormValues>): Promise<void> { ... }
async function deleteAccount(id: string): Promise<void> { ... }

// Inline hook usage
const { data: accounts } = useQuery({...});
const createMut = useMutation({...});
const toggleMut = useMutation({...});
const deleteMut = useMutation({...});
```

**After:**
```typescript
import { useQueryClient } from '@tanstack/react-query';
import { useFetchAccountsQuery } from '../lib/queries/fetchAccountsQuery.js';
import { useCreateAccountMutation } from '../lib/mutations/createAccountMutation.js';
import { useUpdateAccountMutation } from '../lib/mutations/updateAccountMutation.js';
import { useDeleteAccountMutation } from '../lib/mutations/deleteAccountMutation.js';

// Hook usage with imported functions
const { data: accounts } = useFetchAccountsQuery({ initialData: initialAccounts });
const createMut = useCreateAccountMutation({...});
const toggleMut = useUpdateAccountMutation();
const deleteMut = useDeleteAccountMutation();
```

### ContestList.tsx
**Before:**
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Inline async function
async function updateStatus(postId: string, status: ContestStatus): Promise<void> { ... }

// Inline hook usage
const mutate = useMutation({...});
```

**After:**
```typescript
import { useUpdateStatusMutation } from '../lib/mutations/updateStatusMutation.js';

// Hook usage
const mutate = useUpdateStatusMutation();
```

## Benefits

1. **Code Reusability**: Query and mutation functions can be imported and used in other components or server-side code
2. **Better Separation of Concerns**: Logic is separated from UI components
3. **Easier Testing**: Hooks and their functions can be tested independently
4. **Consistent Patterns**: All queries and mutations follow the same structure
5. **Improved Maintainability**: Changes to a single query/mutation are centralized in one file
6. **Type Safety**: Full TypeScript support with proper generic types

## Pattern Summary

### Query Files
Each query file exports:
- **Async query function**: Can be used anywhere, not just in React
- **Query key factory**: Enables consistent cache management and invalidation
- **Custom hook**: Wraps `useQuery` for convenient component usage

### Mutation Files
Each mutation file exports:
- **Async mutation function**: Can be used anywhere, not just in React
- **Custom hook**: Wraps `useMutation` with automatic cache invalidation
- **Accepts options parameter**: Allows components to add custom onSuccess/onError handlers

## Verification Results

✅ All 5 hooks properly extracted (1 query + 4 mutations)  
✅ All imports updated in components  
✅ TypeScript compilation passes (no new errors)  
✅ No inline hooks remain in components  
✅ File naming follows convention (*Query.ts, *Mutation.ts)  
✅ All files export required symbols  
✅ Proper type annotations throughout

## Edge Cases Handled

1. **Type Exports**: Used `export type` syntax to satisfy TypeScript's `isolatedModules` setting
2. **Component-Specific Handlers**: Mutations accept options for custom onSuccess/onError handlers
3. **Partial Updates**: Mutation functions handle partial data updates (e.g., toggle active status)
4. **Query Key Factories**: Structured to support different query variants

## Next Steps (Optional)

1. **Testing**: Create unit tests for extracted hooks
2. **Error Boundaries**: Add error boundary components if not already present
3. **Stale Time Configuration**: Adjust cache stale times in query hooks as needed
4. **Server-Side Usage**: Leverage exported async functions for server-side data fetching
5. **Additional Queries**: Extract any other useQuery/useInfiniteQuery hooks as they're discovered

## Commits

- `d19ef3e` - Create queries/ and mutations/ directories
- `0f8c3d2` - Extract fetchAccountsQuery
- `bf6abfa` - Extract createAccountMutation
- `2973e23` - Extract updateAccountMutation
- `9e315d7` - Extract deleteAccountMutation
- `f53cc4f` - Extract updateStatusMutation
- `7bbe77c` - Update AccountsManager.tsx imports
- `b364679` - Update ContestList.tsx imports
- `8aeac2d` - Fix TypeScript errors in AccountsManager.tsx

## Conclusion

The refactoring has successfully extracted all TanStack Query hooks into dedicated, reusable modules. The new structure improves code organization while maintaining full backward compatibility with existing component functionality. All changes follow established patterns and TypeScript best practices.
