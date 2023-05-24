<?php
require_once "./config/Connection.php";
require_once "./mainmodule/Get.php";
require_once "./mainmodule/Auth.php";
require_once "./mainmodule/Global.php";

$db = new Connection();
$pdo = $db->connect();
$global = new GlobalMethods($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if (isset($_REQUEST['request'])) {
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
} else {
    $req = array("errorcatcher");
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch ($req[0]) {

            case 'login':
                echo json_encode($auth->login($data));
                break;

            // case 'getguestInfo':
            //     echo json_encode($get->getguestInfo("reservation_appointments"));
            //     break;

            case 'register':
                echo json_encode($auth->register($data));
                break;

            case 'addCat':
                echo json_encode($get->addCat($data));
                break;

            case 'update':
                echo json_encode($global->update($data));
                break;

            case 'deleteCat':
                echo json_encode($global->delete('user_cats',"id = '$req[1]'"));
                break;
            
            case 'updateCat':
                echo json_encode($global->update('user_cats', $data));
                break;

            case 'updateProfile':
                echo json_encode($global->update('users', $data));
                break;

            case 'getReceiptDetails':
                echo json_encode($get->getReceiptDetails('pos_cart', "order_id = '$req[1]'"));
                break;

            case 'getTableDetails':
                echo json_encode($get->getTableDetails("pos_orders.status = 'Pending' AND pos_orders.table_id = '$req[1]'"));
                break;


            case 'update_item':
                echo json_encode($global->update_item("pos_orders", $data, NULL));
                break;

            case 'update_paid':
                echo json_encode($global->update_paid("pos_orders", $data, NULL));
                break;


            default:
                echo "request not found";
                break;
        }
        break;
    case 'GET':
        switch ($req[0]) {

            case 'getUserInfo':
                echo json_encode($get->get_common('users', "id = '$req[1]'"));
                break;
            
            case 'getUserCats':
                echo json_encode($get->getUserCats("user_cats.user_id = '$req[1]'"));
                break;        

            case 'getAllBreeds':
                echo json_encode($get->get_common('breeds'));
                break;

            case 'getUserCatwithBreed':
                echo json_encode($get->getUserCatwithBreed("user_cats.user_id = '$req[1]'"));
                break;

            case 'getAllArticles':
                echo json_encode($get->get_common('articles'));
                break;
            
            case 'getAllExercises':
                echo json_encode($get->get_common('exercises'));
                break;

            case 'getAllGames':
                echo json_encode($get->get_common('games'));
                break; 

            case 'getAllGamesShortcut':
                echo json_encode($get->getAllGamesShortcut());
                break;

            case 'getAllBreedsShortcut':
                echo json_encode($get->getAllBreedsShortcut());
                break;    
                

            // case 'getAllActiveTransactions':
            //     echo json_encode($get->get_common('pos_orders', "status = 'Pending' "));
            //     break;

            // case 'getCancelledOrders':
            //     echo json_encode($get->get_common('pos_orders', "status = 'Cancelled' "));
            //     break;

            // case 'getOrderHistory':
            //     echo json_encode($get->get_common('pos_orders', "status = 'Completed' AND is_paid = 'Yes' "));
            //     break;

            // case 'getPendingPayment':
            //     echo json_encode($get->get_common('pos_orders', "status = 'Completed' AND is_paid = 'No'"));
            //     break;



            default:
                echo "request not found";
                break;
        }
        break;
    default:
        echo "failed request";
        break;
}
