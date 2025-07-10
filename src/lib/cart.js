// recuperer le paner depuis le local storage

export function getCart() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

// sauvegarder le panier

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ajoute ou met a jour le panier
export function decrementItem(item) {
  const cart = getCart();

  const existing = cart.find(
    (p) =>
      p.name === item.name && p.taille === item.taille && p.pate === item.pate
  );

  if (existing) {
    existing.quantity--;
    if (existing.quantity <= 0) {
      existing.quantity = 1; // Ensure quantity doesn't go below 1
    }
  }
  saveCart(cart);
}

export function addToCart(item) {
  const cart = getCart();

  const existing = cart.find(
    (p) =>
      p.name === item.name && p.taille === item.taille && p.pate === item.pate
  );

  if (existing) {
    existing.quantity++;
    if (existing.quantity >= 10) {
      existing.quantity = 10; // Ensure quantity doesn't go below 10
    }
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

// supprimer un item du panier

export function removeItem(item) {
  const cart = getCart();
  const index = cart.findIndex((p) => p.name === item.name);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}
// supprimer le panier

export function clearCart() {
  saveCart([]);
  window.dispatchEvent(new Event("cartUpdated"));
}
