/*
 *  RoomRequest
 *  @author: Minhhieuano
 *  @created 2/7/2025 3:52 PM
 * */

package com.lemoo.chat.dto.request;

import jakarta.validation.constraints.Size;
import java.util.Set;
import lombok.Data;

@Data
public class RoomRequest {
	@Size(min = 2, max = 100)
	private Set<String> members;
}
