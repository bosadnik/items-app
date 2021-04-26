CREATE TABLE IF NOT EXISTS customers (
	id SERIAL PRIMARY KEY,
    name text NOT NULL)

drop table items;

CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    description text NOT NULL,
	price numeric NOT NULL,
	customer_id int NULL,
	CONSTRAINT fk_customer_id
		FOREIGN KEY(customer_id) 
		   	REFERENCES customers(id)
)	
