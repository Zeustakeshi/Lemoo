/*
 *  ProductVariantRequest
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:36 PM
 * */

package com.lemoo.product.dto.request;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Map;
import lombok.Data;

@Data
public class ProductVariantRequest {

	@NotEmpty
	@Size(min = 3, max = 20)
	private String name;

	@NotEmpty
	@Size(min = 8, max = 15)
	private String sellerSku;

	//    @NotNull
	//    private MultipartFile image;

	private Boolean allowSale;

	@NotNull @Min(1000)
	@Max(90000000)
	private Long price;

	@Min(1000)
	@Max(90000000)
	private Long specialPrice;

	private LocalDateTime specialFromDate;
	private LocalDateTime specialToDate;

	@NotNull @Min(1)
	private Long stock;

	@NotNull @DecimalMin("0.01")
	@DecimalMax("320")
	private Double packageWidth; // cm

	@NotNull @DecimalMin("0.01")
	@DecimalMax("320")
	private Double packageHeight; // cm

	@NotNull @DecimalMin("0.01")
	@DecimalMax("320")
	private Double packageLength; // cm

	@NotNull @DecimalMin("0.001")
	@DecimalMax("300")
	private Double packageWeight; // g

	private Map<String, String> attributes;
}
