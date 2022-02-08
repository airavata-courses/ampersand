package nexraddata.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import nexraddata.service.RadarStationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RadarStationController {
	
	@Autowired
	public RadarStationService rss;
	
	@GetMapping(value = "/radarstation")
	public String getRadarStation(@RequestParam(value= "city") final String city){
		
		String station = rss.getStation(city);
		
		return station;
		
	}

}
