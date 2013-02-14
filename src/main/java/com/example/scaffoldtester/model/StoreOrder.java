package com.example.scaffoldtester.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;
import com.example.scaffoldtester.model.Customer;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import com.example.scaffoldtester.model.DiscountVoucher;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class StoreOrder implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id = null;
   @Version
   @Column(name = "version")
   private int version = 0;

   @Column
   private String product;

   @Column
   @Min(1)
   @Max(50)
   private int amount;

   @Column
   @Size(max = 100)
   private String remarks;

   @ManyToOne
   private Customer customer;

   @OneToOne
   private DiscountVoucher voucher;

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }

   @Override
   public boolean equals(Object that)
   {
      if (this == that)
      {
         return true;
      }
      if (that == null)
      {
         return false;
      }
      if (getClass() != that.getClass())
      {
         return false;
      }
      if (id != null)
      {
         return id.equals(((StoreOrder) that).id);
      }
      return super.equals(that);
   }

   @Override
   public int hashCode()
   {
      if (id != null)
      {
         return id.hashCode();
      }
      return super.hashCode();
   }

   public String getProduct()
   {
      return this.product;
   }

   public void setProduct(final String product)
   {
      this.product = product;
   }

   public int getAmount()
   {
      return this.amount;
   }

   public void setAmount(final int amount)
   {
      this.amount = amount;
   }

   public String getRemarks()
   {
      return this.remarks;
   }

   public void setRemarks(final String remarks)
   {
      this.remarks = remarks;
   }

   public Customer getCustomer()
   {
      return this.customer;
   }

   public void setCustomer(final Customer customer)
   {
      this.customer = customer;
   }

   public DiscountVoucher getVoucher()
   {
      return this.voucher;
   }

   public void setVoucher(final DiscountVoucher voucher)
   {
      this.voucher = voucher;
   }

   public String toString()
   {
      String result = "";
      if (product != null && !product.trim().isEmpty())
         result += product;
      result += " " + amount;
      if (remarks != null && !remarks.trim().isEmpty())
         result += " " + remarks;
      return result;
   }
}