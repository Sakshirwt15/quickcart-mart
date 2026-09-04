package backend.service;

import backend.dto.CartResponse;
import backend.model.*;
import backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

  @Autowired
  private CartRepository cartRepository;
  @Autowired
  private CartItemRepository cartItemRepository;
  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private UserRepository userRepository;

  public Cart getOrCreateCartForUser(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getCart() != null)
      return user.getCart();

    Cart cart = new Cart();
    cart = cartRepository.save(cart);
    user.setCart(cart);
    userRepository.save(user);
    return cart;
  }

  public CartResponse getCartForUser(String email) {
    Cart cart = getOrCreateCartForUser(email);
    return CartResponse.fromEntity(cart);
  }

  public void removeItem(String email, Long cartItemId) {
    Cart cart = getOrCreateCartForUser(email);
    CartItem item = cartItemRepository.findById(cartItemId)
        .orElseThrow(() -> new RuntimeException("Item not found"));

    if (!item.getCart().getId().equals(cart.getId())) {
      throw new RuntimeException("This item doesn't belong to your cart");
    }

    cartItemRepository.delete(item);
  }

  public CartItem addItemToCart(String email, Long productId, Integer quantity) {
    Cart cart = getOrCreateCartForUser(email);
    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    CartItem item = new CartItem();
    item.setCart(cart);
    item.setProduct(product);
    item.setQuantity(quantity);
    return cartItemRepository.save(item);
  }
}