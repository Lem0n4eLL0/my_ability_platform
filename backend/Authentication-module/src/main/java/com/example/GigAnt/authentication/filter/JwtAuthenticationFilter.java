package com.example.GigAnt.authentication.filter;


import com.example.GigAnt.authentication.service.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtUtils jwtUtils;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");

    // Пропускаем, если нет токена или формат неверный
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = authHeader.substring(7);
    try {

      String accountIdStr = jwtUtils.extractAccountId(token);

      if (accountIdStr != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UUID accountId = UUID.fromString(accountIdStr);


        var authentication = new UsernamePasswordAuthenticationToken(
            accountId,
            null,
            Collections.emptyList()
        );
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // Сохраняем в SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception e) {

      logger.warn("Invalid JWT token: {}");

    }

    filterChain.doFilter(request, response);
  }
}