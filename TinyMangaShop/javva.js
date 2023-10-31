// Function to update the "Shopping Cart" button
function updateCartButton() {
    const cartItems = localStorage.getItem('cartItems');
    const cartButton = document.querySelector('.register-button.cart-icon');
  
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      const itemCount = parsedCartItems.length;
      cartButton.textContent = `Shopping Cart (${itemCount})`;
    } else {
      cartButton.textContent = 'Shopping Cart';
    }
  }
  
  // Retrieve cart items from local storage and display them on the cart page
  const orderDetailsElement = document.getElementById('order-details');
  const cartItems = localStorage.getItem('cartItems');
  
  if (cartItems) {
    const parsedCartItems = JSON.parse(cartItems);
    let cartHTML = '<ul>';
  
    parsedCartItems.forEach(item => {
      cartHTML += `<li>${item.name} <button class="delete-item" data-name="${item.name}">Delete</button></li>`;
    });
  
    cartHTML += '</ul>';
    orderDetailsElement.innerHTML = cartHTML;
  
    // Get the delete buttons for cart items
    const deleteButtons = document.querySelectorAll('.delete-item');
    deleteButtons.forEach(button => {
      button.addEventListener('click', deleteCartItem);
    });
  }
  
  // Function to handle deleting items from the cart
  function deleteCartItem(event) {
    const itemName = event.target.dataset.name;
  
    // Retrieve cart items from local storage
    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
  
    // Find the item to be deleted
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
  
    if (itemIndex !== -1) {
      // Remove the item from the cart items array
      cartItems.splice(itemIndex, 1);
  
      // Update local storage with the updated cart items
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
      // Remove the item from the displayed cart on the cart page
      const itemElement = event.target.parentElement;
      itemElement.remove();
  
      alert('Item deleted from the cart');
  
      // Update the "Shopping Cart" button
      updateCartButton();
    }
  }
  
  // Call the updateCartButton function initially to set the button text
  updateCartButton();
  