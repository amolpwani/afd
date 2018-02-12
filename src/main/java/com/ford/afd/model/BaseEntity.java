package com.ford.afd.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity<U> {
	
    @CreatedBy
    @Column(name = "CREATE_USER_C", updatable =  false)
    protected U createdBy;
    
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CREATE_S", updatable =  false)
    protected Date creationDate;
    
    @LastModifiedBy
    @Column(name = "LAST_UPDT_USER_C")
    protected U lastModifiedBy;
    
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "LAST_UPDT_S")
    protected Date lastModifiedDate;
}

