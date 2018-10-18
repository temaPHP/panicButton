<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require '../vendor/autoload.php';
require 'config.php';

use GuzzleHttp\Client;
$client = new Client();
$client->setDefaultOption('verify', false);

$input = $_GET['incident'];
$input = urlencode($input);
$url = 'https://' . $instance . '.service-now.com/api/now/v1/table/incident?sysparm_query=number=' . $input;

$response = $client->get($url, [
    'auth' => [
        $username, 
        $password
    ]
]);

$body = $response->getBody();
$data = json_decode($body);

/*
print "<PRE>";
print_r($data);
*/
$return = array(
    'number' => $data->result[0]->number
    ,'active' => $data->result[0]->active
);
print json_encode($return);
