<?php
/**
 * Created by PhpStorm.
 * User: hellpoet
 * Date: 3/6/2018
 * Time: 11:24 AM
 */

include '../hellrookie.util/Config.php';

$config = new \hellrookie\util\Config('../dataConfig.json');
$items = $config->getValue($_POST["path"]);
$result = json_encode($items);
echo $result;