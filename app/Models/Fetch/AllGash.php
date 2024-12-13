<?php
require_once __DIR__ . '/../index/API.php';
try {
  $API = new API;
  header('Content-Type: application/json');
  $result = $API->AllGash();
  $API = null;
  echo $result;
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
