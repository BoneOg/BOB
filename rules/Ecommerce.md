# 👶 BOB - Baby On Board | Full E‑Commerce Prompt for Cursor

## 🌿 Brand Description

**BOB** stands for **Baby On Board** – a sustainable baby and children's clothing store.

- 🌱 *Sustainable, handmade babywear*
- 🧵 *Made to order to avoid waste*
- 📍 *Based in Siargao*
- 📸 Instagram: [@babyonboard_siargao](https://instagram.com/babyonboard_siargao)

---

## 🎨 Design Language

### 🟩 Color Palette

| Role         | Color Name   | Hex Code  | Usage                      |
|--------------|--------------|-----------|----------------------------|
| Primary      | Sage Green   | `#89B29E` | Buttons, links, highlights |
| Secondary    | Warm Beige   | `#E1CEC0` | Backgrounds, cards         |
| Accent       | Pale Stone   | `#E6E4DF` | Borders, subtle UI         |
| Text (Main)  | Deep Gray    | `#1A1A1A` | Primary content text       |
| Text (Muted) | Soft Gray    | `#5A5A5A` | Labels, secondary text     |
| Background   | White        | `#FFFFFF` | Page backgrounds           |

### ✅ Feedback Colors

| State   | Name          | Hex       | Usage                  |
|---------|---------------|-----------|------------------------|
| Success | Herbal Green  | `#94AF9F` | Alerts, form success   |
| Warning | Oat Beige     | `#DABF8C` | Warnings, tooltips     |
| Error   | Terracotta    | `#C88F84` | Validation errors      |

### 📐 Shape & Spacing

| Element       | Radius   | Padding                     |
|---------------|----------|-----------------------------|
| Button        | 8px      | 16px x 12px                 |
| Card          | 12px     | 24px                        |
| Input         | 6px      | 12px x 10px                 |
| Badge         | 999px    | —                           |
| Container     | —        | 32px gutter/margin          |

### 💡 Shadows

```css
/* Soft shadow */
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);

/* Elevated cards or modals */
box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.08);

🧱 Full Database Schema
sql
Copy
Edit
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    phone VARCHAR(20),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE Subcategories (
    subcategory_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(100),
    type ENUM('color'),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    stock_quantity INT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE ProductAttributes (
    attribute_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    subcategory_id INT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (subcategory_id) REFERENCES Subcategories(subcategory_id)
);

CREATE TABLE DiscountCodes (
    discount_id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE,
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    free_shipping BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE CartItems (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    discount_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    discount_value DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (discount_id) REFERENCES DiscountCodes(discount_id)
);

CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    product_name_snapshot VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    transaction_ref VARCHAR(100),
    payment_gateway VARCHAR(50),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount_paid DECIMAL(10,2),
    status ENUM('paid', 'failed', 'refunded') DEFAULT 'paid',
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
🌱 Laravel Seeder Data
UsersSeeder
php
Copy
Edit
User::insert([
    ['name' => 'Admin', 'email' => 'admin@bob.com', 'password' => bcrypt('adminpass'), 'phone' => '09999999999', 'role' => 'admin'],
    ['name' => 'Customer', 'email' => 'customer@bob.com', 'password' => bcrypt('customerpass'), 'phone' => '08888888888', 'role' => 'user']
]);
CategorySeeder
php
Copy
Edit
Category::insert([
    ['name' => '6-12 months'],
    ['name' => '1-2 years'],
    ['name' => '3-4 years'],
    ['name' => '6 months - 2 years'],
]);
SubcategorySeeder
php
Copy
Edit
$colors = ['Sage Green', 'Warm Beige', 'Pale Stone'];
foreach ($colors as $color) {
    Subcategory::create([
        'category_id' => 1,
        'name' => $color,
        'type' => 'color'
    ]);
}
ProductSeeder
php
Copy
Edit
Product::insert([
    ['name' => 'The Playful Dungaree', 'description' => 'Handmade dungarees for playtime.', 'price' => 899, 'stock_quantity' => 20, 'category_id' => 1],
    ['name' => 'The Playful Dungaree', 'description' => 'Handmade dungarees for playtime.', 'price' => 899, 'stock_quantity' => 15, 'category_id' => 2],
    ['name' => 'The Playful Dungaree', 'description' => 'Handmade dungarees for playtime.', 'price' => 899, 'stock_quantity' => 10, 'category_id' => 3],
    ['name' => 'Muslin Poncho', 'description' => 'Soft poncho, perfect for beach or bath.', 'price' => 750, 'stock_quantity' => 30, 'category_id' => 4],
    ['name' => 'The Little Lade', 'description' => 'Elegant outfit for little ladies.', 'price' => 980, 'stock_quantity' => 10, 'category_id' => 3],
]);
ProductAttributesSeeder
php
Copy
Edit
$productIds = Product::pluck('product_id')->toArray();
$colorIds = Subcategory::pluck('subcategory_id')->toArray();

foreach ($productIds as $pid) {
    foreach ($colorIds as $cid) {
        ProductAttribute::create([
            'product_id' => $pid,
            'subcategory_id' => $cid,
        ]);
    }
}

🧭 User Flow
welcome.tsx: Seamless landing page with sections: Hero, Product Highlights, About, Shop Now, Footer.

Add to cart (unauthenticated) → toast notification: “Please log in.”

Redirect to login.tsx or register.tsx.

After login → user_dashboard.tsx.

user_dashboard.tsx:

Editable name, email, phone, address (with pencil icon)

Password reset

Order history

Logout with modal

cart.tsx:

List products with +/−, delete icon

Toasts for updates/removals

Total calculation

checkout.tsx:

Left column: shipping & contact info (editable)

Right column: product summary, subtotal, discount input, ₱200 shipping, total

transaction.tsx: Full summary of order, shipping, and payment info

🔧 Admin Flow
admin_dashboard.tsx: 6 filter cards → analytics

Pending, Confirmed, Completed, Cancelled, Refunded, All

transactions.tsx: view & manage orders

Confirm, Cancel, Complete, Refund

products.tsx: product list with modal-based CRUD

discounts.tsx: configure discount codes, attach to products

settings.tsx: business contact, currency, timezone

🔔 Notifications
✅ Add to Cart → “Item added” or “Please log in”

✅ Cart Remove → “Item removed”

✅ Profile Save → “Updated successfully”

✅ Discount Code → “Code applied” or “Invalid code”

🛠️ Cursor Instructions
Generate Laravel migrations using the database schema

Create Eloquent models and define relationships

Build React TypeScript + Inertia pages

Add auth and session logic for cart and checkout

Implement order + payment creation

Use Tailwind CSS v4 to apply minimalist, earthy design

Add all seeders to DatabaseSeeder.php

Start with:

php artisan migrate

php artisan db:seed

🧰 Tech Stack
This project is built using a modern full-stack setup optimized for developer experience, performance, and clean UI:

Backend: Laravel 12

Frontend: InertiaJS v2.0 + React TypeScript v19

Styling: Tailwind CSS v4 for utility-first, minimalist design

UI Components: shadcn/ui

Icons: Lucide Icons

Animations: Framer Motion for subtle interactions and transitions