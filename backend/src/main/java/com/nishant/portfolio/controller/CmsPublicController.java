package com.nishant.portfolio.controller;

import com.nishant.portfolio.service.CmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/content")
public class CmsPublicController {

    private final CmsService cmsService;

    public CmsPublicController(CmsService cmsService) {
        this.cmsService = cmsService;
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllPublicContent() {
        return ResponseEntity.ok(cmsService.getAllPublicContent());
    }

    @GetMapping("/{section}")
    public ResponseEntity<Map<String, Object>> getSection(@PathVariable String section) {
        return ResponseEntity.ok(cmsService.getSectionData(section.toUpperCase()));
    }
}
