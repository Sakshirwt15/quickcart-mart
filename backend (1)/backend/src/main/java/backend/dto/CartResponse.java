package backend.dto;

import backend.model.Cart;
import java.util.List;
import java.util.stream.Collectors;

public class CartResponse {
  private Long id;
  private List<CartItemResponse> items;
  private Double totalAmount;

  public static CartResponse fromEntity(Cart cart) {
    CartResponse dto = new CartResponse();
    dto.id = cart.getId();
    dto.items = cart.getItems().stream()
        .map(CartItemResponse::fromEntity)
        .collect(Collectors.toList());
    dto.totalAmount = dto.items.stream()
        .mapToDouble(i -> i.getPrice() * i.getQuantity())
        .sum();
    return dto;
  }

  public Long getId() {
    return id;
  }

  public List<CartItemResponse> getItems() {
    return items;
  }

  public Double getTotalAmount() {
    return totalAmount;
  }
}