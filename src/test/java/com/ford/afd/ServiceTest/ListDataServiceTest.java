package com.ford.afd.ServiceTest;

import com.ford.afd.model.ListData;
import com.ford.afd.repository.ListDataRepository;
import com.ford.afd.service.ListDataService;
import org.assertj.core.util.Lists;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ListDataServiceTest {

    @InjectMocks
    private ListDataService listDataService;

    @Mock
    private ListDataRepository listDataRepositoryMock;

    @Test
    public void allListData_shouldReturnEmptyWhenNoListDataFound() {
        //Arrange
        when(listDataRepositoryMock.findAll()).thenReturn(Lists.emptyList());
        //Act
        List<ListData> actualResult = listDataService.allListData();
        //Assert
        assertThat(actualResult).hasSize(0);
    }

    @Test
    public void allListData_shouldReturnValuesWhenListDataFound() {
        //Arrange
        List<ListData> listData = new ArrayList<>(1);
        listData.add(buildListData());
        when(listDataRepositoryMock.findAll()).thenReturn(listData);
        //Act
        List<ListData> actualResult = listDataService.allListData();
        //Assert
        assertThat(actualResult).isEqualTo(listData);
    }

    @Test
    public void saveListData_shouldSaveAListData() {
        //Arrange
        ArgumentCaptor<ListData> listDataCaptor = ArgumentCaptor.forClass(ListData.class);

        when(listDataRepositoryMock.save(listDataCaptor.capture()))
                .thenReturn(buildListData());

        //Act
        listDataService.saveListData(buildListData());

        ListData expectedEntity = buildListData();
        expectedEntity.setId(1);

        //Assert
        assertThat(listDataCaptor.getValue()).isEqualToComparingFieldByField(expectedEntity);
    }

    @Test
    public void deleteListDataById_shouldInvokeDeleteOnRepository() {
        //Arrange
        ArgumentCaptor<ListData> listDataCaptor = ArgumentCaptor.forClass(ListData.class);
        doNothing().when(listDataRepositoryMock).delete(listDataCaptor.capture());
        //Act
        listDataService.deleteListData(buildListData());
        //Assert
        assertThat(listDataCaptor.equals(listDataCaptor));
    }

    @Test
    public void allListData_shouldRetrieveAllListData() {
        //Arrange
        List<ListData> listData = new ArrayList<>(1);
        listData.add(buildListData());
        when(listDataRepositoryMock.findAll()).thenReturn(listData);
        //Act
        List<ListData> actualListData = listDataService.allListData();
        //Assert
        assertThat(actualListData).isNotNull();
        assertThat(actualListData).hasSize(1);
        assertThat(actualListData.get(0).getName()).isEqualTo("name");
        assertThat(actualListData.get(0).getDescription()).isEqualTo("description");
    }

    private ListData buildListData() {
        ListData entity = new ListData("name", "description", true);
        entity.setId(1);
        return entity;
    }
}