/*
 *  TaxInformation
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:39 PM
 * */

package com.lemoo.store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaxInformation extends BaseEntity {
	/**
	 * Represents tax-related information, including a Tax Identification Number (TIN).
	 */
	private String TIN;

	/**
	 * Tax document image url
	 */
	private String document;

	@OneToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Store store;
}
