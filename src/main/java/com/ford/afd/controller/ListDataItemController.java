package com.ford.afd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.ListDataItem;
import com.ford.afd.service.ListDataItemService;

/**
 * Created by dchiruma on 12/26/2017.
 */
@RestController
@RequestMapping("/listdataitems")
public class ListDataItemController {

    @Autowired
    private ListDataItemService listDataItemService;

	@RequestMapping(value = "getItems", method = RequestMethod.GET)
	public List<ListDataItem> directList() {
		return listDataItemService.allListDataItems();
	}

	@RequestMapping(value = "getItems/{id}", method = RequestMethod.GET)
	public ListDataItem listDataItemsById(@PathVariable long id ) {
		return listDataItemService.findListDataItemById(id);
	}

	@RequestMapping(value = "getListId/{listId}", method = RequestMethod.GET)
	public List<ListDataItem> listDataItemsByListId(@PathVariable long listId ) {
		return listDataItemService.findListDataItemsByListId(listId);
	}

	@RequestMapping(value = "getItems/{id}",method = RequestMethod.PUT)
	public ListDataItem updateListDataItems(@PathVariable long id, @RequestBody ListDataItem listDataItem){
		return listDataItemService.saveListDataItem(listDataItem);
	}

	@RequestMapping(value = "getItems/{id}", method = RequestMethod.DELETE)
	public void deleteListDataItemsById(@PathVariable long id ){
		listDataItemService.deleteListDataItem(listDataItemService.findListDataItemById(id));
	}

	@RequestMapping(value = "getItems", method = RequestMethod.POST)
	public ListDataItem createListDataItems(@RequestBody ListDataItem listDataItem) {
		return listDataItemService.saveListDataItem(listDataItem);
	}
}
