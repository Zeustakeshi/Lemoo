/*
 *  BankInfomation
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:42 PM
 * */

package com.lemoo.store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
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
public class BankInformation extends BaseEntity {

	private String document;

	@Column(nullable = false)
	private String accountName;

	@Column(nullable = false)
	private String name;

	private String code;

	private String bin;

	@OneToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Store store;
}
