<?php

use Mockery\Undefined;

require_once __DIR__ . '/Connect.php';
class API
{
  /**
   * 初始化
   */
  private $db;

  public function __construct()
  {
    $this->db = new Connect;
  }
  /**
   * 扭蛋商品卡
   */
  public function AllEggNoUser()
  {
    return $this->fetchEggData(null);
  }
  public function AllEggWithUser($user_id)
  {
    return $this->fetchEggData($user_id);
  }
  public function fetchEggData($user_id)
  {
    return $this->fetchData($user_id, 1, 'mapEggCard');
  }

  /**
   * 一番賞商品卡
   */
  public function AllIchibanNoUser()
  {
    return $this->fetchIchibanData(null);
  }
  public function AllIchibanWithUser($user_id)
  {
    return $this->fetchIchibanData($user_id);
  }
  public function fetchIchibanData($user_id)
  {
    return $this->fetchData($user_id, 2, 'mapIchibanCard');
  }
  /**
   * 執行sql
   */
  private function fetchData($user_id, $categoryId, $mapFunction)
  {
    $jsonOutput = [];
    $sql = $user_id ?
      "call GetAllCardbyUserAndCategoryId(:user_id, :categoryId)" :
      "call GetAllCardbyCategoryId(:categoryId)";
    $stmt = $this->db->prepare($sql);
    if ($user_id) $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindValue(':categoryId', $categoryId, PDO::PARAM_INT);
    $stmt->execute();

    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[$output['series_id']] = $this->$mapFunction($output, $user_id);
    }
    $stmt->closeCursor();
    $this->fetchSeriesImages($this->db, $jsonOutput);
    if ($categoryId == 2) {
      $this->fetchIchibanSeriesTotalInfo($this->db, $jsonOutput);
      $this->fetchIchibanCharacterInfo($this->db, $jsonOutput);
    }
    $this->db = null;
    return json_encode(array_values($jsonOutput));
  }
  private function fetchSeriesImages($db, &$jsonOutput)
  {
    foreach ($jsonOutput as $series_id => &$item) {
      $sql = "SELECT * FROM vw_series_img WHERE series_id = :series_id";
      $stmt = $db->prepare($sql);
      $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt->execute();
      $img = [];
      while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $img[] = 'http://localhost/gachoraProject/public/images' . $output['series_img'];
      }
      $stmt->closeCursor();
      $item['img'] = $img;
    }
  }
  private function fetchIchibanCharacterInfo($db, &$jsonOutput)
  {
    foreach ($jsonOutput as $series_id => &$item) {
      $sql = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt = $db->prepare($sql);
      $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt->execute();
      $character = [];
      while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $character[] = [
          'prize' => $output['prize'],
          'name' => $output['name'],
          'remain' => $output['remain'],
          'total' => $output['amount']
        ];
      }
      $stmt->closeCursor();
      $item['character'] = $character;
    }
  }
  /**
   * 一番賞總數
   */
  private function fetchIchibanSeriesTotalInfo($db, &$jsonOutput)
  {
    foreach ($jsonOutput as $series_id => &$item) {
      $sql = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt = $db->prepare($sql);
      $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt->execute();
      $tmp = [];
      while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $tmp = [
          'remain' => $output['all_remain'],
          'total' => $output['all_amount']
        ];
      }
      $stmt->closeCursor();
      $item = [...$item, ...$tmp];
    }
  }
  /**
   * 印出資料
   */
  private function mapEggCard($output, $user_id)
  {
    return $this->mapCard($output, $user_id);
  }
  private function mapIchibanCard($output, $user_id)
  {
    return $this->mapCard($output, $user_id);
  }
  private function mapCard($output, $user_id)
  {
    $data = [
      'series_id' => $output['series_id'],
      'theme' => $output['theme'] ?? '',
      'title' => $output['series_title'] ?? '',
      'name' => $output['name'] ?? '',
      'price' => $output['price'] ?? '',
      'amount' => $output['amount'] ?? '',
      'rank' => $output['rank'] ?? '',
      'rare' => $output['rare'] ?? '',
      'release_time' => $output['release_time'] ?? '',
      'img' => [],
      'character' => []
    ];
    if ($user_id) $data['collected'] = $output['collected'] ?? '';
    return $data;
  }
  // ---------
  // 扭蛋主頁fetch
  // 精選
  // function EggBling()
  // {
  //   $this->db = new Connect;
  //   $jsonOutput = [];
  //   $sql1 = "select * from vw_blingEgg";
  //   $stmt1 = $this->db->prepare($sql1);
  //   $stmt1->execute();
  //   while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
  //     $series_id = $output1['series_id'];
  //     $sql2 = "select * from vw_series_img where series_id = :series_id";
  //     $stmt2 = $this->db->prepare($sql2);
  //     $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
  //     $stmt2->execute();
  //     $img = [];
  //     while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
  //       $img[] = $output2['series_img'];
  //     }
  //     $jsonOutput[] = [
  //       'series_id' => $output1['series_id'],
  //       'theme' => $output1['theme'],
  //       'title' => $output1['series_title'],
  //       'name' => $output1['name'],
  //       'price' => $output1['price'],
  //       'amount' => $output1['amount'],
  //       'img' => $img
  //     ];
  //   }
  //   $this->db = null;
  //   if ($jsonOutput == []) $jsonOutput = [];
  //   return json_encode($jsonOutput);
  // }
  // top 10 
  // function EggTop10()
  // {
  //   $this->db = new Connect;
  //   $jsonOutput = [];
  //   $sql1 = "select * from vw_hotEgg limit 10";
  //   $stmt1 = $this->db->prepare($sql1);
  //   $stmt1->execute();
  //   while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
  //     $series_id = $output1['series_id'];
  //     $sql2 = "select * from vw_series_img where series_id = :series_id";
  //     $stmt2 = $this->db->prepare($sql2);
  //     $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
  //     $stmt2->execute();
  //     $img = [];
  //     while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
  //       $img[] = $output2['series_img'];
  //     }
  //     $jsonOutput[] = [
  //       'series_id' => $output1['series_id'],
  //       'theme' => $output1['theme'],
  //       'title' => $output1['series_title'],
  //       'name' => $output1['name'],
  //       'price' => $output1['price'],
  //       'amount' => $output1['amount'],
  //       'img' => $img
  //     ];
  //   }
  //   $this->db = null;
  //   if ($jsonOutput == []) $jsonOutput = [];
  //   return json_encode($jsonOutput);
  // }

  // 扭蛋主頁post
  // function EggType($type, $page)
  // {
  //   $type = $_POST['type'];
  //   $this->db = new Connect;
  //   $jsonOutput = [];
  //   if (is_null($type)) {
  //     $sql1 = "select * from vw_allEgg limit :page, 24";
  //     $sql2 = "select count(*) from vw_allEgg";
  //   }
  //   if ($type == 'all') {
  //     $sql1 = "select * from vw_allEgg limit :page, 24";
  //     $sql2 = "select count(*) from vw_allEgg";
  //   }
  //   if ($type == 'hot') {
  //     $sql1 = "select * from vw_hotEgg limit :page, 24";
  //     $sql2 = "select count(*) from vw_hotEgg";
  //   }
  //   if ($type == 'rare') {
  //     $sql1 = "select * from vw_rareEgg limit :page, 24";
  //     $sql2 = "select count(*) from vw_rareEgg";
  //   }
  //   if ($type == 'new') {
  //     $sql1 = "select * from vw_newEgg limit :page, 24";
  //     $sql2 = "select count(*) from vw_newEgg";
  //   }
  //   $stmt1 = $this->db->prepare($sql1);
  //   $stmt2 = $this->db->prepare($sql2);
  //   $stmt1->bindValue(':page', ($page - 1) * 24, PDO::PARAM_STR);
  //   $stmt1->execute();
  //   $stmt2->execute();
  //   while ($output = $stmt1->fetch(PDO::FETCH_ASSOC)) {
  //     $series_id = $output['series_id'];
  //     $sql3 = "select * from vw_series_img where series_id = :series_id";
  //     $stmt3 = $this->db->prepare($sql3);
  //     $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
  //     $stmt3->execute();
  //     $img = [];
  //     while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
  //       $img[] = $output3['series_img'];
  //     }
  //     $jsonOutput['series'][] = [
  //       'series_id' => $output['series_id'],
  //       'theme' => $output['theme'],
  //       'title' => $output['series_title'],
  //       'name' => $output['name'],
  //       'price' => $output['price'],
  //       'amount' => $output['amount'],
  //       'img' => $img
  //     ];
  //   }
  //   while ($output = $stmt2->fetch(PDO::FETCH_ASSOC)) {
  //     $jsonOutput['pages'] = floor($output['count(*)'] / 24) + 1;
  //   }
  //   $this->db = null;
  //   if ($jsonOutput == []) $jsonOutput = [];
  //   return json_encode($jsonOutput);
  // }
  // 扭蛋分類fetch
  // 主題顯示
  // function Theme()
  // {
  //   $this->db = new Connect;
  //   $jsonOutput = [];
  //   $sql1 = "select Theme from vw_theme m left join Theme t on m.theme_id = t.id where category_id = 1 group by Theme";
  //   $stmt1 = $this->db->prepare($sql1);
  //   $stmt1->execute();
  //   while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
  //     $jsonOutput[] = $output1['Theme'];
  //   }
  //   $this->db = null;
  //   if ($jsonOutput == []) $jsonOutput = [];
  //   return json_encode($jsonOutput);
  // }
  // 扭蛋分類post
  // function ThemeSort($theme, $page)
  // {
  //   $theme = $_POST['theme'];
  //   $this->db = new Connect;
  //   $jsonOutput = [];
  //   $sql1 = "select * from vw_eggcard where theme = :theme limit :page, 24";
  //   $sql2 = "select count(*) from vw_eggcard";

  //   $stmt1 = $this->db->prepare($sql1);
  //   $stmt2 = $this->db->prepare($sql2);
  //   $stmt1->bindValue(':theme', $theme, PDO::PARAM_STR);
  //   $stmt1->bindValue(':page', ($page - 1) * 24, PDO::PARAM_STR);
  //   $stmt1->execute();
  //   $stmt2->execute();
  //   $jsonOutput['series'] = [];
  //   while ($output = $stmt1->fetch(PDO::FETCH_ASSOC)) {
  //     $series_id = $output['series_id'];
  //     $sql3 = "select * from vw_EggCardImg where series_id = :series_id";
  //     $stmt3 = $this->db->prepare($sql3);
  //     $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
  //     $stmt3->execute();
  //     $img = [];
  //     while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
  //       $img[] = $output3['series_img'];
  //     }
  //     $jsonOutput['series'][] = [
  //       'series_id' => $output['series_id'],
  //       'theme' => $output['theme'],
  //       'title' => $output['series_title'],
  //       'name' => $output['name'],
  //       'price' => $output['price'],
  //       'amount' => $output['amount'],
  //       'img' => $img
  //     ];
  //   }
  //   while ($output = $stmt2->fetch(PDO::FETCH_ASSOC)) {
  //     $jsonOutput['pages'] = floor($output['count(*)'] / 24) + 1;
  //   }
  //   $this->db = null;
  //   if ($jsonOutput == []) $jsonOutput = [];
  //   return json_encode($jsonOutput);
  // }

  // 扭蛋詳細post
  function EggDetail($series_id)
  {
    $series_id = $_POST['series_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "select * from vw_detail where series_id = :series_id";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->execute();
    $theme = '';
    while ($output1 = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $theme = $output1['theme'];
      $sql2 = "select * from vw_series_img where series_id = :series_id";
      $stmt2 = $this->db->prepare($sql2);
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

    $stmt1 = $this->db->prepare($sql1);
    $stmt2 = $this->db->prepare($sql2);
    $stmt1->bindValue(':theme', $theme, PDO::PARAM_STR);
    $stmt1->execute();
    $stmt2->execute();
    $jsonOutput['recommend'] = [];
    while ($output = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output['series_id'];
      $sql3 = "select * from vw_EggCardImg where series_id = :series_id";
      $stmt3 = $this->db->prepare($sql3);
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
    $stmt4 = $this->db->prepare($sql4);
    $stmt4->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt4->execute();
    while ($output4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['series'][0] += [
        'remain' => $output4['remain'],
        'total' => $output4['total']
      ];
    }
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }

  // 地址
  function City($input)
  {
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "SELECT * from City where id = $input";
    $stmt = $this->db->prepare($sql);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[$output['id']] = [
        'id' => $output['id'],
        'city' => $output['city']
      ];
    }
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  //一番賞首
  //精選
  function IchibanBling()
  {
    $this->db = new Connect;
    $jsonOutput = [];
    $sql1 = "select series_id, theme_id, theme, series_title, name, price from vw_ichiban order by release_time";
    $stmt1 = $this->db->prepare($sql1);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $this->db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $this->db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $array2 = [
          'remain' => $output3['all_remain'],
          'total' => $output3['all_amount']
        ];
      }
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $this->db->prepare($sql4);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 賞主頁post
  function IchibanType($type, $page)
  {
    $type = $_POST['type'];
    $this->db = new Connect;
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
    $stmt1 = $this->db->prepare($sql1);
    $stmt1->bindValue(':page', ($page - 1) * 24, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $this->db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $this->db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $array2 = [
          'remain' => $output3['all_remain'],
          'total' => $output3['all_amount']
        ];
      }
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $this->db->prepare($sql4);
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
      $stmt2 = $this->db->prepare($sql2);
      $stmt2->execute();
      while ($output = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $jsonOutput['pages'] = floor($output['count(*)'] / 24) + 1;
      }
    }
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 賞分類post
  function IchibanThemeSort($theme, $page)
  {
    $theme = $_POST['theme'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql1 = "select * from vw_Ichiban where theme = :theme limit :page, 24";
    $stmt1 = $this->db->prepare($sql1);
    $stmt1->bindValue(':theme', $theme, PDO::PARAM_STR);
    $stmt1->bindValue(':page', ($page - 1) * 24, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $this->db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $this->db->prepare($sql3);
      $stmt3->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt3->execute();
      while ($output3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
        $array2 = [
          'remain' => $output3['all_remain'],
          'total' => $output3['all_amount']
        ];
      }
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $this->db->prepare($sql4);
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
      $stmt2 = $this->db->prepare($sql2);
      $stmt2->execute();
      while ($output = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $jsonOutput['pages'] = floor($output['count(*)'] / 24) + 1;
      }
    }
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 一番賞種類
  function IchibanTheme()
  {
    $this->db = new Connect;
    $jsonOutput = [];
    $sql1 = "select Theme from vw_theme m left join Theme t on m.theme_id = t.id where category_id = 2 group by Theme";
    $stmt1 = $this->db->prepare($sql1);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = $output1['Theme'];
    }
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  // 賞詳細post
  function IchibanDetail($series_id)
  {
    $series_id = $_POST['series_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $theme = '';
    $sql1 = "select series_id, theme_id, theme, series_title, name, price from vw_ichiban where series_id = :series_id";
    $stmt1 = $this->db->prepare($sql1);
    $stmt1->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $this->db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      // 數量
      $sql3 = "select all_remain, all_amount from vw_IchibanRemainTotal where series_id = :series_id";
      $stmt3 = $this->db->prepare($sql3);
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
      $stmt4 = $this->db->prepare($sql4);
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
      $stmt5 = $this->db->prepare($sql5);
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
    $stmt1 = $this->db->prepare($sql1);
    $stmt1->bindValue(':theme', $theme, PDO::PARAM_STR);
    $stmt1->execute();
    while ($output1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
      $series_id = $output1['series_id'];
      $sql2 = "select * from vw_IchibanImg where series_id = :series_id";
      $stmt2 = $this->db->prepare($sql2);
      $stmt2->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt2->execute();
      $img = [];
      while ($output2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        $img[] = $output2['series_img'];
      }
      $sql4 = "select prize, name, remain, amount from vw_RemainTotal where series_id = :series_id";
      $stmt4 = $this->db->prepare($sql4);
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
      $stmt3 = $this->db->prepare($sql3);
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
      $stmt = $this->db->prepare($sql);
      $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
      $stmt->execute();
      while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $jsonOutput['label'][] = $output['label'];
      }
    }
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function User($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetUserNameById(:user_id);";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['name'] = $output['name'];
    }
    $stmt->closeCursor();
    $sql = "call GetPastAYearGashById(:user_id);";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['gash_level'] = $output['gash'];
    }
    $stmt->closeCursor();
    $sql = "call GetGashNowById(:user_id);";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['gash'] = $output['gash'];
    }
    $stmt->closeCursor();
    $sql = "call GetGiftExpireDateById(:user_id);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Wall($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetRecordsByIdAndCategory(:user_id, 1);";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['egg'][] = [
        'img' => $output['img']
      ];
    }
    $stmt->closeCursor();
    $sql = "call GetRecordsByIdAndCategory(:user_id, 2);";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['ichiban'][] = [
        'img' => $output['img']
      ];
    }
    $stmt->closeCursor();
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [''];
    return json_encode($jsonOutput);
  }
  function CollectionEgg($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetCollectionHasByIdAndCategory(:user_id, 1);";
    $stmt = $this->db->prepare($sql);
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
      $stmt1 = $this->db->prepare($sql1);
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
    $stmt = $this->db->prepare($sql);
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
      $stmt1 = $this->db->prepare($sql1);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function CollectionIchiban($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetCollectionHasByIdAndCategory(:user_id, 2);";
    $stmt = $this->db->prepare($sql);
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
      $stmt1 = $this->db->prepare($sql1);
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
    $stmt = $this->db->prepare($sql);
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
      $stmt1 = $this->db->prepare($sql1);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Wallet($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetUserWalletRecordbyId(:user_id);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Bag($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetBagCartByIdAndStatus(:user_id, 4);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Cart($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetBagCartByIdAndStatus(:user_id, 5);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Logistics($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetAllLogisticsById(:user_id);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function Userinfo($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetUserinfoById(:user_id);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function LogisticsDetail($list_id)
  {
    $list_id = $_POST['list_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetLogisticsDetailById(:list_id);";
    $stmt = $this->db->prepare($sql);
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
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput['products'][] = [
        'name' => $output['character_name'],
        'amount' => $output['amount']
      ];
    }
    $stmt->closeCursor();
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function ToCollection($user_id, $series_id)
  {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call UpdateCollectionByUserSeries(:user_id, :series_id);";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput = $output;
    }
    $stmt->closeCursor();
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function AddToProductReminder($user_id, $series_id)
  {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call AlterCollectionStatusByUserSeriesStatus(:user_id, :series_id, 11);";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput = $output;
    }
    $stmt->closeCursor();
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function AllGash()
  {
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "SELECT id, gash, dollar FROM Gash WHERE 1;";
    $stmt = $this->db->prepare($sql);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = [
        'id' => $output['id'],
        'gash' => $output['gash'],
        'dollar' => $output['dollar']
      ];
    }
    $stmt->closeCursor();
    $this->db = null;
    // if ($jsonOutput === null) $jsonOutput = ['error' => 'No results found, please try again'];
    return json_encode($jsonOutput);
  }
  function PlayEgg($user_id, $series_id, $amounts, $time)
  {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $amounts = $_POST['amounts'];
    $time = isset($_POST['time']) ? $_POST['time'] : time();
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call PlayEgg(:user_id, :series_id, :amounts, :time);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = ['' => ''];
    return json_encode($jsonOutput);
  }
  function TopUpGash($user_id, $gash_id, $time)
  {
    $user_id = $_POST['user_id'];
    $gash_id = $_POST['gash_id'];
    $time = isset($_POST['time']) ? $_POST['time'] : time();
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call TopUpGash(:user_id, :time, :gash_id);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [''];
    return json_encode($jsonOutput);
  }
  function LineIn($series_id, $user_id)
  {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call LineUp(:series_id, :user_id);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = ['' => ''];
    return json_encode($jsonOutput);
  }
  function SeeWaitTime($series_id, $number)
  {
    $series_id = $_POST['series_id'];
    $number = $_POST['number'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call SeeWaitTime(:series_id, :number);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = ['' => ''];
    return json_encode($jsonOutput);
  }
  function DeleteWait()
  {
    $series_id = $_POST['series_id'];
    $number = $_POST['number'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call DeleteWaiting(:series_id, :number);";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
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
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call PlayIchiban(:series_id, :number, :amounts, :label, :time)";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    if ($jsonOutput == []) $jsonOutput = [];
    return json_encode($jsonOutput);
  }
  function GetLabels($series_id)
  {
    $series_id = $_POST['series_id'];
    $this->db = new Connect;
    $tmp = [];
    $sql = "call GetLabelById(:series_id)";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':series_id', $series_id, PDO::PARAM_INT);
    $stmt->execute();
    while ($output = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $jsonOutput[] = $output['label'];
    }
    $stmt->closeCursor();
    $this->db = null;
    return $jsonOutput;
  }
  function MyTimer($user_id)
  {
    $user_id = $_POST['user_id'];
    $this->db = new Connect;
    $jsonOutput = [];
    $sql = "call GetWaitTimeById(:user_id)";
    $stmt = $this->db->prepare($sql);
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
    $this->db = null;
    $jsonOutput == [] ? $jsonOutput = ['waiting' => ''] : $jsonOutput;
    return json_encode($jsonOutput);
  }
  private function changeStatus($record_id, $status)
  {
    $jsonOutput = [];
    $sql = "CALL ChangeStatusByIdAndStatus(:record_id, :status)";
    $stmt = $this->db->prepare($sql);
    $stmt->bindValue(':record_id', $record_id, PDO::PARAM_INT);
    $stmt->bindValue(':status', $status, PDO::PARAM_INT);
    $stmt->execute();
    switch ($status) {
      case 3:
        $jsonOutput = ['error' => 'to G done'];
        break;
      case 4:
        $jsonOutput = ['error' => 'to bag done'];
        break;
      case 5:
        $jsonOutput = ['error' => 'to cart done'];
        break;
      default:
        $jsonOutput = ['error' => 'invalid status'];
        break;
    }
    $stmt->closeCursor();
    $this->db = null;
    return json_encode($jsonOutput);
  }
  function ToG($record_id)
  {
    // $record_id = $_POST['record_id'];
    return $this->changeStatus($record_id, 3);
  }

  function ToCart($record_id)
  {
    // $record_id = $_POST['record_id'];
    return $this->changeStatus($record_id, 5);
  }

  function ToBag($record_id)
  {
    // $record_id = $_POST['record_id'];
    return $this->changeStatus($record_id, 4);
  }
}
