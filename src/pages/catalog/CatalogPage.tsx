import {
  AppShell,
  Container,
  Group,
  Title,
  Text,
  Button,
  SimpleGrid,
  Badge,
  Skeleton,
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { ProductCard } from '../../components/ProductCard';
import { CartPopup, useCart } from '../../modules/cart';
import { useProducts } from '../../modules/products';

export default function App() {
  const { products, loading, error } = useProducts();
  const { cart, addToCart, count, total, inc, dec, getItemQuantity, setItemQuantity } =
    useCart();
  return (
    <AppShell header={{ height: 64 }} padding="md">
      <AppShell.Header withBorder>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between" align="center">
            <Group>
              <Title order={3}>Vegetable</Title>
              <Badge variant="light" color="brand" radius="sm">
                SHOP
              </Badge>
            </Group>

            <Group gap="md">
              <Text fw={600}>{count} товаров</Text>
              <Text c="dimmed">${total}</Text>

              <CartPopup
                cart={cart}
                onInc={inc}
                onDec={dec}
                total={total}
              >
                <Button
                  color="brand"
                  leftSection={<IconShoppingCart size={16} />}
                >
                  Cart
                </Button>
              </CartPopup>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main bg="var(--mantine-color-gray-1)">
        <Container size="lg" py="xl">
          <Title order={2} mb="lg">
            Catalog
          </Title>

          {loading ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} height={280} radius="lg" />
              ))}
            </SimpleGrid>
          ) : error ? (
            <Text c="red">{error}</Text>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  {...p}
                  addToCart={(qty) => addToCart(p, qty)}
                  getItemQuantity={getItemQuantity}
                  setItemQuantity={setItemQuantity}
                />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
