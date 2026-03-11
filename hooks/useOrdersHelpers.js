import { subDays, isWithinInterval, parseISO } from "date-fns";

function getDateRange(numDays) {
  const endDate = new Date();
  const startDate = subDays(endDate, numDays);
  return { startDate, endDate };
}

export function calculateTotalRevenue(orders, numDays) {
  if (!orders) return 0;
  const { startDate, endDate } = getDateRange(numDays);
  return orders
    .filter((o) => o.status === "delivered")
    .filter((o) => {
      try {
        const d = parseISO(o.createdAt);
        return isWithinInterval(d, { start: startDate, end: endDate });
      } catch (e) {
        return false;
      }
    })
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
}

export function calculateTotalOrders(orders, numDays) {
  if (!orders) return 0;
  const { startDate, endDate } = getDateRange(numDays);
  return orders.filter((o) => {
    try {
      const d = parseISO(o.createdAt);
      return isWithinInterval(d, { start: startDate, end: endDate });
    } catch (e) {
      return false;
    }
  }).length;
}

export function calculateProductsSold(orders, numDays) {
  if (!orders) return 0;
  const { startDate, endDate } = getDateRange(numDays);
  return orders
    .filter((o) => o.status === "delivered")
    .filter((o) => {
      try {
        const d = parseISO(o.createdAt);
        return isWithinInterval(d, { start: startDate, end: endDate });
      } catch (e) {
        return false;
      }
    })
    .reduce((total, order) => {
      const itemsCount = (order.items || []).reduce(
        (sum, item) => sum + (item.quantity || 0),
        0,
      );
      return total + itemsCount;
    }, 0);
}

export function calculateSalesByCategory(orders, numDays) {
  if (!orders) return [];
  const { startDate, endDate } = getDateRange(numDays);
  const categoryMap = new Map();

  orders
    .filter((o) => o.status === "delivered")
    .filter((o) => {
      try {
        const d = parseISO(o.createdAt);
        return isWithinInterval(d, { start: startDate, end: endDate });
      } catch (e) {
        return false;
      }
    })
    .forEach((order) => {
      (order.items || []).forEach((item) => {
        const key = item.categoryId;
        if (!categoryMap.has(key)) {
          categoryMap.set(key, {
            id: item.categoryId,
            name: item.categoryName,
            totalSales: 0,
            itemsSold: 0,
          });
        }
        const cat = categoryMap.get(key);
        cat.totalSales += item.subtotal || 0;
        cat.itemsSold += item.quantity || 0;
      });
    });

  return Array.from(categoryMap.values()).sort((a, b) => b.totalSales - a.totalSales);
}

export function calculateSalesByProduct(orders, numDays) {
  if (!orders) return [];
  const { startDate, endDate } = getDateRange(numDays);
  const productMap = new Map();

  orders
    .filter((o) => o.status === "delivered")
    .filter((o) => {
      try {
        const d = parseISO(o.createdAt);
        return isWithinInterval(d, { start: startDate, end: endDate });
      } catch (e) {
        return false;
      }
    })
    .forEach((order) => {
      (order.items || []).forEach((item) => {
        const key = item.productId;
        if (!productMap.has(key)) {
          productMap.set(key, {
            id: item.productId,
            name: item.productName,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            totalSales: 0,
            unitsSold: 0,
            variants: new Map(),
          });
        }
        const prod = productMap.get(key);
        prod.totalSales += item.subtotal || 0;
        prod.unitsSold += item.quantity || 0;

        const variantKey = `${item.color}-${item.size}`;
        if (!prod.variants.has(variantKey)) {
          prod.variants.set(variantKey, {
            color: item.color,
            size: item.size,
            quantity: 0,
            subtotal: 0,
          });
        }
        const variant = prod.variants.get(variantKey);
        variant.quantity += item.quantity || 0;
        variant.subtotal += item.subtotal || 0;
      });
    });

  const result = Array.from(productMap.values()).map((p) => ({
    ...p,
    variants: Array.from(p.variants.values()),
  }));

  return result.sort((a, b) => b.totalSales - a.totalSales);
}
