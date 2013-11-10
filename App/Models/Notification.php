<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 9/29/13
 * Time: 6:21 PM
 */
namespace Notifications;
/**
 * @Entity @Table(name="notifications_notifications")
 */
class Notification extends \Model
{
    /**
     * @Id @GeneratedValue(strategy="AUTO") @Column(type="integer")
     */
    public $id;

    /**
     * @ManyToOne(targetEntity="\User")
     */
    public $user;

    /**
     * @Column(type="text")
     */
    public $data;


    public function __construct()
    {

    }

    public function getId()
    {
        return $this->id;
    }

    public function setData($data)
    {
        $this->data = json_encode($data);
    }

    public function getData()
    {
        return json_decode($this->data, true);
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }


    public function toArray()
    {
        $array = array(
            "id" => $this->id
        );

        $data = $this->getData();
        $array = array_merge($array, $data);

        return $array;
    }
}