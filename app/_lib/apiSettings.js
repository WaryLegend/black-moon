import testdata from "@/app/_data/testdata.JSON";

//fetch all clothes colors variant
async function fetchColors() {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const colors = testdata.colors || [];
    // later change to this
    // const res = await fetch(`${process.env.API_URL}/colors`);
    // return colors = await res.json();
    return colors;
  } catch (err) {
    console.error("Error loading all colors:", err);
  }
}
export async function getColors() {
  const colors = await fetchColors();
  if (colors) return colors.map(({ id, label }) => ({ value: id, label }));
  return;
}

//fetch all clothes sizes
async function fetchSizes() {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const sizes = testdata.sizes || [];
    // later change to this
    // const res = await fetch(`${process.env.API_URL}/sizes`);
    // return sizes = await res.json();
    return sizes;
  } catch (err) {
    console.error("Error loading all sizes:", err);
  }
}
export async function getSizes() {
  const sizes = await fetchSizes();
  if (sizes) return sizes.map(({ id, label }) => ({ value: id, label }));
  return;
}

// get store settings
export async function getSettings() {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const settings = testdata.settings || {};
    // later change to this
    // const res = await fetch(`${process.env.API_URL}/settings`);
    // return settings = await res.json();
    return settings;
  } catch (err) {
    console.error("Error loading settings:", err);
  }
}

//addColor
//addSize
//updateColor
//updateSize
//updateMaxOrderingQuantity

// import { cache } from "react";

// export const getColors = cache(async () => {
//   // your API call
//   const res = await fetch("your-api/colors", { next: { revalidate: 7200 } });
//   return res.json();
// });

// export const getSizes = cache(async () => {
//   const res = await fetch("your-api/sizes", { next: { revalidate: 7200 } });
//   return res.json();
// });
