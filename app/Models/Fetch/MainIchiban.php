<?php 
require_once __DIR__ . '/../index/API.php';
$API = new API;
header('Content-Type: application/json');
$result = $API->IchibanBling();
$API = null;
echo $result;
?>