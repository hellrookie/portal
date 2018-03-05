<?php
/**
 * Created by PhpStorm.
 * User: hellpoet
 * Date: 3/2/2018
 * Time: 1:53 PM
 * This class is used for getting data from configuration files.
 * For now only support ini and json files.
 */

namespace hellrookie\util;
include 'CommonUtil.php';

class Config
{
    private $path;
    private $data;
    const INI_FILE = ".ini";
    const JSON_FILE = '.json';

    public function __construct($filePath)
    {
        $this->path = $filePath;
        switch (strtolower($this->getFileType()))
        {
            case Config::INI_FILE:
                $this->data = parse_ini_file($this->path, true);
                break;
            case Config::JSON_FILE:
                $fileContent = file_get_contents($this->path);
                $this->data = json_decode($fileContent, true);
            default:
                break;
        }
    }

    private function getFileType()
    {
        return CommonUtil::getExtension($this->path);
    }

    private function getValueByKey($data, $key)
    {
        return isset($data) ? $data[$key]: null;
    }

    /**
     *
     * @param $path The path to find the configuration value, use '/' or '\' to split.
     * @return mixed|null
     */
    public function getValue($path)
    {
        $path = preg_replace('((^\\\|^\/)|(\\\$|\/$))', "", $path);
        $keys = preg_split('/(\\\|\/)/', $path);
        $result = $this->data;
        foreach ($keys as $key)
        {
            $result = $this->getValueByKey($result, $key);
        }
        return $result;
    }

    public function getAll()
    {
        return $this->data;
    }
}