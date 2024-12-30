/*
 *  ShopeeCategoryClient
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:09 AM
 * */

package com.lemoo.product.client;

import java.util.List;
import lombok.Data;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "CategoryClient", url = "https://banhang.shopee.vn/help/api/v3")
public interface CategoryClient {

	@GetMapping("/global_category/list/")
	ApiResponse fetchCategories(
			@RequestParam("page") long page, @RequestParam("size") long size); // Replace with the actual endpoint

	@Data
	class ApiResponse {
		private String msg;
		private int code;
		private Data data;

		// Getters and Setters

		@lombok.Data
		public static class Data {
			private int total;
			private List<GlobalCategory> global_cats;

			// Getters and Setters
			@lombok.Data
			public static class GlobalCategory {
				private String category_name;
				private String hl_category_id;
				private boolean toggle;
				private long mtime;
				private List<String> images;
				private List<Path> path;
				private int category_id;
				private String hl_category_name;

				// Getters and Setters
				@lombok.Data
				public static class Path {
					private int category_id;
					private String category_name;

					// Getters and Setters
				}
			}
		}
	}
}
