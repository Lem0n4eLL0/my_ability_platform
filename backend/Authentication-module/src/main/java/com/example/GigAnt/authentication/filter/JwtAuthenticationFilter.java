package com.example.GigAnt.authentication.filter;


import com.example.GigAnt.authentication.exception.TokenExpiredException;
import com.example.GigAnt.authentication.exception.TokenNotFound;
import com.example.GigAnt.authentication.service.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import io.jsonwebtoken.security.SignatureException;
import java.util.Collections;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtUtils jwtUtils;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = authHeader.substring(7);
    try {
      log.info("Валидация токена");
      Claims claims = jwtUtils.extractAllClaims(token);

      log.info("Извлечение данных");

      String accountIdStr = jwtUtils.extractAccountId(token);

      if (accountIdStr != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UUID accountId = UUID.fromString(accountIdStr);


        var authentication = new UsernamePasswordAuthenticationToken(
            accountId,
            null,
            Collections.emptyList()
        );
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        request.setAttribute("Account-Id",String.valueOf(accountId));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Account-Id", String.valueOf(accountId));

      }
    } catch (ExpiredJwtException e) {
      log.info("Токен просрочен");
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Токен просрочен");

    } catch (MalformedJwtException e) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Неверный токен");
      return;

    } catch(SignatureException e){
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Неверный токен");

    } catch(UnsupportedJwtException e) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Неверный токен");
      return;

    } catch (IllegalArgumentException e) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Токен отсутствует");
      return;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }

    filterChain.doFilter(request, response);
  }
}