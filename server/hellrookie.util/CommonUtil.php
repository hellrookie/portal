<?php
/**
 * Created by PhpStorm.
 * User: hellpoet
 * Date: 3/2/2018
 * Time: 2:48 PM
 */

namespace hellrookie\util;


class CommonUtil
{
    public static function endWith($fullValue, $valueToCheck)
    {
        $pos = stripos($fullValue, $valueToCheck);
        $len1 = strlen($fullValue);
        $len2 = strlen($valueToCheck);
        if($len1 == $pos + $len2)
        {
            return true;
        }
        return false;
    }

    public static function getExtension($fileName)
    {
        return strrchr($fileName, '.');
    }
}