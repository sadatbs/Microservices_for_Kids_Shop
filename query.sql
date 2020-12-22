drop procedure  new_add_rating;
create procedure new_add_rating(in add_product_id int,
                            in rating_value int,
                            in customer_id int)
begin
    DECLARE PRODUCT_EXISTS  INT;
    SELECT  COUNT(*)
    INTO PRODUCT_EXISTS
     FROM RATING
    WHERE PRODUCT_ID = ADD_PRODUCT_ID AND RATER_ID = CUSTOMER_ID;
    IF PRODUCT_EXISTS = 0 THEN
        insert into rating (product_id, value, rater_id, time_stamp)
  value (add_product_id, rating_value, customer_id, NOW());
    ELSE
        UPDATE rating SET value = rating_value  WHERE product_id = add_product_id AND rater_id = customer_id;
    end if;

    SELECT COUNT(*) FROM rating;

end;

CALL new_add_rating(7,4,7);
CALL new_add_rating(9,5,9);
CALL new_add_rating(9,3,9);