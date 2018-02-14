package com.ford.afd.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "TAFD002_MASTER_DATA_ITEM")
@EntityListeners(AuditingEntityListener.class)
public class MasterDataItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TAFD002_MSTR_DATA_ITEM_D")
    private int id;
    
    @Column(name = "TAFD002_MSTR_DATA_ITEM_N")
    private String code;
    
    @Column(name = "TAFD002_MSTR_DATA_ITEM_X")
    private String description;
    
    @Column(name = "TAFD002_MSTR_DATA_ITEM_ACTV_F")
    private char active;
    
    @Column(name = "TAFD001_MSTR_DATA_D")
    private int parentMasterDataId;
    
    @CreatedBy
    @Column(name = "TADF002_CREATE_USER_C", updatable =  false)
    protected String createdBy;
    
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "TADF002_CREATE_S", updatable =  false)
    protected Date creationDate;
    
    @LastModifiedBy
    @Column(name = "TADF002_LAST_UPDT_USER_C")
    protected String lastModifiedBy;
    
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "TADF002_LAST_UPDT_S")
    protected Date lastModifiedDate;
    
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "TAFD001_MSTR_DATA_D", referencedColumnName = "TAFD001_MSTR_DATA_D", nullable = false, unique = true, insertable = false, updatable = false)
//    private MasterData masterData;

    public MasterDataItem(String code, String description, char active, int parentMasterDataId) {
        this.code = code;
        this.description = description;
        this.setActive(active);
        this.parentMasterDataId = parentMasterDataId;
    }
    
    public MasterDataItem() {
    	
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

	public int getParentMasterDataId() {
		return parentMasterDataId;
	}

	public void setParentMasterDataId(int parentMasterDataId) {
		this.parentMasterDataId = parentMasterDataId;
	}

	public char getActive() {
		return active;
	}

	public void setActive(char active) {
		this.active = active;
	}

//	public MasterData getMasterData() {
//		return masterData;
//	}
//
//	public void setMasterData(MasterData masterData) {
//		this.masterData = masterData;
//	}
}
