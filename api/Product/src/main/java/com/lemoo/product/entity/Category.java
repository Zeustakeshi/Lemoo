/*
 *  Category
 *  @author: Minhhieuano
 *  @created 12/14/2024 12:06 AM
 * */

package com.lemoo.product.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "categories")
@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
@CompoundIndexes({@CompoundIndex(unique = true, name = "name_parentId_idx", def = "{'name': 1, 'parentId': 1}")})
public class Category extends BaseEntity {

	private String name;
	private String parentId;

	@Builder.Default
	private List<String> paths = new ArrayList<>();

	@JsonProperty("isLeaf")
	private boolean isLeaf;

	private List<String> images;
}
