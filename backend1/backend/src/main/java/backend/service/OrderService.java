package backend.service;

import backend.dto.OrderResponse;
import java.util.List;

import backend.model.*;
import backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class OrderService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private OrderRepository orderRepository;
  @Autowired
  private OrderItemRepository orderItemRepository;
  @Autowired
  private CartItemRepository cartItemRepository;
  @Autowired
  private CartRepository cartRepository;

  @Transactional
  public Order placeOrder(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    Cart cart = user.getCart();
    if (cart == null || cart.getItems().isEmpty()) {
      throw new RuntimeException("Cart is empty");
    }

    Order order = new Order();
    order.setUser(user);
    order.setStatus("PLACED");
    order.setCreatedAt(LocalDateTime.now());
    order = orderRepository.save(order);

    List<OrderItem> orderItems = new java.util.ArrayList<>();
    double total = 0;

    for (CartItem cartItem : cart.getItems()) {
      Product product = cartItem.getProduct();

      if (product.getStockQuantity() < cartItem.getQuantity()) {
        throw new RuntimeException("Insufficient stock for " + product.getName());
      }

      OrderItem orderItem = new OrderItem();
      orderItem.setOrder(order);
      orderItem.setProduct(product);
      orderItem.setQuantity(cartItem.getQuantity());
      orderItem.setPriceAtPurchase(product.getPrice());
      orderItemRepository.save(orderItem);
      orderItems.add(orderItem);

      product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());

      total += product.getPrice() * cartItem.getQuantity();
    }

    order.setItems(orderItems);
    order.setTotalAmount(total);
    orderRepository.save(order);

    cartItemRepository.deleteAll(cart.getItems());

    return order;
  }

  public List<OrderResponse> getOrdersForUser(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    List<Order> orders = orderRepository.findByUserOrderByCreatedAtDesc(user);

    return orders.stream()
        .map(OrderResponse::fromEntity)
        .collect(Collectors.toList());
  }

  @Transactional
  public void cancelOrder(String email, Long orderId) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

    if (!order.getUser().getId().equals(user.getId())) {
        throw new RuntimeException("This order doesn't belong to you");
    }
    if (!order.getStatus().equals("PLACED")) {
        throw new RuntimeException("Only placed orders can be cancelled");
    }

    // restore stock
    for (OrderItem item : order.getItems()) {
        Product product = item.getProduct();
        product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
    }

    order.setStatus("CANCELLED");
    orderRepository.save(order);
  }

  @Transactional
  public void reorder(String email, Long orderId) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

    if (!order.getUser().getId().equals(user.getId())) {
        throw new RuntimeException("This order doesn't belong to you");
    }

    Cart cart = user.getCart();
    if (cart == null) {
        cart = new Cart();
        cart = cartRepository.save(cart);
        user.setCart(cart);
        userRepository.save(user);
    }

    for (OrderItem item : order.getItems()) {
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(item.getProduct());
        cartItem.setQuantity(item.getQuantity());
        cartItemRepository.save(cartItem);
    }
  }
}