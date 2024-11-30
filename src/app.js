document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000},
      { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000},
      { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000},
      { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 35000},
      { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 40000},
      { id: 6, name: 'Robusta Sidikalang', img: '6.jpg', price: 45000},
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //  cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada /  cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, tottal: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id === newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, maka tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau diremove berdarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if(cartItem.quantity > 1) {
        // telusuri satu satu
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if(item.id !== id) {
            return item;
          } else {
            item.quantity--;
            itemm.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      }
    }
  })
});

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
