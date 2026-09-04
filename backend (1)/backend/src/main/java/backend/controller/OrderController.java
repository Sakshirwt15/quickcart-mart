package backend.controller;

import backend.dto.OrderResponse;
import backend.model.Order;
import backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired private OrderService orderService;

    @PostMapping
    public OrderResponse placeOrder(Authentication authentication) {
        Order order = orderService.placeOrder(authentication.getName());
        return OrderResponse.fromEntity(order);
    }

    @GetMapping
    public List<OrderResponse> getMyOrders(Authentication authentication) {
        return orderService.getOrdersForUser(authentication.getName());
    }

    @PutMapping("/{id}/cancel")
    public void cancelOrder(Authentication authentication, @PathVariable Long id) {
        orderService.cancelOrder(authentication.getName(), id);
    }

    @PostMapping("/{id}/reorder")
    public void reorder(Authentication authentication, @PathVariable Long id) {
        orderService.reorder(authentication.getName(), id);
    }
}