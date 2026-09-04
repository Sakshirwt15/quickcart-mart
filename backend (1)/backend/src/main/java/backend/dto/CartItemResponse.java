package backend.dto;

import backend.model.CartItem;

public class CartItemResponse {
  private Long id;
  private String productName;
  private Double price;
  private Integer quantity;

  public static CartItemResponse fromEntity(CartItem item) {
    CartItemResponse dto = new CartItemResponse();
    dto.id = item.getId();
    dto.productName = item.getProduct().getName();
    dto.price = item.getProduct().getPrice();
    dto.quantity = item.getQuantity();
    return dto;
  }

  public Long getId() {
    return id;
  }

  public String getProductName() {
    return productName;
  }

  public Double getPrice() {
    return price;
  }

  public Integer getQuantity() {
    return quantity;
  }
}