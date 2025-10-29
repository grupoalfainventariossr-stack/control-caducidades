// src/services/productsService.js
"use client";

const STORAGE_KEY = "products";

export function getProducts() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProduct(prod) {
  const list = getProducts();
  if (prod.id) {
    const idx = list.findIndex((p) => p.id === prod.id);
    list[idx] = prod;
  } else {
    prod.id = Date.now();
    list.push(prod);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function deleteProduct(id) {
  const list = getProducts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// === Utilidades para lotes y caducidades ===
export function calculateMonthsAndDays(start, end) {
  if (!(start instanceof Date) || !(end instanceof Date)) return { meses: 0, dias: 0 };
  let meses = 0, dias = 0;
  let temp = new Date(start);
  while (temp < end) {
    temp.setMonth(temp.getMonth() + 1);
    if (temp <= end) meses++;
    else { temp.setMonth(temp.getMonth() - 1); break; }
  }
  if (temp < end) {
    const diff = end - temp;
    dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  }
  return { meses, dias };
}

export function getExpirationStatus(dateStr) {
  if (!dateStr) return { label: "", className: "" };
  const today = new Date();
  const exp = new Date(dateStr);
  const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { label: "CADUCADO", className: "status-expired" };

  const { meses, dias } = calculateMonthsAndDays(today, exp);
  const texto =
    meses > 0 && dias > 0
      ? `${meses} meses y ${dias} días`
      : meses > 0
      ? `${meses} meses`
      : `${dias} días`;

  if (diffDays <= 7)
    return { label: `PRÓXIMO (${texto})`, className: "status-warning" };
  else if (diffDays <= 30)
    return { label: `EN ${texto}`, className: "status-warning" };
  else return { label: texto, className: "status-ok" };
}
