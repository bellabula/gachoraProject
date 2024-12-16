<?php

use function GuzzleHttp\json_decode;

require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['number']) && isset($_POST['series_id']) && isset($_POST['label'])) {
    $number = $_POST['number'];
    $series_id = $_POST['series_id'];
    $label = $_POST['label'];
    $time = isset($_POST['time']) ? $_POST['time'] : time();
    $API = new API;
    header('Content-Type: application/json');
    // 拆解前端array
    $labelarray = explode(",", $label);
    $labelArray = array_map('intval', $labelarray);
    // 重複取消
    $tmp = $API->GetLabels($series_id);
    $label = array_diff($labelarray, $tmp);
    $amounts = count($label);
    $label = $string = json_encode(array_map('strval', $label));
    // echo json_encode($label);
    // 有剩餘購買
    if ($amounts > 0) {
      $result = $API->PlayIchiban($series_id, $number, $amounts, $label, $time);
      echo $result;
    } else {
      // 沒剩餘回傳不能抽的
      echo json_encode(['error' => 'Labels already taken. Please try again.', 'label' => $tmp]);
    }
  } else {
    throw new Exception("give me series_id, number, label (label form: '1,3,45,57,123' without space)");
  }
} catch (Exception $e) {
  if ($e->getCode() == 23000) {
    echo json_encode(["error" => "Not Enough G point."]);
  } else {
    echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
  }
}
