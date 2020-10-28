<?php


//$recepient = "bohdan@bmby.com";
//$sitename = "http://dreams_calc.res-ua.com/";
//
//
$body = trim($_POST["html"]);
// $message_array = json_decode($body, true);
$data = json_decode($body, true);
//var_dump($data, $data['Visualization'], $_POST); exit();
$recepient = $data['Email'];

$message = "<div>
  <div>
    <h1>Project name: " . $data['projectName']. "</h2>
    <br/>
    <p>Total: <b>" . $data['Total']['costs']. "</b></p>
    <p><i>" . $data['Total']['month']. " months (" . $data['Total']['days']. " work days)</i></p>
  </div>
  <hr>
  <div>Platforms: " . $data['Platforms']. "</div>
  <div>Buildings total: " . $data['Buildings total']. "</div>
  <div>Unique buildings: " . $data['Unique buildings']. "</div>
  <div>Unique apartments: " . $data['Unique apartments']. "</div>
  <div>Facade complexity: " . $data['Facade complexity']. "</div>
  <div>360 apt tours: " . $data['360 apt tours']. "</div>
  <div>360 amenities tours: " . $data['360 amenities tours']. "</div>
  <div>Environment complexity: " . $data['Environment complexity']. "</div>
  <hr>
  <div><b>Visualization</b></div>
  <table >
    <tr>
      <td> </td>
      <td>Days:</td>
      <td>Costs:</td>
    </tr> 
    <tr>
      <td>360 apt tours</td>
      <td><i> " . $data['Visualization']['days']['360 apt. tours']. "</i></td>
        <td><b> " . $data['Visualization']['costs']['360 apt. tours']. "</b></td>
    </tr>
    <tr>
      <td>360 amenities tours</td>
      <td><i>" . $data['Visualization']['days']['360 amenities tours']. "</i></td>
      <td><b>" . $data['Visualization']['costs']['360 amenities tours']. "</b></td>
    </tr>
     <tr>
      <td>vantage panoramas</td>
      <td><i>" . $data['Visualization']['days']['vantage panoramas']. "</i></td>
      <td><b>" . $data['Visualization']['costs']['vantage panoramas']. "</b></td>
    </tr>
    <tr bgcolor=#e6e6e6>
      <td> </td>
      <td><i>" . $data['Visualization']['days']['total visualisation']. "</i></td>
      <td><b>" . $data['Visualization']['costs']['total visualisation']. "</b></td>
    </tr>
</table>
  <br>
  
  <div><b>Modeling</b></div>
  
    <table >
    <tr>
      <td> </td>
      <td>Days:</td>
      <td>Costs:</td>
    </tr> 
    <tr>
      <td>2d-plan</td>
      <td><i> " . $data['Modeling']['days']['2d-plan']. "</i></td>
        <td><b> " . $data['Modeling']['costs']['2d-plan']. "</b></td>
    </tr>
    <tr>
      <td>3d-plan</td>
      <td><i>" . $data['Modeling']['days']['3d-plan']. "</i></td>
      <td><b>" . $data['Modeling']['costs']['3d-plan']. "</b></td>
    </tr>
     <tr>
      <td>buildings</td>
      <td><i>" . $data['Modeling']['days']['buildings']. "</i></td>
      <td><b>" . $data['Modeling']['costs']['buildings']. "</b></td>
    </tr>
     <tr>
      <td>environment</td>
      <td><i>" . $data['Modeling']['days']['environment']. "</i></td>
      <td><b>" . $data['Modeling']['costs']['environment']. "</b></td>
    </tr>
    <tr bgcolor=#e6e6e6>
      <td> </td>
      <td><i>" . $data['Modeling']['days']['total modeling']. "</i></td>
      <td><b>" . $data['Modeling']['costs']['total modeling']. "</b></td>
    </tr>
</table>
  
  <br>
  <div><b>Development</b></div>
    <table >
    <tr>
      <td> </td>
      <td>Days:</td>
      <td>Costs:</td>
    </tr> 
    <tr>
      <td>initial</td>
      <td><i> " . $data['Development']['days']['initial']. "</i></td>
        <td><b> " . $data['Development']['costs']['initial']. "</b></td>
    </tr>
    <tr>
      <td>internal testing</td>
      <td><i>" . $data['Development']['days']['internal testing']. "</i></td>
      <td><b>" . $data['Development']['costs']['internal testing']. "</b></td>
    </tr>
     <tr>
      <td>acceptance testing</td>
      <td><i>" . $data['Development']['days']['acceptance testing']. "</i></td>
      <td><b>" . $data['Development']['costs']['acceptance testing']. "</b></td>
    </tr>
    <tr bgcolor=#e6e6e6>
      <td> </td>
      <td><i>" . $data['Development']['days']['total development']. "</i></td>
      <td><b>" . $data['Development']['costs']['total development']. "</b></td>
    </tr>
</table>
</div>";











//$message = trim($_POST["html"]);

// var_dump("STOP', $message, $_POST); exit();
//$pagetitle = "Новая заявка с сайта \"$sitename\"";
//mail('<zvolinskaya92@gmail.com>', $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

//$to = 'zvolinskaya92@gmail.com';
//$subject = 'the subject';
//$message = trim($_POST["body"]);
//$headers = 'From: zvolinskaya92@gmail.com' . "\r\n" .
//    'Reply-To: zvolinskaya92@gmail.com' . "\r\n" .
//    'X-Mailer: PHP/' . phpversion();
//$headers = implode("\r\n", $headers);
//
//mail($to, $subject, $message, $headers);


$to = 'zvolinskaya92@gmail.com';

$subject = 'Dreams Calculator Report';

//$headers = "From: " . strip_tags($_POST['req-email']) . "\r\n";
$headers = "Reply-To: " . $recepient . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$mail = null;
$mail = mail($recepient, $subject, $message, $headers);
if ($mail) {
    echo 'сообщение отправлено';
}
