package backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  private String imageUrl;

  @Column(nullable = false)
  private Double price;

  @Column(nullable = false)
  private Integer stockQuantity;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;
}