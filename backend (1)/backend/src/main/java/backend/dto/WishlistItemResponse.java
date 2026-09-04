package backend.dto;

import backend.model.WishlistItem;

public class WishlistItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private Double price;

    public static WishlistItemResponse fromEntity(WishlistItem item) {
        WishlistItemResponse dto = new WishlistItemResponse();
        dto.id = item.getId();
        dto.productId = item.getProduct().getId();
        dto.productName = item.getProduct().getName();
        dto.price = item.getProduct().getPrice();
        return dto;
    }

    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public Double getPrice() { return price; }
}