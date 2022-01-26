package nexraddata.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class FileURLController {
	
	@GetMapping(value = "/fileurl")
	public ResponseEntity<String> getURL(@RequestParam(value= "year") final String year, @RequestParam(value= "month") final String month,
			@RequestParam(value= "day") final String day, @RequestParam(value= "station") final String station) {
		
//		String uri = "https://noaa-nexrad-level2.s3.amazonaws.com/"+filename;
//		RestTemplate restTemplate = new RestTemplate();
//		
//		String result = restTemplate.getForObject(uri, String.class);
		
		String uri = "https://noaa-nexrad-level2.s3.amazonaws.com/"+year+"/"+month+"/"+day+"/"+station+"/";
		return ResponseEntity
                .ok()
                .body(uri);	
	}

}
