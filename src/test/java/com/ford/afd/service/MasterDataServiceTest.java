package com.ford.afd.service;

import com.ford.afd.model.MasterData;
import com.ford.afd.repository.MasterDataRepository;
import com.ford.afd.service.MasterDataService;
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
public class MasterDataServiceTest {

    @InjectMocks
    private MasterDataService masterDataService;

    @Mock
    private MasterDataRepository masterDataRepositoryMock;

    @Test
    public void allMasterData_shouldReturnEmptyWhenNoMasterDataFound() {
        //Arrange
        when(masterDataRepositoryMock.findAll()).thenReturn(Lists.emptyList());
        //Act
        List<MasterData> actualResult = masterDataService.allMasterData();
        //Assert
        assertThat(actualResult).hasSize(0);
    }

    @Test
    public void allMasterData_shouldReturnValuesWhenMasterDataFound() {
        //Arrange
        List<MasterData> masterData = new ArrayList<>(1);
        String masterData1Name = "MasterData" + System.nanoTime();
        masterData.add(buildMasterData(masterData1Name));
        when(masterDataRepositoryMock.findAll()).thenReturn(masterData);
        //Act
        List<MasterData> actualResult = masterDataService.allMasterData();
        //Assert
        assertThat(actualResult).isEqualTo(masterData);
    }

    @Test
    public void saveMasterData_shouldSaveAMasterData() {
        //Arrange
        ArgumentCaptor<MasterData> masterDataCaptor = ArgumentCaptor.forClass(MasterData.class);

        String masterData1Name = "MasterData" + System.nanoTime();
        when(masterDataRepositoryMock.save(masterDataCaptor.capture()))
                .thenReturn(buildMasterData(masterData1Name));

        //Act
        masterDataService.saveMasterData(buildMasterData(masterData1Name));

        MasterData expectedEntity = buildMasterData(masterData1Name);
        expectedEntity.setId(1);

        //Assert
        assertThat(masterDataCaptor.getValue()).isEqualToComparingFieldByField(expectedEntity);
    }

    @Test
    public void deleteMasterDataById_shouldInvokeDeleteOnRepository() {
        //Arrange
        ArgumentCaptor<MasterData> masterDataCaptor = ArgumentCaptor.forClass(MasterData.class);
        doNothing().when(masterDataRepositoryMock).delete(masterDataCaptor.capture());
        //Act
        String masterData1Name = "MasterData" + System.nanoTime();
        masterDataService.deleteMasterData(buildMasterData(masterData1Name));
        //Assert
        assertThat(masterDataCaptor.equals(masterDataCaptor));
    }

    @Test
    public void allMasterData_shouldRetrieveAllMasterData() {
        //Arrange
        List<MasterData> masterData = new ArrayList<>(1);
        String masterData1Name = "MasterData" + System.nanoTime();
        masterData.add(buildMasterData(masterData1Name));
        when(masterDataRepositoryMock.findAll()).thenReturn(masterData);
        //Act
        List<MasterData> actualMasterData = masterDataService.allMasterData();
        //Assert
        assertThat(actualMasterData).isNotNull();
        assertThat(actualMasterData).hasSize(1);
        assertThat(actualMasterData.get(0).getName()).isEqualTo(masterData1Name);
        assertThat(actualMasterData.get(0).getDescription()).isEqualTo("description");
    }

    private MasterData buildMasterData(String name) {
        MasterData entity = new MasterData(name, "description", 'Y');
        entity.setId(1);
        return entity;
    }
}