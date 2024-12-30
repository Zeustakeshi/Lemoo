/*
 *  ShortCodeGenerator
 *  @author: Minhhieuano
 *  @created 12/28/2024 12:32 PM
 * */

package com.lemoo.product.common.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class ShortCodeGenerator {
    public static String generateShortCode(String data, String timestamp, String prefix)
            throws NoSuchAlgorithmException {

        // Combine userId and timestamp to create input string
        String input = data + "-" + timestamp;

        // Hash using SHA-256
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));

        // Encode with Base64 and shorten
        String base64Encoded = Base64.getUrlEncoder().encodeToString(hash);
        String shortCode = base64Encoded.substring(0, 8); // Take the first 8 characters

        // Add prefix if available
        if (prefix != null && !prefix.isEmpty()) {
            shortCode = prefix + shortCode;
        }

        return shortCode;
    }
}
