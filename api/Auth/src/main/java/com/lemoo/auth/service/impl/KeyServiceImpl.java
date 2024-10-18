/*
 *  KeyServiceImpl
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:44 AM
 * */


package com.lemoo.auth.service.impl;

import com.lemoo.auth.common.properties.AccessTokenProperties;
import com.lemoo.auth.common.properties.RefreshTokenProperties;
import com.lemoo.auth.service.KeyService;
import lombok.RequiredArgsConstructor;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.Security;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;


@Component
@RequiredArgsConstructor
public class KeyServiceImpl implements KeyService {

    // Static block to add BouncyCastleProvider for cryptography-related operations
    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    private final AccessTokenProperties accessTokenProperties;
    private final RefreshTokenProperties refreshTokenProperties;

    /**
     * Loads an RSA public key from a file.
     *
     * @param filePath the path to the public key file
     * @return the loaded RSAPublicKey
     * @throws IOException              if the file can't be read
     * @throws NoSuchAlgorithmException if RSA algorithm is not available
     * @throws InvalidKeySpecException  if the key specification is invalid
     */
    private RSAPublicKey loadPublicKey(String filePath)
            throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        try (FileInputStream fis = new FileInputStream(filePath)) {
            String keyContent = new String(Files.readAllBytes(Paths.get(filePath)));
            keyContent = keyContent
                    .replaceAll("-----BEGIN (.*)-----", "")
                    .replaceAll("-----END (.*)----", "")
                    .replaceAll("\\s", "");
            byte[] decodedKey = Base64.getDecoder().decode(keyContent);
            X509EncodedKeySpec spec = new X509EncodedKeySpec(decodedKey);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return (RSAPublicKey) keyFactory.generatePublic(spec);
        }
    }

    /**
     * Loads an RSA private key from a file.
     *
     * @param filePath the path to the private key file
     * @return the loaded RSAPrivateKey
     * @throws IOException              if the file can't be read
     * @throws NoSuchAlgorithmException if RSA algorithm is not available
     * @throws InvalidKeySpecException  if the key specification is invalid
     */
    private RSAPrivateKey loadPrivateKey(String filePath)
            throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        try (FileInputStream fis = new FileInputStream(filePath)) {
            String keyContent = new String(Files.readAllBytes(Paths.get(filePath)));
            keyContent = keyContent
                    .replaceAll("-----BEGIN (.*)-----", "")
                    .replaceAll("-----END (.*)----", "")
                    .replaceAll("\\s", "");
            byte[] decodedKey = Base64.getDecoder().decode(keyContent);
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decodedKey);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return (RSAPrivateKey) keyFactory.generatePrivate(spec);
        }
    }

    @Override
    public RSAPublicKey getAccessTokenPublicKey() {
        try {
            return loadPublicKey(accessTokenProperties.publicKey());
        } catch (IOException | NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException("Failed to load access token public key", e);
        }
    }

    @Override
    public PrivateKey getAccessTokenPrivateKey() {
        try {
            return loadPrivateKey(accessTokenProperties.privateKey());
        } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to load access token private key", e);
        }
    }

    @Override
    public RSAPublicKey getRefreshTokenPublicKey() {
        try {
            return loadPublicKey(refreshTokenProperties.publicKey());
        } catch (IOException | NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException("Failed to load refresh token public key", e);
        }
    }

    @Override
    public PrivateKey getRefreshTokenPrivateKey() {
        try {
            return loadPrivateKey(refreshTokenProperties.privateKey());
        } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to load refresh token private key", e);
        }
    }
}