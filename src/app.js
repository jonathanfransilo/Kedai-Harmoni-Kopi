document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
      { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000 },
      { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000 },
      { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 35000 },
      { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 40000 },
      { id: 6, name: 'Robusta Sidikalang', img: '6.jpg', price: 45000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      // Cek apakah barang sudah ada di keranjang
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        // Jika barang belum ada di keranjang
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, tambah quantity dan update total
        cartItem.quantity++;
        cartItem.total = cartItem.quantity * cartItem.price;
        this.total += newItem.price;
      }
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        // Kurangi quantity dan update total
        cartItem.quantity--;
        cartItem.total = cartItem.quantity * cartItem.price;
        this.total -= cartItem.price;
      } else {
        // Hapus item dari keranjang jika quantity = 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Fungsi format Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

