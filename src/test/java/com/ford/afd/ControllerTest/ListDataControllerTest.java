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

import com.ford.afd.model.ListData;
import com.ford.afd.service.ListDataService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ListDataControllerTest {

	@LocalServerPort
	private int port = 8080;

	private URL base;

	@Autowired
	private TestRestTemplate template;

	@Autowired
	private ListDataService listDataService;

	private List<Long> testEntitiesId = new ArrayList<>();

	@Before
	public void setUp() throws Exception {
		ListData listData1 = listDataService.saveListData(buildListData("list data 1", "description 1"));
		ListData listData2 = listDataService.saveListData(buildListData("list data 2", "description 2"));
		testEntitiesId.add(listData1.getId());
		testEntitiesId.add(listData2.getId());
		this.base = new URL("http://localhost:" + port);
	}

	@After
	public void tearDown() {
		for (Long listDataId : testEntitiesId) {
			listDataService.deleteListData(listDataService.findListDataById(listDataId));
		}
	}

	private ListData buildListData(final String name, String description) {
		return new ListData(name, description, true);
	}

	@Test
	public void shouldRetrieveOneListData() throws Exception {
		//Act
		ParameterizedTypeReference<ListData> returnType = new ParameterizedTypeReference<ListData>() {
		};
		ResponseEntity<ListData> actualResponse =  template.exchange(
				base.toString() + "/listdata/getList/" + testEntitiesId.get(0),
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		ListData expectedListData = new ListData("list data 1", "description 1", true);

		expectedListData.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedListData);
	}

	@Test
	public void shouldRetrieveAllListData() {
		//Act
		ParameterizedTypeReference<List<ListData>> returnType = new ParameterizedTypeReference<List<ListData>>() {
		};

		ResponseEntity<List<ListData>> actualResponse =  template.exchange(
				base.toString() + "/listdata/getList",
				HttpMethod.GET,
				null,
				returnType);
		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldUpdateListData() throws Exception {
		//Act
		ParameterizedTypeReference<ListData> returnType = new ParameterizedTypeReference<ListData>() {
		};

		ListData updateListData = new ListData("updated list data 1", "updated description 1", false);
		updateListData.setId(testEntitiesId.get(0));

		ResponseEntity<ListData> actualResponse =  template.exchange(
				base.toString() + "/listdata/getList/" + testEntitiesId.get(0),
				HttpMethod.PUT,
				new HttpEntity<ListData>(updateListData, new HttpHeaders()),
				ListData.class,
				returnType);

		//Assert
		ListData actualBody = actualResponse.getBody();
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		ListData expectedListData = new ListData("updated list data 1", "updated description 1", false);
		expectedListData.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedListData);
		assertThat(listDataService.findListDataById(actualBody.getId())).isEqualToComparingFieldByField(expectedListData);
	}

	@Test
	public void shouldDeleteListById() {
		//Act
		ParameterizedTypeReference<List<ListData>> returnType = new ParameterizedTypeReference<List<ListData>>() {
		};

		template.delete(
				base.toString() + "/listdata/getList/"+ testEntitiesId.get(0));

		testEntitiesId.remove(testEntitiesId.get(0));

		ResponseEntity<List<ListData>> actualResponse =  template.exchange(
				base.toString() + "/listdata/getList",
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldCreateListData() throws Exception {
		//Act
		ParameterizedTypeReference<ListData> returnType = new ParameterizedTypeReference<ListData>() {
		};

		ListData createListData = new ListData("list data 3", "description 3", false);

		ResponseEntity<ListData> actualResponse =  template.exchange(
				base.toString() + "/listdata/getList/",
				HttpMethod.POST,
				new HttpEntity<ListData>(createListData, new HttpHeaders()),
				ListData.class,
				returnType);

		//Assert
		ListData actualBody = actualResponse.getBody();
		testEntitiesId.add(actualBody.getId());
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		ListData expectedListData = new ListData("list data 3", "description 3", false);
		expectedListData.setId(actualBody.getId());
		assertThat(actualBody).isEqualToComparingFieldByField(expectedListData);
		assertThat(listDataService.findListDataById(actualBody.getId())).isEqualToComparingFieldByField(expectedListData);
	}
}