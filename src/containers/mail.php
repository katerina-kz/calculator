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

$message = "<div style='display: block'>
                <div>
                    <div>
                        <div style='margin: 10px 0'>Visualization</div>
                    </div>  
                    <div style='display: flex; justify-content: space-between;'>
                        <div style='border: 1px solid black; width: 48%; padding: 5px'> 
                          <b>Days:</b>
                           <div>360 apt. tours: " . $data['Visualization']['days']['360 apt. tours']. "</div>
                           <div>360 amenities tours: " . $data['Visualization']['days']['360 amenities tours']. "</div>
                           <div>vantage panoramas: " . $data['Visualization']['days']['vantage panoramas']. "</div>
                        </div>
                        <div style='border: 1px solid black; width: 48%; padding: 5px'> 
                          <b>Costs:</b>
                           <div>360 apt. tours: " . $data['Visualization']['costs']['360 apt. tours']. "</div>
                           <div>360 amenities tours: " . $data['Visualization']['costs']['360 amenities tours']. "</div>
                           <div>vantage panoramas: " . $data['Visualization']['costs']['vantage panoramas']. "</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div >
                        <div style='margin: 10px 0'>Modeling</div>
                    </div>
                    <div style='display: flex; justify-content: space-between;'>
                        <div style='border: 1px solid black; width: 48%; padding: 5px;'> 
                          <b>Days:</B>
                           <div>2d-plan: " . $data['Modeling']['days']['2d-plan']. "</div>
                           <div>3d-plan: " . $data['Modeling']['days']['3d-plan']. "</div>
                           <div>buildings: " . $data['Modeling']['days']['buildings']. "</div>
                           <div>environment: " . $data['Modeling']['days']['environment']. "</div>
                        </div>
                        <div style='border: 1px solid black; width: 48%; padding: 5px'> 
                        <b>Costs:</b>
                           <div>2d-plan: " . $data['Modeling']['costs']['2d-plan']. "</div>
                           <div>3d-plan: " . $data['Modeling']['costs']['3d-plan']. "</div>
                           <div>buildings: " . $data['Modeling']['costs']['buildings']. "</div>
                           <div>environment: " . $data['Modeling']['costs']['environment']. "</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div style='margin: 10px 0'>Development</div>
                    </div>
                    <div style='display: flex; justify-content: space-between;'>
                        <div style='border: 1px solid black; width: 48%; padding: 5px'> 
                          <b>Days:</b>
                           <div>initial: " . $data['Development']['days']['initial']. "</div>
                           <div>internal testing: " . $data['Development']['days']['internal testing']. "</div>
                           <div>acceptance testing: " . $data['Development']['days']['acceptance testing']. "</div>
                           <div>environment: " . $data['Development']['days']['environment']. "</div>
                        </div>
                        <div style='border: 1px solid black; width: 48%; padding: 5px'> 
                          <b>Costs:</b>
                           <div>initial: " . $data['Development']['costs']['initial']. "</div>
                           <div>internal testing: " . $data['Development']['costs']['internal testing']. "</div>
                           <div>acceptance testing: " . $data['Development']['costs']['acceptance testing']. "</div>
                           <div>environment: " . $data['Development']['costs']['environment']. "</div>
                        </div>
                    </div>
                </div>
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
