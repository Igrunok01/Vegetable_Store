import { Card, Image, Text, Group, Button, AspectRatio } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import { QuantityControl } from '../../ui/QuantityControl';
import { splitName } from '../../utils/splitName';
import type { Product } from '../../types';

export default function ProductCard({
  id,
  name,
  price,
  image,
  addToCart,
  getItemQuantity,
  setItemQuantity,
}: Product & { addToCart: (quantity: number) => void } & {
  getItemQuantity: (id: number) => number;
} & {
  setItemQuantity: (id: number, quantity: number, product?: Product) => void;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const { title, meta } = splitName(name);
  const inCartQty = getItemQuantity(id);

  return (
    <Card
      withBorder
      shadow="xs"
      radius="xl"
      padding="lg"
      className={styles.card}
    >
      <Card.Section p="md" pb={0}>
        <AspectRatio ratio={1}>
          <Image src={image} alt={name} fit="contain" />
        </AspectRatio>
      </Card.Section>

      <Group
        justify="space-between"
        wrap="nowrap"
        align="center"
        mt="md"
        mb={6}
      >
        <Group gap={6} wrap="nowrap" style={{ minWidth: 0, flex: '1 1 67%' }}>
          <Text fw={600} lineClamp={1}>
            {title}
          </Text>
          {meta && (
            <Text c="dimmed" fz="sm" style={{ whiteSpace: 'nowrap' }}>
              {meta}
            </Text>
          )}
        </Group>
        <QuantityControl
          value={inCartQty > 0 ? inCartQty : quantity}
          onChange={(next) => {
            if (inCartQty > 0) {
              if (next === 0) {
                setItemQuantity(id, 0);
                setQuantity(1);
              } else {
                setItemQuantity(id, next);
              }
            } else {
              setQuantity(next);
            }
          }}
          min={inCartQty > 0 ? 0 : 1}
        />
      </Group>
      <Group justify="space-between" mt="xs">
        <Text fw={700}>${price}</Text>
        <Button
          color="brand"
          variant="light"
          rightSection={<IconShoppingCart size={16} />}
          onClick={() => {addToCart(quantity); setQuantity(1)}}
          className={styles.addBtn}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
}
