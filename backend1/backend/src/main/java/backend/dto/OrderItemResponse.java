package backend.dto;

import backend.model.OrderItem;

public class OrderItemResponse {
  private String productName;
  private Integer quantity;
  private Double priceAtPurchase;

  public static OrderItemResponse fromEntity(OrderItem item) {
    OrderItemResponse dto = new OrderItemResponse();
    dto.productName = item.getProduct().getName();
    dto.quantity = item.getQuantity();
    dto.priceAtPurchase = item.getPriceAtPurchase();
    return dto;
  }

  public String getProductName() {
    return productName;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public Double getPriceAtPurchase() {
    return priceAtPurchase;
  }
}