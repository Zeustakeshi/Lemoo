/*
 *  TokenServiceImpl
 *  @author: Minhhieuano
 *  @created 10/18/2024 7:54 PM
 * */


package com.lemoo.auth.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.auth.common.enums.TokenType;
import com.lemoo.auth.common.properties.AccessTokenProperties;
import com.lemoo.auth.common.properties.RefreshTokenProperties;
import com.lemoo.auth.domain.Token;
import com.lemoo.auth.dto.response.TokenResponse;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.service.TokenService;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

@Service
public class TokenServiceImpl implements TokenService {
    private static final String TOKEN_ID_KEY = "token_id";
    private static final String TOKEN_TYPE_KEY = "type";

    private final AccessTokenProperties accessTokenProperties;
    private final RefreshTokenProperties refreshTokenProperties;
    private final JwtEncoder accessTokenEncoder;
    private final JwtEncoder refreshTokenEncoder;
    private final Jedis jedis;

    public TokenServiceImpl(
            AccessTokenProperties accessTokenProperties,
            RefreshTokenProperties refreshTokenProperties,
            JwtEncoder accessTokenEncoder,
            JwtEncoder refreshTokenEncoder,
            Jedis jedis
    ) {
        this.accessTokenEncoder = accessTokenEncoder;
        this.refreshTokenEncoder = refreshTokenEncoder;
        this.accessTokenProperties = accessTokenProperties;
        this.refreshTokenProperties = refreshTokenProperties;
        this.jedis = jedis;
    }


    @Override
    public TokenResponse generateTokenPair(Account account) {
        Token accessToken = generateAccessToken(account);
        Token refreshToken = generateRefreshToken(account);
        return new TokenResponse(accessToken, refreshToken);
    }

    private Token generateAccessToken(Account account) {

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime expireTime = now.plusHours(accessTokenProperties.expireIn());

        String tokenId = NanoIdUtils.randomNanoId();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .subject(account.getId())
                .claim("email", account.getEmail())
                .claim("avatar", account.getAvatar())
                .claim("scope", account.getAuthorities())
                .claim(TOKEN_TYPE_KEY, TokenType.ACCESS_TOKEN)
                .claim(TOKEN_ID_KEY, tokenId)
                .expiresAt(expireTime.toInstant(ZoneOffset.UTC))
                .build();

        String token =
                accessTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();

        return Token.builder()
                .id(tokenId)
                .type(TokenType.ACCESS_TOKEN)
                .value(token)
                .expiresIn(expireTime.atZone(ZoneId.systemDefault()).toEpochSecond())
                .build();
    }

    private Token generateRefreshToken(Account account) {
        LocalDateTime now = LocalDateTime.now();

        LocalDateTime expireTime = now.plusHours(refreshTokenProperties.expireIn());

        String tokenId = NanoIdUtils.randomNanoId();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .subject(account.getId())
                .claim("email", account.getEmail())
                .claim("avatar", account.getAvatar())
                .claim("scope", account.getAuthorities())
                .claim(TOKEN_TYPE_KEY, TokenType.REFRESH_TOKEN)
                .claim(TOKEN_ID_KEY, tokenId)
                .expiresAt(expireTime.toInstant(ZoneOffset.UTC))
                .build();

        String token =
                refreshTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();

        jedis.setex(tokenId, refreshTokenProperties.expireIn() * 60, tokenId);

        return Token.builder()
                .id(tokenId)
                .type(TokenType.REFRESH_TOKEN)
                .value(token)
                .expiresIn(expireTime.atZone(ZoneId.systemDefault()).toEpochSecond())
                .build();
    }


}
