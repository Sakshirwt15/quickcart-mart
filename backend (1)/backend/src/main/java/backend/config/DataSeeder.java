package backend.config;

import backend.model.Category;
import backend.model.Product;
import backend.repository.CategoryRepository;
import backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataSeeder(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            return;
        }

        Category fruits = save("Fruits & Vegetables");
        Category dairy = save("Dairy & Bread");
        Category snacks = save("Snacks & Munchies");
        Category beverages = save("Beverages");
        Category staples = save("Atta, Rice & Dal");
        Category personalCare = save("Personal Care");
        Category household = save("Household Essentials");
        Category bakery = save("Bakery & Biscuits");

        addProduct("Apple", 120.5, 50, fruits);
        addProduct("Banana", 40.0, 80, fruits);
        addProduct("Tomato", 30.0, 100, fruits);
        addProduct("Potato", 25.0, 100, fruits);
        addProduct("Onion", 35.0, 90, fruits);
        addProduct("Orange", 90.0, 60, fruits);
        addProduct("Carrot", 45.0, 70, fruits);
        addProduct("Cucumber", 28.0, 65, fruits);
        addProduct("Spinach Bunch", 22.0, 40, fruits);
        addProduct("Capsicum", 55.0, 45, fruits);
        addProduct("Mango", 150.0, 30, fruits);
        addProduct("Grapes", 80.0, 40, fruits);

        addProduct("Amul Milk 1L", 62.0, 40, dairy);
        addProduct("Brown Bread", 45.0, 30, dairy);
        addProduct("Paneer 200g", 90.0, 25, dairy);
        addProduct("Butter 100g", 55.0, 35, dairy);
        addProduct("Curd 400g", 40.0, 30, dairy);
        addProduct("Cheese Slices", 110.0, 20, dairy);
        addProduct("Ghee 500ml", 320.0, 20, dairy);

        addProduct("Lays Classic", 20.0, 100, snacks);
        addProduct("Kurkure", 20.0, 100, snacks);
        addProduct("Bhujia 200g", 45.0, 60, snacks);
        addProduct("Mixture Namkeen", 50.0, 55, snacks);
        addProduct("Popcorn", 35.0, 70, snacks);
        addProduct("Peanuts Roasted", 60.0, 50, snacks);

        addProduct("Coca-Cola 750ml", 40.0, 70, beverages);
        addProduct("Tropicana Orange Juice", 110.0, 40, beverages);
        addProduct("Red Bull", 125.0, 30, beverages);
        addProduct("Mineral Water 1L", 20.0, 100, beverages);
        addProduct("Green Tea Bags", 150.0, 30, beverages);
        addProduct("Instant Coffee", 180.0, 35, beverages);

        addProduct("Aashirvaad Atta 5kg", 250.0, 40, staples);
        addProduct("India Gate Basmati Rice 1kg", 120.0, 50, staples);
        addProduct("Toor Dal 1kg", 140.0, 45, staples);
        addProduct("Moong Dal 1kg", 130.0, 40, staples);
        addProduct("Sunflower Oil 1L", 150.0, 35, staples);
        addProduct("Sugar 1kg", 45.0, 60, staples);
        addProduct("Salt 1kg", 22.0, 70, staples);

        addProduct("Colgate Toothpaste", 55.0, 60, personalCare);
        addProduct("Dove Soap", 45.0, 70, personalCare);
        addProduct("Shampoo 200ml", 180.0, 40, personalCare);
        addProduct("Hand Sanitizer 100ml", 60.0, 50, personalCare);

        addProduct("Surf Excel Detergent 1kg", 190.0, 35, household);
        addProduct("Dishwash Liquid", 95.0, 45, household);
        addProduct("Toilet Cleaner", 85.0, 40, household);
        addProduct("Garbage Bags (Pack of 30)", 120.0, 30, household);

        addProduct("Oreo Biscuit", 30.0, 80, bakery);
        addProduct("Marie Gold Biscuit", 35.0, 75, bakery);
        addProduct("Chocolate Cake Slice", 60.0, 20, bakery);
        addProduct("Pav Buns (Pack of 6)", 35.0, 40, bakery);

        System.out.println("✅ Database seeded with " + productRepository.count() + " products across " + categoryRepository.count() + " categories.");
    }

    private Category save(String name) {
        Category c = new Category();
        c.setName(name);
        return categoryRepository.save(c);
    }

    private void addProduct(String name, double price, int stock, Category category) {
        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setStockQuantity(stock);
        p.setCategory(category);
        productRepository.save(p);
    }
}