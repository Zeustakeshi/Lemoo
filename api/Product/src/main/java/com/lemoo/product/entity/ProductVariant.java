/*
 *  ProductVariant
 *  @author: Minhhieuano
 *  @created 12/14/2024 10:30 AM
 * */

package com.lemoo.product.entity;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@CompoundIndex(name = "variant_seller_sku_product_id_idx", unique = true, def = "{'sellerSku': 1, 'productId': 1}")
public class ProductVariant extends BaseEntity {

	private String sellerSku;

	@Indexed
	private String name;

	private ProductMedia image;

	@Indexed
	private String productId;

	private boolean allowSale;

	private Long price;
	private Long specialPrice;
	private LocalDateTime specialFromDate;
	private LocalDateTime specialToDate;

	private Long stock;
	private Double packageWidth; // cm
	private Double packageHeight; // cm
	private Double packageLength; // cm
	private Double packageWeight; // g

	private Map<String, String> attributes; // {"color": "red", "size": "M"}
}
