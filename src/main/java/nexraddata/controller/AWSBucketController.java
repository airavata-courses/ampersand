package nexraddata.controller;

import java.io.ByteArrayOutputStream;
import java.net.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import nexraddata.service.FileDownloadService;


@RestController
public class AWSBucketController {
	
	@Autowired
	FileDownloadService fileDownloadService;
	
	@GetMapping(value = "/download")
    public ResponseEntity<byte[]> downloadFile(@RequestParam(value= "fileName") final String filename) {
    	System.out.println("Reached here");
        ByteArrayOutputStream downloadInputStream = fileDownloadService.downloadFile(filename);

        return ResponseEntity
                .ok()
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + filename + "\"")
                .body(downloadInputStream.toByteArray());
    }


}
