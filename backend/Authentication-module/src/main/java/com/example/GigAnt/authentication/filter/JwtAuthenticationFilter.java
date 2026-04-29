package com.example.GigAnt.authentication.filter;


import com.example.GigAnt.authentication.service.JwtUtils;
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
    System.out.println("ФИЛЬТР ИСПОЛЬЗУЕТСЯ");
    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    System.out.println("📥 AUTHORIZATION = " + authHeader);

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      System.out.println("⚠️ Токен не найден или формат неверный");
      filterChain.doFilter(request, response);
      return;
    }

    String token = authHeader.substring(7);
    try {
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
        log.info("ACCOUNT ID "+accountId);
        headers.add("Account-Id", String.valueOf(accountId));
        log.info("HEADER ID "+headers.get("Account-Id"));


      }
    } catch (Exception e) {

      logger.warn("Invalid JWT token: {}");

    }

    filterChain.doFilter(request, response);
  }
}