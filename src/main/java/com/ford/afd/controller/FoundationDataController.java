package com.ford.afd.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.FoundationData;
import com.ford.afd.service.FoundationDataService;


/**
 * Created by dchiruma on 12/26/2017.
 */

@RestController
@RequestMapping("/foundationdata")
public class FoundationDataController {
    @Autowired
    private FoundationDataService foundationDataService;

	@RequestMapping(value = "getFoundationData",method = RequestMethod.GET)
	public List<FoundationData> directList(){
		return foundationDataService.allFoundationData();
	}

	@RequestMapping(value = "getFoundationData/{id}",method = RequestMethod.GET)
	public FoundationData listDataById(@PathVariable long id ) {
		return foundationDataService.findFoundationDataById(id);
	}

	@RequestMapping(value="getFoundationData/{id}",method=RequestMethod.PUT)
	public FoundationData updateFoundationData(@PathVariable long id, @RequestBody FoundationData listData){
		return foundationDataService.saveFoundationData(listData);
	}

	@RequestMapping(value = "getFoundationData/{id}",method = RequestMethod.DELETE)
	public void deleteFoundationDataById(@PathVariable long id ){
		foundationDataService.deleteFoundationData(foundationDataService.findFoundationDataById(id));
	}

	@RequestMapping(value="getFoundationData",method=RequestMethod.POST)
	public FoundationData createFoundationData(@RequestBody FoundationData listData) {
		return foundationDataService.saveFoundationData(listData);
	}

}
