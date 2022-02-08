package nexraddata.service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

@Service
public class RadarStationService {
	
	HashMap<String, String> stations = new HashMap<String, String>();
	
	public RadarStationService() {
		stations.put("Birmingham","kbmx");
		stations.put("E. Alabama", "kmxx");
		stations.put("Fort Rucker", "keox");
		stations.put("Mobile", "kmob");
		stations.put("Nrn. Alabama", "khtx");
		stations.put("Bethel", "pabc");
		stations.put("Biorka Is.", "pacg");
		stations.put("Fairbanks", "papd");
		stations.put("Kenai", "pahg");
		stations.put("King Salmon", "pakc");
		stations.put("Middleton Is.", "paih");
		stations.put("Nome", "paec");
		stations.put("Pedro Dome", "papd");
		stations.put("Sitka", "pacg");
	}
	
	public String getStation(String city) {
		String station = stations.get(city);
		return station.toUpperCase();
	}

}
