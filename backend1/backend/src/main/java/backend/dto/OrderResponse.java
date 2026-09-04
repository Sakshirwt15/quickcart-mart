package backend.dto;

import backend.model.Order;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderResponse {
  private Long id;
  private String status;
  private Double totalAmount;
  private LocalDateTime createdAt;
  private List<OrderItemResponse> items;

  public static OrderResponse fromEntity(Order order) {
    OrderResponse dto = new OrderResponse();
    dto.id = order.getId();
    dto.status = order.getStatus();
    dto.totalAmount = order.getTotalAmount();
    dto.createdAt = order.getCreatedAt();
    dto.items = order.getItems().stream()
        .map(OrderItemResponse::fromEntity)
        .collect(Collectors.toList());
    return dto;
  }

  // Getters — no Lombok here, being explicit since this crosses into JSON
  // serialization
  public Long getId() {
    return id;
  }

  public String getStatus() {
    return status;
  }

  public Double getTotalAmount() {
    return totalAmount;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public List<OrderItemResponse> getItems() {
    return items;
  }
}