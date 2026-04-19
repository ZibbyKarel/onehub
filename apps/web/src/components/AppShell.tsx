'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { useLocalizedText, Translations } from '@app/internationalization';

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: ${({ theme }) => `${theme.space(4)} ${theme.space(6)}`};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(6)};
`;

const Brand = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.space(4)};
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.space(1)} ${theme.space(2)}`};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover { color: ${({ theme }) => theme.colors.text}; text-decoration: none; }
`;

const Main = styled.main`
  padding: ${({ theme }) => theme.space(6)};
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const t = useLocalizedText();

  const links = [
    { href: '/', label: t(Translations.NavCurrent) },
    { href: '/history', label: t(Translations.NavHistory) },
    { href: '/accounts', label: t(Translations.NavAccounts) },
    { href: '/runs', label: t(Translations.NavRuns) },
  ];

  return (
    <Shell>
      <TopBar>
        <Brand>{t(Translations.BrandName)}</Brand>
        <Nav>
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} $active={pathname === l.href}>
              {l.label}
            </NavLink>
          ))}
        </Nav>
      </TopBar>
      <Main>{children}</Main>
    </Shell>
  );
}
