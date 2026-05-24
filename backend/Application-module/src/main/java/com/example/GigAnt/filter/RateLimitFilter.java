package com.example.GigAnt.filter;
import io.github.bucket4j.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {


    private static final int MAX_REQUESTS = 10;
    private static final Duration REFILL_DURATION = Duration.ofMinutes(1);


    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String uri = request.getRequestURI();


        if (!uri.startsWith("/api/auth/login") && !uri.startsWith("/api/auth/register")) {
            filterChain.doFilter(request, response);
            return;
        }


        String key = request.getRemoteAddr() + ":" + uri;

        Bucket bucket = buckets.computeIfAbsent(key, k -> createNewBucket());

        if (bucket.tryConsume(1)) {

            filterChain.doFilter(request, response);
        } else {

            response.setStatus(429);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("""
                {
                    "error": "Too Many Requests",
                    "message": "Превышено количество попыток. Попробуйте через %d сек."
                }
                """.formatted(getRemainingSeconds(bucket)));
        }
    }

    private Bucket createNewBucket() {
        Refill refill = Refill.greedy(MAX_REQUESTS, REFILL_DURATION);
        Bandwidth limit = Bandwidth.classic(MAX_REQUESTS, refill);
        return Bucket.builder().addLimit(limit).build();
    }


    private long getRemainingSeconds(Bucket bucket) {
        return bucket.getAvailableTokens() == 0
                ? REFILL_DURATION.toSeconds() / MAX_REQUESTS
                : 0;
    }
}
