<?php
/**
 * Created by PhpStorm.
 * User: hellpoet
 * Date: 3/2/2018
 * Time: 4:01 PM
 */
include '../hellrookie.util/Config.php';

$config = new \hellrookie\util\Config('../bin/config.json');
echo "hello";
$items = $config->getValue("slider/items");
foreach ($items as $item)
{
    echo 'link: ' . $item['link'] . '</br>';
    echo 'content: '. $item['content'] . '</br>';
    echo 'img: ' . $item["img"] . '</br>';
    echo '**************************************</br>';
}
