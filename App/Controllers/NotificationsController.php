<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 9/29/13
 * Time: 6:22 PM
 */

namespace Notifications;

class NotificationsController extends \Controller
{
    public function before_filter()
    {
        \User::restrict();
    }

    public function index()
    {
        $em = \Model::getEntityManager();

        $query = $em->createQueryBuilder();

        $query->select("n")
            ->from('\Notifications\Notification', 'n')
            ->where('n.user = :user')
            ->setParameter('user', \User::current_user());

        $results = $query->getQuery()->getResult();

        $response = array();
        foreach ($results as $result)
        {
            $response[] = $result->toArray();
        }

        $this->return_json($response);
    }

    private function createOrUpdate($data)
    {
        if (isset($data["id"]))
        {
            $id = $data["id"];
            unset($data["id"]);

            $model = Notification::find($id);
        }

        if (!isset($model) || !is_object($model))
        {
            $model = new Notification();
            $model->setUser(\User::current_user());
        }

        $model->setData($data);

        if ($model->getUser()->getId() == \User::current_user()->getId())
        {
            $model->save();
            $this->return_json($model->toArray());
        }
        else
        {
            Router::redirect("/Users/unauthorized");
        }
    }

    public function create()
    {
        $data = $this->getRequestData();

        $this->createOrUpdate($data);
    }

    public function update()
    {
        $data = $this->getRequestData();
        $this->createOrUpdate($data);
    }

    public function show($params = array())
    {
        $model = Notification::find($params["id"]);
        if (is_object($model))
        {
            $this->return_json($model->toArray());
        }
        else
        {
            $this->json_error("Notification not found", 404);
        }
    }

    public function destroy($params = array())
    {
        $model = Notification::find($params["id"]);
        if (is_object($model))
        {
            if ($model->getUser()->getId() == \User::current_user()->getId())
            {
                $model->delete();
                $this->json_message("Successfully deleted");
            }
            else
            {
                Router::redirect("/Users/unauthorized");
            }
        }
        else
        {
            $this->json_error("Notification not found", 404);
        }
    }
}