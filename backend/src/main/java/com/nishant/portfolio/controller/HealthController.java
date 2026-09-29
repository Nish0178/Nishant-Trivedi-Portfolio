package com.nishant.portfolio.controller;

import com.nishant.portfolio.dto.HealthResponse;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final ObjectProvider<DataSource> dataSourceProvider;

    public HealthController(ObjectProvider<DataSource> dataSourceProvider) {
        this.dataSourceProvider = dataSourceProvider;
    }

    @GetMapping
    public ResponseEntity<HealthResponse> getHealth() {
        String dbStatus = "UP";
        DataSource ds = dataSourceProvider.getIfAvailable();
        if (ds != null) {
            try (Connection conn = ds.getConnection()) {
                if (!conn.isValid(2)) {
                    dbStatus = "DOWN";
                }
            } catch (Exception e) {
                dbStatus = "DOWN";
            }
        } else {
            dbStatus = "NOT_CONFIGURED";
        }

        String overallStatus = "DOWN".equals(dbStatus) ? "DEGRADED" : "UP";
        return ResponseEntity.ok(new HealthResponse(overallStatus, "portfolio-api", dbStatus));
    }
}
