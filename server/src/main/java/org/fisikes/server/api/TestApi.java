package org.fisikes.server.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestApi {


    @PostMapping("/test-page")
    public R<String> testPage() {

        return R.success("Hello World");
    }
}
