<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['user_id']) && isset($_POST['gash_id'])) {
    $user_id = $_POST['user_id'];
    $gash_id = $_POST['gash_id'];
    $API = new API;
    header('Content-Type: application/json');
    $result = $API->TopUpGash($user_id, $gash_id, time());
    echo $result;
  } else {
    throw new Exception("give me user_id, gash_id");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
