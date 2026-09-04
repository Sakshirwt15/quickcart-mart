package backend.controller;

import backend.dto.CartResponse;
import backend.model.CartItem;
import backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

  @Autowired
  private CartService cartService;

  @GetMapping
  public CartResponse getCart(Authentication authentication) {
    return cartService.getCartForUser(authentication.getName());
  }

  @PostMapping("/items")
  public CartItem addItem(Authentication authentication,
      @RequestParam Long productId,
      @RequestParam Integer quantity) {
    return cartService.addItemToCart(authentication.getName(), productId, quantity);
  }

  @DeleteMapping("/items/{itemId}")
  public void removeItem(Authentication authentication, @PathVariable Long itemId) {
    cartService.removeItem(authentication.getName(), itemId);
  }
}