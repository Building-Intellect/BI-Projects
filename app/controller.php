<?php

abstract class Controller
{

    /**
     * Require a user to be logged in. Redirects to /login if a session is not found.
     * @param  int $rank
     * @return int|bool
     */
    protected function _requireLogin($rank = \Model\User::RANK_CLIENT)
    {
        $f3 = \Base::instance();
        if ($id = $f3->get("user.id")) {
            if ($f3->get("user.rank") >= $rank) {
                return $id;
            } else {
                $f3->error(403);
                $f3->unload();
                return false;
            }
        } else {
            if ($f3->get("site.demo") && is_numeric($f3->get("site.demo"))) {
                $user = new \Model\User();
                $user->load($f3->get("site.demo"));
                if ($user->id) {
                    $session = new \Model\Session($user->id);
                    $session->setCurrent();
                    $f3->set("user", $user->cast());
                    $f3->set("user_obj", $user);
                    return;
                } else {
                    $f3->set("error", "Auto-login failed, demo user was not found.");
                }
            }
            if (empty($_GET)) {
                $f3->reroute("/login?to=" . urlencode($f3->get("PATH")));
            } else {
                $f3->reroute("/login?to=" . urlencode($f3->get("PATH")) . urlencode("?" . http_build_query($_GET)));
            }
            $f3->unload();
            return false;
        }
    }

    /**
     * Require a user to be an administrator. Throws HTTP 403 if logged in, but not an admin.
     * @param  int $rank
     * @return int|bool
     */
    protected function _requireAdmin($rank = \Model\User::RANK_ADMIN)
    {
        $id = $this->_requireLogin();

        $f3 = \Base::instance();
        if ($f3->get("user.role") == "admin" && $f3->get("user.rank") >= $rank) {
            return $id;
        } else {
            $f3->error(403);
            $f3->unload();
            return false;
        }
    }

    /**
     * Render a view
     * @param string  $file
     * @param string  $mime
     * @param array   $hive
     * @param integer $ttl
     */
    protected function _render($file, $mime = "text/html", array $hive = null, $ttl = 0)
    {
        echo \Helper\View::instance()->render($file, $mime, $hive, $ttl);
    }

    /**
     * Output object as JSON and set appropriate headers
     * @param mixed $object
     */
    protected function _printJson($object)
    {
        if (!headers_sent()) {
            header("Content-type: application/json");
        }
        echo json_encode($object);
    }

    /**
     * Load groups and users and projects for admin or by group access
     * @param \Base $f3
     * @return void
     */
    public function loadGroupsUsersProjects($f3)
    {
        // Load full project, user, group lists if admin user, and load by group access otherwise
        $user = $f3->get("user_obj");
        $users = new \Model\User;
        $issues = new \Model\Issue;
        if ($user->role == 'admin') {
            $f3->set("accessUsers", $users->find("deleted_date IS NULL AND role != 'group'", array("order" => "name ASC")));
            $f3->set("accessGroups", $users->find("deleted_date IS NULL AND role = 'group'", array("order" => "name ASC")));
            $f3->set("accessProjects", $issues->find("deleted_date IS NULL AND type_id = 1", array("order" => "name ASC")));
        } else {
            $groups = new \Model\User\Group;
            $userGroups = $groups->getUserGroups($f3->get("user.id"));
            $f3->set("accessGroups", $userGroups);
            $allUsers = $users->find("deleted_date IS NULL AND role != 'group'", array("order" => "name ASC"));
            $groupUsers;
            $groupProjects = Array();
            foreach($userGroups as $curGroup) {
                $curGroupProjects = $groups->getGroupProjects($curGroup['id']);
                foreach($curGroupProjects as $project) {
                    array_push($groupProjects, $project);
                }
                foreach($allUsers as $curUser) {
                    if ($groups->userIsInGroup($curGroup['id'], $curUser['id'])) {
                        $groupUsers[] = $curUser;
                    }
                }
            }
			$f3->set("accessProjects", $groupProjects);
            $f3->set("accessUsers", array_unique($groupUsers));
        }
    }

    /**
     * Get current time and date in a MySQL NOW() format
     * @param  boolean $time  Whether to include the time in the string
     * @return string
     */
    public function now($time = true)
    {
        return $time ? date("Y-m-d H:i:s") : date("Y-m-d");
    }
}
