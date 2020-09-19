CREATE TABLE products (
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale boolean
);

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

SELECT * FROM restaurants;

INSERT INTO restaurants (name, location, price_range) VALUES ('macdonalds', 'new york', 3);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 AND rating <=5)
);
INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (1, 'elle', 'horrible expereience', 1);
INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (2, 'amanda', 'Good food', 3);
