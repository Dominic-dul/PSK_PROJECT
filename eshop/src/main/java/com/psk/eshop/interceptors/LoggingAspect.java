package com.psk.eshop.interceptors;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.Instant;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    @Before("@annotation(com.psk.eshop.interceptors.Loggable)")
    public void logBefore(JoinPoint joinPoint) {
        String username = "unknown";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            username = userDetails.getUsername();
        }
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getSignature().getDeclaringTypeName();
        Timestamp currentTime = Timestamp.from(Instant.now());
        LOGGER.info("User {} at time {} called method \'{}\' of class \'{}\'", username, currentTime, methodName, className);
    }

    @AfterReturning(value = "@annotation(com.psk.eshop.interceptors.Loggable)", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
    }

    @AfterThrowing(value = "@annotation(com.psk.eshop.interceptors.Loggable)", throwing = "ex")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable ex) {
    }
}

