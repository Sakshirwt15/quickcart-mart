package backend.controller;

import backend.dto.OrderResponse;
import backend.model.Category;
import backend.model.Order;
import backend.model.Product;
import backend.repository.CategoryRepository;
import backend.repository.OrderRepository;
import backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private CategoryRepository categoryRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private OrderRepository orderRepository;

    // ---- Products ----
    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updated) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(updated.getName());
        product.setPrice(updated.getPrice());
        product.setStockQuantity(updated.getStockQuantity());
        return productRepository.save(product);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    // ---- Categories ----
    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    // ---- Orders (admin sees ALL orders, not just their own) ----
    @GetMapping("/orders")
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(OrderResponse::fromEntity)
                .collect(Collectors.toList());
    }
}