package com.ford.afd.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.ListData;
import com.ford.afd.service.ListDataService;

/**
 * Created by dchiruma on 12/26/2017.
 */

@RestController
@RequestMapping("/listdata")
public class ListDataController {
    @Autowired
    private ListDataService listDataService;

	@RequestMapping(value = "getList",method = RequestMethod.GET)
	public List<ListData> directList(){
		return listDataService.allListData();
	}

	@RequestMapping(value = "getList/{id}",method = RequestMethod.GET)
	public ListData listDataById(@PathVariable long id ) {
		return listDataService.findListDataById(id);
	}

	@RequestMapping(value="getList/{id}",method=RequestMethod.PUT)
	public ListData updateListData(@PathVariable long id, @RequestBody ListData listData){
		return listDataService.saveListData(listData);
	}

	@RequestMapping(value = "getList/{id}",method = RequestMethod.DELETE)
	public void deleteListDataById(@PathVariable long id ){
		listDataService.deleteListData(listDataService.findListDataById(id));
	}

	@RequestMapping(value="getList",method=RequestMethod.POST)
	public ListData createListData(@RequestBody ListData listData) {
		return listDataService.saveListData(listData);
	}

}
