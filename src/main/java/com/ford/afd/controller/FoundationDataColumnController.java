package com.ford.afd.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.service.FoundationDataColumnService;


/**
 * Created by dchiruma on 12/26/2017.
 */

@RestController
@RequestMapping("/foundationdatacolumn")
public class FoundationDataColumnController {
    @Autowired
    private FoundationDataColumnService foundationDataColumnService;

	@RequestMapping(value = "getFoundationColumn",method = RequestMethod.GET)
	public List<FoundationDataColumn> directList(){
		return foundationDataColumnService.allFoundationDataColumn();
	}

	@RequestMapping(value = "getFoundationColumn/{id}",method = RequestMethod.GET)
	public FoundationDataColumn listDataById(@PathVariable long id ) {
		return foundationDataColumnService.findFoundationDataColumnById(id);
	}

	@RequestMapping(value="getFoundationColumn/{id}",method=RequestMethod.PUT)
	public FoundationDataColumn updateFoundationDataColumn(@PathVariable long id, @RequestBody FoundationDataColumn listData){
		return foundationDataColumnService.saveFoundationDataColumn(listData);
	}

	@RequestMapping(value = "getFoundationColumn/{id}",method = RequestMethod.DELETE)
	public void deleteFoundationDataColumnById(@PathVariable long id ){
		foundationDataColumnService.deleteFoundationDataColumn(foundationDataColumnService.findFoundationDataColumnById(id));
	}

	@RequestMapping(value="getFoundationColumn",method=RequestMethod.POST)
	public FoundationDataColumn createFoundationDataColumn(@RequestBody FoundationDataColumn listData) {
		return foundationDataColumnService.saveFoundationDataColumn(listData);
	}

}
