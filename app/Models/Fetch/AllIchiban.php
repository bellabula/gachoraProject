<?php
require_once __DIR__ . '/../index/API.php';
try {
  $API = new API;
  header('Content-Type: application/json');
  if (isset($_POST['user_id'])) {
    $user_id = $_POST['user_id'];
    $result = $API->AllIchibanWithUser($user_id);
    echo $result;
  } else {
    $result = $API->AllIchibanNoUser();
  }
  $API = null;
  echo $result;
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
