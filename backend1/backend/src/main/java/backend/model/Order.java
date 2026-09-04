package backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderItem> items;

  private Double totalAmount;
  private String status; // PLACED, DELIVERED, CANCELLED
  private LocalDateTime createdAt;
}