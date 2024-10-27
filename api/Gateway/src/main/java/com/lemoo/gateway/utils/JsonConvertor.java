/*
 *  JsonConvertor
 *  @author: Minhhieuano
 *  @created 9/14/2024 12:42 AM
 * */

package com.vibio.gateway.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JsonConvertor {
	private final ObjectMapper objectMapper;

	public byte[] convertObjectToJsonBytes(Object object) {
		try {
			return objectMapper.writeValueAsBytes(object);
		} catch (Exception e) {
			throw new RuntimeException("Error converting object to JSON", e);
		}
	}
}
