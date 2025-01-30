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
import com.lemoo.auth.dto.request.IntrospectTokenRequest;
import com.lemoo.auth.dto.request.RefreshTokenRequest;
import com.lemoo.auth.dto.response.TokenResponse;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.exception.NotfoundException;
import com.lemoo.auth.exception.TokenException;
import com.lemoo.auth.repository.AccountRepository;
import com.lemoo.auth.service.TokenService;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

@Service
public class TokenServiceImpl implements TokenService {
    private static final String TOKEN_ID_KEY = "token_id";
    private static final String TOKEN_TYPE_KEY = "type";
    private static final String USER_ID_KEY = "user_id";

    private final AccessTokenProperties accessTokenProperties;
    private final RefreshTokenProperties refreshTokenProperties;
    private final JwtEncoder accessTokenEncoder;
    private final JwtDecoder accessTokenDecoder;
    private final JwtEncoder refreshTokenEncoder;
    private final JwtDecoder refreshTokenDecoder;
    private final Jedis jedis;
    private final AccountRepository accountRepository;

    public TokenServiceImpl(
            AccountRepository accountRepository,
            AccessTokenProperties accessTokenProperties,
            RefreshTokenProperties refreshTokenProperties,
            JwtEncoder accessTokenEncoder,
            JwtDecoder accessTokenDecoder,
            JwtEncoder refreshTokenEncoder,
            JwtDecoder refreshTokenDecoder,
            Jedis jedis) {
        this.accountRepository = accountRepository;
        this.accessTokenEncoder = accessTokenEncoder;
        this.accessTokenDecoder = accessTokenDecoder;
        this.refreshTokenEncoder = refreshTokenEncoder;
        this.refreshTokenDecoder = refreshTokenDecoder;
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

    @Override
    public TokenResponse refreshToken(RefreshTokenRequest request) {
        Jwt jwt = decodeToken(request.getRefreshToken(), TokenType.REFRESH_TOKEN);

        // extract token data
        //        String tokenId = jwt.getClaim(TOKEN_ID_KEY);
        String accountId = jwt.getSubject();

        // delete existed token
        //        jedis.del(tokenId);

        Account account =
                accountRepository.findById(accountId).orElseThrow(() -> new NotfoundException("Account not found."));

        String userId = jwt.getClaim(USER_ID_KEY);

        return generateTokenPair(account);
    }

    @Override
    public void removeToken(String token) {
        Jwt jwt = decodeToken(token, TokenType.REFRESH_TOKEN);
        String tokenId = jwt.getClaim(TOKEN_ID_KEY);
        jedis.del(tokenId);
    }

    @Override
    public Boolean introspectToken(IntrospectTokenRequest request) {
        try {
            Jwt jwt = accessTokenDecoder.decode(request.getToken());
            validateAccessToken(jwt);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public Token generateAccessToken(Account account) {

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime expireTime = now.plusHours(accessTokenProperties.expireIn());

        String tokenId = NanoIdUtils.randomNanoId();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .subject(account.getId())
                .claim("email", account.getEmail())
                .claim("phone", account.getPhone())
                .claim("scope", account.getAuthorities())
                .claim(USER_ID_KEY, account.getProfileId())
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
                .claim("scope", account.getAuthorities())
                .claim(USER_ID_KEY, account.getProfileId())
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

    private Jwt validateAccessToken(Jwt jwt) {
        if (!jwt.getClaim(TOKEN_TYPE_KEY).equals(TokenType.ACCESS_TOKEN.toString())) {
            throw new TokenException("Invalid token type");
        }

        return jwt;
    }

    private Jwt validateRefreshToken(Jwt jwt) {

        if (!jwt.getClaim(TOKEN_TYPE_KEY).equals(TokenType.REFRESH_TOKEN.toString())) {
            throw new TokenException("Invalid token type");
        }

        String tokenId = jwt.getClaim(TOKEN_ID_KEY);

        if (jedis.get(tokenId) == null) {
            throw new TokenException("Invalid refresh token");
        }
        return jwt;
    }

    private Jwt decodeToken(String token, TokenType tokenType) {
        if (tokenType.equals(TokenType.ACCESS_TOKEN)) return validateAccessToken(accessTokenDecoder.decode(token));
        return validateRefreshToken(refreshTokenDecoder.decode(token));
    }
}
