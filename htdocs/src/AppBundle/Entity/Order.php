<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="order")
 */
class Order
{

    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime", name="ordered_at")
     */
    private $orderedAt;

    /**
     * @ORM\Column(type="datetime", name="delivered_at")
     */
    private $deliveredAt;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    private $amount;

    /**
     * @ORM\ManyToMany(targetEntity="Product", mappedBy="orders")
     * @var Collection
     */
    private $products;

    /**
     * @ORM\ManyToOne(targetEntity="Customer", inversedBy="orders")
     * @ORM\JoinColumn(name="customer_id", referencedColumnName="id")
     * @var Customer
     */
    private $customer;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set orderedAt
     *
     * @param \DateTime $orderedAt
     * @return Order
     */
    public function setOrderedAt($orderedAt)
    {
        $this->orderedAt = $orderedAt;

        return $this;
    }

    /**
     * Get orderedAt
     *
     * @return \DateTime 
     */
    public function getOrderedAt()
    {
        return $this->orderedAt;
    }

    /**
     * Set deliveredAt
     *
     * @param \DateTime $deliveredAt
     * @return Order
     */
    public function setDeliveredAt($deliveredAt)
    {
        $this->deliveredAt = $deliveredAt;

        return $this;
    }

    /**
     * Get deliveredAt
     *
     * @return \DateTime 
     */
    public function getDeliveredAt()
    {
        return $this->deliveredAt;
    }
    

    /**
     * Set amount
     *
     * @param string $amount
     * @return Order
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount
     *
     * @return string 
     */
    public function getAmount()
    {
        return $this->amount;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->products = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add products
     *
     * @param \AppBundle\Entity\Product $products
     * @return Order
     */
    public function addProduct(\AppBundle\Entity\Product $products)
    {
        $this->products[] = $products;

        return $this;
    }

    /**
     * Remove products
     *
     * @param \AppBundle\Entity\Product $products
     */
    public function removeProduct(\AppBundle\Entity\Product $products)
    {
        $this->products->removeElement($products);
    }

    /**
     * Get products
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * Set customer
     *
     * @param \AppBundle\Entity\Customer $customer
     * @return Order
     */
    public function setCustomer(\AppBundle\Entity\Customer $customer = null)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer
     *
     * @return \AppBundle\Entity\Customer 
     */
    public function getCustomer()
    {
        return $this->customer;
    }
}
