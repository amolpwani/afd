package com.ford.afd.ControllerTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.ford.afd.model.ListDataItem;
import com.ford.afd.service.ListDataItemService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ListDataItemControllerTest {

	@LocalServerPort
	private int port = 8080;

	private URL base;

	@Autowired
	private TestRestTemplate template;

	@Autowired
	private ListDataItemService listDataItemService;

	private List<Long> testEntitiesId = new ArrayList<>();

	@Before
	public void setUp() throws Exception {
		ListDataItem listDataItem1 = listDataItemService.saveListDataItem(buildListDataItem(1, "description 1", 100));
		ListDataItem listDataItem2 = listDataItemService.saveListDataItem(buildListDataItem(2, "description 2", 100));
		testEntitiesId.add(listDataItem1.getId());
		testEntitiesId.add(listDataItem2.getId());
		this.base = new URL("http://localhost:" + port);
	}

	@After
	public void tearDown() {
		for (Long listDataId : testEntitiesId) {
			listDataItemService.deleteListDataItem(listDataItemService.findListDataItemById(listDataId));
		}
	}

	private ListDataItem buildListDataItem(int code, String description, long listId) {
		return new ListDataItem(code, description, true, listId);
	}

	@Test
	public void shouldRetrieveOneListDataItem() throws Exception {
		//Act
		ParameterizedTypeReference<ListDataItem> returnType = new ParameterizedTypeReference<ListDataItem>() {
		};
		ResponseEntity<ListDataItem> actualResponse =  template.exchange(
				base.toString() + "/listdataitems/getItems/" + testEntitiesId.get(0),
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		ListDataItem expectedListData = new ListDataItem(1, "description 1", true, 100);

		expectedListData.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedListData);
	}

	@Test
	public void shouldRetrieveAllListData() {
		//Act
		ParameterizedTypeReference<List<ListDataItem>> returnType = new ParameterizedTypeReference<List<ListDataItem>>() {
		};

		ResponseEntity<List<ListDataItem>> actualResponse =  template.exchange(
				base.toString() + "/listdataitems/getItems",
				HttpMethod.GET,
				null,
				returnType);
		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldUpdateListData() throws Exception {
		//Act
		ParameterizedTypeReference<ListDataItem> returnType = new ParameterizedTypeReference<ListDataItem>() {
		};

		ListDataItem updateListDataItem = new ListDataItem(2, "updated description 1", false, 100);
		updateListDataItem.setId(testEntitiesId.get(0));

		ResponseEntity<ListDataItem> actualResponse =  template.exchange(
				base.toString() + "/listdataitems/getItems/" + testEntitiesId.get(0),
				HttpMethod.PUT,
				new HttpEntity<ListDataItem>(updateListDataItem, new HttpHeaders()),
				ListDataItem.class,
				returnType);

		//Assert
		ListDataItem actualBody = actualResponse.getBody();
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		ListDataItem expectedListData = new ListDataItem(2, "updated description 1", false, 100);
		expectedListData.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedListData);
		assertThat(listDataItemService.findListDataItemById(actualBody.getId())).isEqualToComparingFieldByField(expectedListData);
	}

	@Test
	public void shouldDeleteListById() {
		//Act
		ParameterizedTypeReference<List<ListDataItem>> returnType = new ParameterizedTypeReference<List<ListDataItem>>() {
		};

		template.delete(
				base.toString() + "/listdataitems/getItems/"+ testEntitiesId.get(0));

		testEntitiesId.remove(testEntitiesId.get(0));

		ResponseEntity<List<ListDataItem>> actualResponse =  template.exchange(
				base.toString() + "/listdataitems/getItems",
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldCreateListData() throws Exception {
		//Act
		ParameterizedTypeReference<ListDataItem> returnType = new ParameterizedTypeReference<ListDataItem>() {
		};

		ListDataItem createListData = new ListDataItem(3, "description 3", false, 100);

		ResponseEntity<ListDataItem> actualResponse =  template.exchange(
				base.toString() + "/listdataitems/getItems",
				HttpMethod.POST,
				new HttpEntity<ListDataItem>(createListData, new HttpHeaders()),
				ListDataItem.class,
				returnType);

		//Assert
		ListDataItem actualBody = actualResponse.getBody();
		testEntitiesId.add(actualBody.getId());
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		ListDataItem expectedListData = new ListDataItem(3, "description 3", false, 100);
		expectedListData.setId(actualBody.getId());
		assertThat(actualBody).isEqualToComparingFieldByField(expectedListData);
		assertThat(listDataItemService.findListDataItemById(actualBody.getId())).isEqualToComparingFieldByField(expectedListData);
	}
}