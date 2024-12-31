<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['email']) && isset($_POST['code'])) {
    $email = $_POST['email'];
    $code = $_POST['code'];
    $API = new API;
    header('Content-Type: application/json');
    $result = $API->GiveRecommendGift($email, $code);
    echo $result;
  } else {
    throw new Exception("give me email, code");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}