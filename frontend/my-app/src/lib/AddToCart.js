export const saveToCart = (selectedProduct) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingIndex = cart.findIndex(item =>
      item.id === selectedProduct.id &&
      JSON.stringify(item.attributes) === JSON.stringify(selectedProduct.attributes)
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
    cart.push({
      ...selectedProduct,
      quantity: 1
    });
  }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
}
