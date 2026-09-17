package com.nishant.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@SpringBootApplication
public class PortfolioApplication {

    public static void main(String[] args) {
        loadEnvIfPresent();
        SpringApplication.run(PortfolioApplication.class, args);
    }

    private static void loadEnvIfPresent() {
        Path[] searchPaths = new Path[]{
                Path.of(".env"),
                Path.of("../.env"),
                Path.of("../../.env")
        };

        for (Path p : searchPaths) {
            if (Files.exists(p)) {
                try {
                    List<String> lines = Files.readAllLines(p);
                    for (String line : lines) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#")) continue;
                        int idx = line.indexOf('=');
                        if (idx > 0) {
                            String key = line.substring(0, idx).trim();
                            String value = line.substring(idx + 1).trim();
                            if (System.getProperty(key) == null && System.getenv(key) == null) {
                                System.setProperty(key, value);
                            }
                        }
                    }
                    break;
                } catch (Exception ignored) {
                }
            }
        }
    }
}
