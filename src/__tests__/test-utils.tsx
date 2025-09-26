import { MantineProvider } from '@mantine/core';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { expect } from 'vitest';

export function renderWithMantine(ui: ReactElement) {
  return render(<MantineProvider forceColorScheme="light">{ui}</MantineProvider>);
}

export async function openCartAndGetPopover(): Promise<HTMLElement> {
  const header = screen.getByRole('banner');
  const cartBtn = within(header).getByRole('button', { name: /^cart$/i });
  const trigger = cartBtn.closest('[aria-haspopup="dialog"]') as HTMLElement | null;
  if (!trigger) throw new Error('Cart trigger not found');
  await userEvent.click(cartBtn);
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));

  let popover: HTMLElement | null = null;
  await waitFor(() => {
    const id = trigger.getAttribute('aria-controls');
    expect(id).toBeTruthy();

    const el = document.getElementById(id!);
    expect(el).toBeInTheDocument();

    expect(el).not.toHaveStyle({ display: 'none' });

    popover = el as HTMLElement;
  }, { timeout: 3000 });

  return popover!;
}

export function getCartSummaryRow(popover: HTMLElement): HTMLElement {
  const totalLabel = within(popover).getByText(/^Total$/i);
  const row = totalLabel.parentElement;
  if (!row) throw new Error('Total row container not found');
  return row;
}
