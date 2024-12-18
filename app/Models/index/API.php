<?php

use Mockery\Undefined;

require_once __DIR__ . '/Connect.php';
class API
{
  private function fetchSeriesImages($db, &$jsonOutput)
  {
    foreach ($jsonOutput as $series_id => &$item) {
      $sql2 = "SELECT * FROM vw_series_img WHERE series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();

      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = 'http://localhost/gachoraProject/public/images' . $output2['series_img'];
      }
      $stmt2->closeCursor();
      $item['img'] = $img;
    }
  }
  // 扭蛋主頁fetch
  // 精選
  function EggBling()
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "select * from vw_blingEgg";
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_series_img where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      $jsonOutput[] = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'amount' => $output1['amount'],
        'img' => $img
      ];
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // top 10 
  function EggTop10()
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "select * from vw_hotEgg limit 10";
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_series_img where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      $jsonOutput[] = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'amount' => $output1['amount'],
        'img' => $img
      ];
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function AllEggNoUser()
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "call GetAllCardByCategoryId(1)";
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[$output1['series_id']] = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'amount' => $output1['amount'],
        'rank' => $output1['rank'],
        'rare' => $output1['rare'],
        'release_time' => $output1['release_time'],
        'img' => []
      ];
    }
    $stmt1->closeCursor();
    $this->fetchSeriesImages($db, $jsonOutput);
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode(array_values($jsonOutput));
  }
  function AllEggWithUser($user_id)
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "call GetAllCardByUserAndCategoryId(:user_id, 1)";
    $stmt1 = $db->prepare($sql1);
    $stmt1->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[$output1['series_id']] = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'amount' => $output1['amount'],
        'rank' => $output1['rank'],
        'rare' => $output1['rare'],
        'release_time' => $output1['release_time'],
        'img' => [],
        'collected' => $output1['collected']
      ];
    }
    $stmt1->closeCursor();
    $this->fetchSeriesImages($db, $jsonOutput);
    $db = null;
    return json_encode(array_values($jsonOutput));
  }
  function AllIchibanNoUser()
  {
    $db = new Connect;
    $jsonOutput = [];
    $character = [];
    $tmp = [];
    $sql1 = "call GetAllCardByCategoryId(2)";
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute();
    $series_ids = [];
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_ids[] = $output1['series_id'];
      $jsonOutput[$output1['series_id']] = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'amount' => $output1['amount'],
        'rank' => $output1['rank'],
        'rare' => $output1['rare'],
        'release_time' => $output1['release_time'],
        'img' => [],
        'character' => $character
      ];
    }
    $stmt1->closeCursor();
    $this->fetchSeriesImages($db, $jsonOutput);
    foreach ($series_ids as $series_id) {
      $sql2 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $character[] = [
          'prize' => $output2['prize'],
          'name' => $output2['name'],
          'remain' => $output2['remain'],
          'total' => $output2['amount']
        ];
      }
      $stmt2->closeCursor();
      foreach ($jsonOutput as &$item) {
        if ($item['series_id'] == $series_id) {
          $item['character'] = $character;
          break;
        }
      }
    }
    foreach ($series_ids as $series_id) {
      $sql2 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $tmp = [
          'remain' => $output2['all_remain'],
          'total' => $output2['all_amount']
        ];
      }
      $stmt2->closeCursor();
      foreach ($jsonOutput as &$item) {
        if ($item['series_id'] == $series_id) {
          $item = [...$item, ...$tmp];
          break;
        }
      }
    }
    $db = null;
    // if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function AllIchibanWithUser($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $img = [];
    $character = [];
    $tmp = [];
    $series_ids = [];
    $sql1 = "call GetAllCardByUserAndCategoryId(:user_id, 2)";
    $stmt1 = $db->prepare($sql1);
    $stmt1->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_ids[] = $output1['series_id'];
      $jsonOutput[$output1['series_id']] = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'] ?? '',
        'title' => $output1['series_title'] ?? '',
        'name' => $output1['name'] ?? '',
        'price' => $output1['price'] ?? '',
        'amount' => $output1['amount'] ?? '',
        'rank' => $output1['rank'] ?? '',
        'rare' => $output1['rare'] ?? '',
        'release_time' => $output1['release_time'] ?? '',
        'img' => [],
        'character' => $character,
        'collected' => $output1['collected'] ?? ''
      ];
    }
    $stmt1->closeCursor();
    $this->fetchSeriesImages($db, $jsonOutput);
    foreach ($series_ids as $series_id) {
      $sql2 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $character[] = [
          'prize' => $output2['prize'],
          'name' => $output2['name'],
          'remain' => $output2['remain'],
          'total' => $output2['amount']
        ];
      }
      $stmt2->closeCursor();
      foreach ($jsonOutput as &$item) {
        if ($item['series_id'] == $series_id) {
          $item['character'] = $character;
          break;
        }
      }
    }
    foreach ($series_ids as $series_id) {
      $sql2 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $tmp = [
          'remain' => $output2['all_remain'],
          'total' => $output2['all_amount']
        ];
      }
      $stmt2->closeCursor();
      foreach ($jsonOutput as &$item) {
        if ($item['series_id'] == $series_id) {
          $item = [...$item, ...$tmp];
          break;
        }
      }
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }

  // 扭蛋主頁post
  function EggType($type, $page)
  {
    $type = $_POST['type'];
    $db = new Connect;
    $jsonOutput = [];
    if (is_null($type)) {
      $sql1 = "select * from vw_allEgg limit :page, 24";
      $sql2 = "select count(*) from vw_allEgg";
    }
    if ($type == 'all') {
      $sql1 = "select * from vw_allEgg limit :page, 24";
      $sql2 = "select count(*) from vw_allEgg";
    }
    if ($type == 'hot') {
      $sql1 = "select * from vw_hotEgg limit :page, 24";
      $sql2 = "select count(*) from vw_hotEgg";
    }
    if ($type == 'rare') {
      $sql1 = "select * from vw_rareEgg limit :page, 24";
      $sql2 = "select count(*) from vw_rareEgg";
    }
    if ($type == 'new') {
      $sql1 = "select * from vw_newEgg limit :page, 24";
      $sql2 = "select count(*) from vw_newEgg";
    }
    $stmt1 = $db->prepare($sql1);
    $stmt2 = $db->prepare($sql2);
    $stmt1->bindValue(':page', ($page - 1) * 24, PDO::PARAM_STR);
    $stmt1->execute();
    $stmt2->execute();
    while ($output = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output['series_id'];
      $sql3 = "select * from vw_series_img where series_id = :series_id";
      $stmt3 = $db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      $img = [];
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output3['series_img'];
      }
      $jsonOutput['series'][] = [
        'series_id' => $output['series_id'],
        'theme' => $output['theme'],
        'title' => $output['series_title'],
        'name' => $output['name'],
        'price' => $output['price'],
        'amount' => $output['amount'],
        'img' => $img
      ];
    }
    while ($output = $stmt2->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['pages'] = floor($output['count(*)'] / 24) + 1;
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 扭蛋分類fetch
  // 主題顯示
  function Theme()
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "select Theme from vw_theme m left join Theme t on m.theme_id = t.id where category_id = 1 group by Theme";
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = $output1['Theme'];
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 扭蛋分類post
  function ThemeSort($theme, $page)
  {
    $theme = $_POST['theme'];
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "select * from vw_eggcard where theme = :theme limit :page, 24";
    $sql2 = "select count(*) from vw_eggcard";

    $stmt1 = $db->prepare($sql1);
    $stmt2 = $db->prepare($sql2);
    $stmt1->bindValue(':theme', $theme, PDO::PARAM_STR);
    $stmt1->bindValue(':page', ($page - 1) * 24, PDO::PARAM_STR);
    $stmt1->execute();
    $stmt2->execute();
    $jsonOutput['series'] = [];
    while ($output = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output['series_id'];
      $sql3 = "select * from vw_EggCardImg where series_id = :series_id";
      $stmt3 = $db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      $img = [];
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output3['series_img'];
      }
      $jsonOutput['series'][] = [
        'series_id' => $output['series_id'],
        'theme' => $output['theme'],
        'title' => $output['series_title'],
        'name' => $output['name'],
        'price' => $output['price'],
        'amount' => $output['amount'],
        'img' => $img
      ];
    }
    while ($output = $stmt2->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['pages'] = floor($output['count(*)'] / 24) + 1;
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }

  // 扭蛋詳細post
  function EggDetail($series_id)
  {
    $series_id = $_POST['series_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "select * from vw_detail where series_id = :series_id";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->execute();
    $sql1 = "select * from vw_allEgg where series_id = :series_id";
    $stmt1 = $db->prepare($sql1);
    $stmt1->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $theme = $output1['theme'];
      $sql2 = "select * from vw_series_img where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = 'http://localhost/gachoraProject/public/images' . $output2['series_img'];
      }
      $jsonOutput['series'][] = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'amount' => $output1['amount'],
        'img' => $img
      ];
    }
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['character'][] = [
        'prize' => $output['prize'],
        'name' => $output['character_name'],
        'img' => 'http://localhost/gachoraProject/public/images' . $output['character_img'],
        'size' => $output['size'],
        'material' => $output['material'],
      ];
    }
    // 扭蛋詳細推薦
    $sql1 = "select * from vw_eggcard where theme = :theme limit 10";
    $sql2 = "select count(*) from vw_eggcard";

    $stmt1 = $db->prepare($sql1);
    $stmt2 = $db->prepare($sql2);
    $stmt1->bindValue(':theme', $theme, PDO::PARAM_STR);
    $stmt1->execute();
    $stmt2->execute();
    $jsonOutput['recommend'] = [];
    while ($output = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output['series_id'];
      $sql3 = "select * from vw_EggCardImg where series_id = :series_id";
      $stmt3 = $db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      $img = [];
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $img[] = 'http://localhost/gachoraProject/public/images' . $output3['series_img'];
      }
      $jsonOutput['recommend'][] = [
        'series_id' => $output['series_id'],
        'theme' => $output['theme'],
        'title' => $output['series_title'],
        'name' => $output['name'],
        'price' => $output['price'],
        'amount' => $output['amount'],
        'img' => $img
      ];
    }
    // 扭蛋剩餘
    $sql4 = "call GetAmountById(:series_id)";
    $stmt4 = $db->prepare($sql4);
    $stmt4->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt4->execute();
    while ($output4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['series'][0] += [
        'remain' => $output4['remain'],
        'total' => $output4['total']
      ];
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }

  // 地址
  function City($input)
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql = "SELECT * from City where id = $input";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[$output['id']] = [
        'id' => $output['id'],
        'city' => $output['city']
      ];
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  //一番賞首
  //精選
  function IchibanBling()
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "select series_id, theme_id, theme, series_title, name, price from vw_ichiban order by release_time";
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $array2 = [
          'remain' => $output3['all_remain'],
          'total' => $output3['all_amount']
        ];
      }
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $db->prepare($sql4);
      $stmt4->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt4->execute();
      $character = [];
      while ($output4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
        $character[] = [
          'prize' => $output4['prize'],
          'name' => $output4['name'],
          'remain' => $output4['remain'],
          'total' => $output4['amount']
        ];
      }
      $array1 = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'img' => $img,
        'character' => $character
      ];
      $jsonOutput[] = array_merge($array1, $array2);
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 賞主頁post
  function IchibanType($type, $page)
  {
    $type = $_POST['type'];
    $db = new Connect;
    $jsonOutput = [];
    if (is_null($type)) {
      $sql1 = "select series_id, theme_id, theme, series_title, name, price from vw_ichiban order by stock desc limit :page, 24";
    }
    if ($type == 'all' || $type == 'hot') {
      $sql1 = "select series_id, theme_id, theme, series_title, name, price from vw_ichiban order by stock desc limit :page, 24";
    }
    if ($type == 'rare') {
      $sql1 = "select series_id, theme_id, theme, series_title, name, price from vw_ichiban order by stock limit :page, 24";
    }
    if ($type == 'new') {
      $sql1 = "select series_id, theme_id, theme, series_title, name, price from vw_ichiban order by release_time desc limit :page, 24";
    }
    $stmt1 = $db->prepare($sql1);
    $stmt1->bindValue(':page', ($page - 1) * 24, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $array2 = [
          'remain' => $output3['all_remain'],
          'total' => $output3['all_amount']
        ];
      }
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $db->prepare($sql4);
      $stmt4->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt4->execute();
      $character = [];
      while ($output4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
        $character[] = [
          'prize' => $output4['prize'],
          'name' => $output4['name'],
          'remain' => $output4['remain'],
          'total' => $output4['amount']
        ];
      }
      $array1 = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'img' => $img,
        'character' => $character
      ];
      $jsonOutput['series'][] = array_merge($array1, $array2);
      $sql2 = "select count(*) from vw_IchibanImg";
      $stmt2 = $db->prepare($sql2);
      $stmt2->execute();
      while ($output = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $jsonOutput['pages'] = floor($output['count(*)'] / 24) + 1;
      }
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 賞分類post
  function IchibanThemeSort($theme, $page)
  {
    $theme = $_POST['theme'];
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "select * from vw_Ichiban where theme = :theme limit :page, 24";
    $stmt1 = $db->prepare($sql1);
    $stmt1->bindValue(':theme', $theme, PDO::PARAM_STR);
    $stmt1->bindValue(':page', ($page - 1) * 24, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $array2 = [
          'remain' => $output3['all_remain'],
          'total' => $output3['all_amount']
        ];
      }
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $db->prepare($sql4);
      $stmt4->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt4->execute();
      $character = [];
      while ($output4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
        $character[] = [
          'prize' => $output4['prize'],
          'name' => $output4['name'],
          'remain' => $output4['remain'],
          'total' => $output4['amount']
        ];
      }
      $array1 = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'img' => $img,
        'character' => $character
      ];
      $jsonOutput['series'][] = array_merge($array1, $array2);
      $sql2 = "select count(*) from vw_Ichiban";
      $stmt2 = $db->prepare($sql2);
      $stmt2->execute();
      while ($output = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $jsonOutput['pages'] = floor($output['count(*)'] / 24) + 1;
      }
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 一番賞種類
  function IchibanTheme()
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql1 = "select Theme from vw_theme m left join Theme t on m.theme_id = t.id where category_id = 2 group by Theme";
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = $output1['Theme'];
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 賞詳細post
  function IchibanDetail($series_id)
  {
    $series_id = $_POST['series_id'];
    $db = new Connect;
    $jsonOutput = [];
    $theme = '';
    $sql1 = "select series_id, theme_id, theme, series_title, name, price from vw_ichiban where series_id = :series_id";
    $stmt1 = $db->prepare($sql1);
    $stmt1->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $array0 = [
          'remain' => $output3['all_remain'],
          'total' => $output3['all_amount']
        ];
      }
      //character
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $db->prepare($sql4);
      $stmt4->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt4->execute();
      $character = [];
      while ($output4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
        $array1[] = [
          'prize' => $output4['prize'],
          'name' => $output4['name'],
          'remain' => $output4['remain'],
          'total' => $output4['amount']
        ];
      }
      $sql5 = "select character_img, size, material from vw_detail where series_id = :series_id";
      $stmt5 = $db->prepare($sql5);
      $stmt5->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt5->execute();
      $character = [];
      while ($output5 = $stmt5->fetch(PDO::FETCH_ASSOC)) {
        $array2[] = [
          'img' => $output5['character_img'],
          'size' => $output5['size'],
          'material' => $output5['material'],
        ];
      }
      foreach ($array1 as $index => $element) {
        $character[] = array_merge($element, $array2[$index]);
      }
      $theme = $output1['theme'];
      $array3 = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'img' => $img,
        'character' => $character
      ];
      $jsonOutput['series'] = array_merge($array0, $array3);
    }
    // 賞主題推薦
    $sql1 = "select * from vw_Ichiban where theme = :theme limit 10";
    $stmt1 = $db->prepare($sql1);
    $stmt1->bindValue(':theme', $theme, PDO::PARAM_STR);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $db->prepare($sql4);
      $stmt4->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt4->execute();
      $character = [];
      while ($output4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
        $character[] = [
          'prize' => $output4['prize'],
          'name' => $output4['name'],
          'remain' => $output4['remain'],
          'total' => $output4['amount']
        ];
      }
      $array5 = [
        'series_id' => $output1['series_id'],
        'theme' => $output1['theme'],
        'title' => $output1['series_title'],
        'name' => $output1['name'],
        'price' => $output1['price'],
        'img' => $img,
        'character' => $character
      ];
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $array3 = [
          'remain' => $output3['all_remain'],
          'total' => $output3['all_amount']
        ];
      }
      $jsonOutput['recommend'][] = array_merge($array3, $array5);
      // 已抽籤號
      $sql = "call GetLabelById(:series_id)";
      $stmt = $db->prepare($sql);
      $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt->execute();
      while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $jsonOutput['label'][] = $output['label'];
      }
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function User($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetUserNameById(:user_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['name'] = $output['name'];
    }
    $stmt->closeCursor();
    $sql = "call GetPastAYearGashById(:user_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['gash_level'] = $output['gash'];
    }
    $stmt->closeCursor();
    $sql = "call GetGashNowById(:user_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['gash'] = $output['gash'];
    }
    $stmt->closeCursor();
    $sql = "call GetGiftExpireDateById(:user_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['gift'][] = [
        'amount' => $output['gift'],
        'expire_at' => date('Y-m-d H:i:s', $output['expire_at'])
      ];
    }
    if (!isset($jsonOutput['gift'])) {
      $jsonOutput['gift'][] = [
        'amount' => '沒',
        'expire_at' => '某時'
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Wall($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetRecordsByIdAndCategory(:user_id, 1);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['egg'][] = [
        'img' => $output['img']
      ];
    }
    $stmt->closeCursor();
    $sql = "call GetRecordsByIdAndCategory(:user_id, 2);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['ichiban'][] = [
        'img' => $output['img']
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function CollectionEgg($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetCollectionHasByIdAndCategory(:user_id, 1);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $series_ids = [];
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $series_ids[] = $output['series_id'];
      $jsonOutput['has'][] = [
        'id' => $output['series_id'],
        'notification_status' => $output['notification_status'],
        'name_title' => $output['name_title'],
        'name' => $output['name'],
        'price' => $output['price']
      ];
    }
    $stmt->closeCursor();
    foreach ($series_ids as $series_id) {
      $sql1 = "call GetSeriesImgById(:series_id);";
      $stmt1 = $db->prepare($sql1);
      $stmt1->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt1->execute();
      $img = [];
      while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output1['img'];
      }
      $stmt1->closeCursor();
      foreach ($jsonOutput['has'] as &$item) {
        if ($item['id'] == $series_id) {
          $item['img'] = $img;
          break;
        }
      }
    }
    $sql = "call GetCollectionNoByIdAndCategory(:user_id, 1);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $series_ids = [];
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $series_ids[] = $output['series_id'];
      $jsonOutput['no'][] = [
        'id' => $output['series_id'],
        'notification_status' => $output['notification_status'],
        'name_title' => $output['name_title'],
        'name' => $output['name'],
        'price' => $output['price']
      ];
    }
    $stmt->closeCursor();
    foreach ($series_ids as $series_id) {
      $sql1 = "call GetSeriesImgById(:series_id);";
      $stmt1 = $db->prepare($sql1);
      $stmt1->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt1->execute();
      $img = [];
      while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output1['img'];
      }
      $stmt1->closeCursor();
      foreach ($jsonOutput['no'] as &$item) {
        if ($item['id'] == $series_id) {
          $item['img'] = $img;
          break;
        }
      }
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function CollectionIchiban($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetCollectionHasByIdAndCategory(:user_id, 2);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $series_ids = [];
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $series_ids[] = $output['series_id'];
      $jsonOutput['has'][] = [
        'id' => $output['series_id'],
        'notification_status' => $output['notification_status'],
        'name_title' => $output['name_title'],
        'name' => $output['name'],
        'price' => $output['price']
      ];
    }
    $stmt->closeCursor();
    foreach ($series_ids as $series_id) {
      $sql1 = "call GetSeriesImgById(:series_id);";
      $stmt1 = $db->prepare($sql1);
      $stmt1->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt1->execute();
      $img = [];
      while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output1['img'];
      }
      $stmt1->closeCursor();
      foreach ($jsonOutput['has'] as &$item) {
        if ($item['id'] == $series_id) {
          $item['img'] = $img;
          break;
        }
      }
    }
    $sql = "call GetCollectionNoByIdAndCategory(:user_id, 2);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $series_ids = [];
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $series_ids[] = $output['series_id'];
      $jsonOutput['no'][] = [
        'id' => $output['series_id'],
        'notification_status' => $output['notification_status'],
        'name_title' => $output['name_title'],
        'name' => $output['name'],
        'price' => $output['price']
      ];
    }
    $stmt->closeCursor();
    foreach ($series_ids as $series_id) {
      $sql1 = "call GetSeriesImgById(:series_id);";
      $stmt1 = $db->prepare($sql1);
      $stmt1->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt1->execute();
      $img = [];
      while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output1['img'];
      }
      $stmt1->closeCursor();
      foreach ($jsonOutput['no'] as &$item) {
        if ($item['id'] == $series_id) {
          $item['img'] = $img;
          break;
        }
      }
    }
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Wallet($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetUserWalletRecordById(:user_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'date' => date('Y/m/d', $output['time']),
        'item' => $output['series_name'],
        'category' => $output['category'],
        'price' => $output['price'],
        'amount' => $output['amount']
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Bag($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetBagCartByIdAndStatus(:user_id, 4);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'id' => $output['record_id'],
        'img' => $output['img'],
        'series_title' => $output['title'],
        'series' => $output['series'],
        'name' => $output['name'],
        'time' => date('Y/m/d', $output['time']),
        'gift' => $output['gift'],
        'prize' => $output['prize']
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Cart($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetBagCartByIdAndStatus(:user_id, 5);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'id' => $output['record_id'],
        'img' => $output['img'],
        'series' => $output['series'],
        'name' => $output['name'],
        'time' => date('Y/m/d', $output['time'])
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Logistics($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetAllLogisticsById(:user_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'id' => $output['id'],
        'no' => $output['no'],
        'time' => date('Y/m/d', $output['time']),
        'status' => $output['status'],
        'method' => $output['method']
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Userinfo($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetUserinfoById(:user_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'id' => $output['id'],
        'name' => $output['name'],
        'email' => $output['email'],
        'phone' => $output['phone'],
        'birth' => $output['birth'] === null ? '' : $output['birth'],
        'address' => $output['address'],
        'recommend' => $output['recommend'],
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function LogisticsDetail($list_id)
  {
    $list_id = $_POST['list_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetLogisticsDetailById(:list_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput = [
        'no' => $output['no'],
        'time' => date('Y/t/m', $output['time']),
        'status' => $output['status'],
        'name' => $output['user'],
        'method' => $output['method'],
        'deliver_time' => $output['deliver_time'],
        'address' => $output['address'],
        'products' => []
      ];
    }
    $stmt->closeCursor();
    $sql = "call GetLogisticsItemById(:list_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['products'][] = [
        'name' => $output['character_name'],
        'amount' => $output['amount']
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function ToCollection($user_id, $series_id)
  {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call UpdateCollectionByUserSeries(:user_id, :series_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput = $output;
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function AddToProductReminder($user_id, $series_id)
  {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call AlterCollectionStatusByUserSeriesStatus(:user_id, :series_id, 11);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput = $output;
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function AllGash()
  {
    $db = new Connect;
    $jsonOutput = [];
    $sql = "SELECT id, gash, dollar FROM Gash WHERE 1;";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'id' => $output['id'],
        'gash' => $output['gash'],
        'dollar' => $output['dollar']
      ];
    }
    $stmt->closeCursor();
    $db = null;
    // if ($jsonOutput === null) $jsonOutput = ['error' => 'No results found, please try again'];
    return json_encode($jsonOutput);
  }
  function PlayEgg($user_id, $series_id, $amounts, $time)
  {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $amounts = $_POST['amounts'];
    $time = isset($_POST['time']) ? $_POST['time'] : time();
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call PlayEgg(:user_id, :series_id, :amounts, :time);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->bindValue(':amounts', $amounts, PDO::PARAM_INT);
    $stmt->bindValue(':time', $time, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'error' => $output['error'] ?? '',
        'name' => $output['name'] ?? '',
        'img' => $output['img'] ?? '',
        'amount' => $output['amount'] ?? ''
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = ['' => ''];
    return json_encode($jsonOutput);
  }
  function TopUpGash($user_id, $gash_id, $time)
  {
    $user_id = $_POST['user_id'];
    $gash_id = $_POST['gash_id'];
    $time = isset($_POST['time']) ? $_POST['time'] : time();
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call TopUpGash(:user_id, :time, :gash_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':gash_id', $gash_id, PDO::PARAM_INT);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindValue(':time', $time, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'error' => $output['error'] ?? ''
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [''];
    return json_encode($jsonOutput);
  }
  function LineIn($series_id, $user_id)
  {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call LineUp(:series_id, :user_id);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'error' => $output['error'] ?? '',
        'yournumber' => $output['yournumber'] ?? '',
        'waiting' => $output['waiting'] ?? ''
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = ['' => ''];
    return json_encode($jsonOutput);
  }
  function SeeWaitTime($series_id, $number)
  {
    $series_id = $_POST['series_id'];
    $number = $_POST['number'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call SeeWaitTime(:series_id, :number);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->bindValue(':number', $number, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput = [
        'error' => $output['error'] ?? '',
        'yournumber' => $output['yournumber'] ?? '',
        'waiting' => $output['waiting'] ?? '',
        'series_id' => $series_id
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = ['' => ''];
    return json_encode($jsonOutput);
  }
  function DeleteWait()
  {
    $series_id = $_POST['series_id'];
    $number = $_POST['number'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call DeleteWaiting(:series_id, :number);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->bindValue(':number', $number, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput = [
        'error' => $output['error'] ?? '',
        'yournumber' => $output['yournumber'] ?? '',
        'waiting' => $output['waiting'] ?? '',
        'series_id' => $series_id
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = ['' => ''];
    return json_encode($jsonOutput);
  }
  function PlayIchiban($series_id, $number, $amounts, $label, $time)
  {
    // $series_id = $_POST['series_id'];
    // $number = $_POST['number'];
    // $amounts = $_POST['amounts'];
    // $label = $_POST['label'];
    // $time = isset($_POST['time']) ? $_POST['time'] : time();
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call PlayIchiban(:series_id, :number, :amounts, :label, :time)";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->bindValue(':number', $number, PDO::PARAM_INT);
    $stmt->bindValue(':amounts', $amounts, PDO::PARAM_INT);
    $stmt->bindValue(':label', $label, PDO::PARAM_STR);
    $stmt->bindValue(':time', $time, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'error' => $output['error'] ?? '',
        'name' => $output['name'] ?? '',
        'img' => $output['img'] ?? '',
        'amount' => $output['amount'] ?? ''
      ];
    }
    $stmt->closeCursor();
    $db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function GetLabels($series_id)
  {
    $series_id = $_POST['series_id'];
    $db = new Connect;
    $tmp = [];
    $sql = "call GetLabelById(:series_id)";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = $output['label'];
    }
    $stmt->closeCursor();
    $db = null;
    return $jsonOutput;
  }
  function MyTimer($user_id)
  {
    $user_id = $_POST['user_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call GetWaitTimeById(:user_id)";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'series_id' => $output['series_id'],
        'name' => $output['series_name'],
        'number' => $output['number'],
        'waiting' => $output['waiting'],
      ];
    }
    $stmt->closeCursor();
    $db = null;
    return json_encode($jsonOutput);
  }
  function ToG($record_id)
  {
    $record_id = $_POST['record_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call ChangeStatusByIdAndStatus(:record_id, 3)";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':record_id', $record_id, PDO::PARAM_INT);
    $stmt->execute();
    $jsonOutput = ['error' => 'to G done'];
    $stmt->closeCursor();
    $db = null;
    return json_encode($jsonOutput);
  }
  function ToCart($record_id)
  {
    $record_id = $_POST['record_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call ChangeStatusByIdAndStatus(:record_id, 5)";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':record_id', $record_id, PDO::PARAM_INT);
    $stmt->execute();
    $jsonOutput = ['error' => 'to cart done'];
    $stmt->closeCursor();
    $db = null;
    return json_encode($jsonOutput);
  }
  function ToBag($record_id)
  {
    $record_id = $_POST['record_id'];
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call ChangeStatusByIdAndStatus(:record_id, 4)";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':record_id', $record_id, PDO::PARAM_INT);
    $stmt->execute();
    $jsonOutput = ['error' => 'to bag done'];
    $stmt->closeCursor();
    $db = null;
    return json_encode($jsonOutput);
  }
  function changeStatus($record_id, $status)
{
    $db = new Connect;
    $jsonOutput = [];
    $sql = "call ChangeStatusByIdAndStatus(:record_id, :status)";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':record_id', $record_id, PDO::PARAM_INT);
    $stmt->bindValue(':status', $status, PDO::PARAM_INT);
    $stmt->execute();
    $jsonOutput = ['error' => 'Status changed to ' . $status];
    $stmt->closeCursor();
    $db = null;
    return json_encode($jsonOutput);
}
}
