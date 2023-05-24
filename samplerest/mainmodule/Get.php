<?php

class Get
{

    protected $pdo;
    protected $gm;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

    // create your own get functions!!!

    public function get_common($table, $condition = null)
    {
        $sql = "SELECT * FROM $table";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved from $table", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieve user account details", $res['code']);
    }

    public function addCat($received_data)
    {
        // $received_data->password = $this->encrypt_password($received_data->password);
        $res = $this->gm->insert("user_cats", $received_data);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload(null, 'success', 'successfully inserted data', $res['code']);
        }
        return $this->gm->returnPayload(null, 'failed', 'failed to insert data', $res['code']);
    }

    public function getUserCats($condition = null)
    {
        // $user_id = $received_data->id;

        $sql = "SELECT user_cats.*, users.username
        FROM user_cats 
        JOIN users ON user_cats.user_id = users.id
       ";

            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function getUserCatwithBreed($condition = null)
    {
        $sql = "SELECT user_cats.*, breeds.breed_name, breeds.breed_photo, breeds.breed_temperament, breeds.breed_hypo, breeds.breed_shed, breeds.breed_grooming, breeds.breed_friendly
        FROM user_cats
        JOIN users ON user_cats.user_id = users.id
        JOIN breeds ON user_cats.cat_breed = breeds.breed_name";

        if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }


        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function getAllGamesShortcut()
    {
        $sql = "SELECT * FROM games
                ORDER BY RAND () 
                limit 4";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }
    
    public function getAllBreedsShortcut()
    {
        $sql = "SELECT * FROM breeds
                ORDER BY RAND () 
                limit 4";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function itemSelection($table, $condition)
    {
        $sql = "SELECT * FROM pos_dish";

        if ($condition != null) {
            $sql .= " WHERE ${condition}";
        }

        $res = $this->gm->executeQuery($sql);

        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved from $table", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieve data", $res['code']);
    }

    // public function createOrderForCashPayment($data)
    // {
    //     $employee_id = $data->employee_id;
    //     $payment_mode = $data->payment_mode;

    //     $sql = "INSERT INTO pos_orders (`employee_id`, `payment_mode`, `status`, `is_paid`)
    //     VALUES ($employee_id, '$payment_mode', 'Pending', 'No')";

    //     try {
    //         $sql = $this->pdo->prepare($sql);
    //         $sql->execute();

    //         $sql = "SELECT MAX(id) AS id from pos_orders";
    //         $stmt = $this->pdo->prepare($sql);
    //         $stmt->execute();
    //         $res = $stmt->fetchAll()[0];
    //         $order_id = $res['id'];

    //         $profile = array(
    //             "order_id" => $order_id
    //         );

    //         return $this->gm->returnPayload($profile, 'success', 'successfully inserted data', 200);
    //     } catch (Exception $e) {
    //         $errmsg = $e->getMessage();
    //         $code = 403;
    //     }
    //     return array("code" => $code, "errmsg" => $errmsg);
    // }

    public function receipt()
    {
        $sql = "SELECT MAX(pos_orders.id) AS id, ems_employees.fullname, pos_orders.created_at
        from pos_orders
        JOIN ems_employees ON pos_orders.employee_id = ems_employees.id";
        // $sql = "SELECT MAX(pos_orders.id) AS id, cdm_guest.first_name, cms_rooms.room_number, cdm_guest.last_name, ems_employees.fullname, pos_orders.created_at
        // from pos_orders
        // JOIN ems_employees ON pos_orders.employee_id = ems_employees.id
        // JOIN reservation_appointments ON pos_orders.invoice_id = reservation_appointments.invoice_id
        // JOIN cdm_guest ON reservation_appointments.guest_id = cdm_guest.id
        // JOIN cms_rooms ON reservation_appointments.room_id = cms_rooms.id";
        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }
    public function chargedReceipt()
    {
        // $sql = "SELECT MAX(pos_orders.id) AS id, ems_employees.fullname, pos_orders.created_at
        // from pos_orders
        // JOIN ems_employees ON pos_orders.employee_id = ems_employees.id";
        // $sql = "SELECT MAX(pos_orders.id) AS id, cdm_guest.first_name, cms_rooms.room_number, cdm_guest.last_name, ems_employees.fullname, pos_orders.created_at
        // from pos_orders
        // JOIN ems_employees ON pos_orders.employee_id = ems_employees.id
        // JOIN reservation_appointments ON billing_invoice.id = reservation_appointments.invoice_id
        // -- JOIN billing_invoice ON billing_invoice.id = pos_orders.invoice_id
        // JOIN cdm_guest ON reservation_appointments.guest_id = cdm_guest.id
        // JOIN cms_rooms ON reservation_appointments.room_id = cms_rooms.id";
        $sql = "SELECT id, employee_id, invoice_id FROM pos_orders
        ORDER BY id DESC LIMIT 1";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll()[0];
        $invoice_id = $res['invoice_id'];
        $employee_id = $res['employee_id'];
        $sql = "SELECT reservation_appointments.id, pos_orders.id as order_id, cdm_guest.first_name, cms_rooms.room_number, cdm_guest.last_name,
        (SELECT fullname from ems_employees WHERE id = $employee_id) as fullname, pos_orders.created_at
        FROM reservation_appointments
        JOIN cdm_guest ON reservation_appointments.guest_id = cdm_guest.id
        JOIN cms_rooms ON reservation_appointments.room_id = cms_rooms.id
        JOIN pos_orders ON reservation_appointments.invoice_id = pos_orders.invoice_id
        WHERE reservation_appointments.invoice_id = $invoice_id
        ORDER BY pos_orders.created_at DESC LIMIT 1
        ";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function orderbreakdownTakeOutPaid($received_data)
    {
        $order_id = $received_data->order_id;

        $sql = "SELECT pos_cart.*, pos_dish.name
        FROM pos_cart 
        JOIN pos_dish ON pos_dish.id = pos_cart.dish_id
        WHERE pos_cart.order_id = '$order_id'";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }
    // public function getAllTransactions($table, $condition = null){
    //     $sql = "SELECT order_id, name, price, item_quantity, item_quantity * price  as item_total
    //     FROM pos_cart INNER JOIN pos_dish ON pos_cart.dish_id = pos_dish.id";

    //     if ($condition != null) {
    //         $sql .= " WHERE {$condition}";
    //     }
    //     // var_dump($sql);

    //     // $sql .= "INNER JOIN items_tbl ON transactions_tbl.id = items_tbl.id";

    //     $res = $this->gm->executeQuery($sql);

    //     if($res['code'] == 200){
    //         return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved from $table", $res['code']);
    //     }

    //     return $this->gm->returnPayload(null, "failed", "failed to retrieve data", $res['code']);
    // }

    public function getReceiptDetails($table, $condition = null)
    {
        $sql = "SELECT $table.*, pos_orders.id, pos_dish.name, pos_dish.price
        FROM $table
        JOIN pos_orders ON pos_cart.order_id = pos_orders.id
        JOIN pos_dish ON pos_cart.dish_id = pos_dish.id";

        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }
    public function getTableDetails($condition = null)
    {
        $sql = "SELECT pos_cart.*, pos_orders.table_id, pos_dish.name, pos_dish.price, pos_orders.table_id
        FROM pos_cart
        JOIN pos_orders ON pos_cart.order_id = pos_orders.id
        JOIN pos_dish ON pos_cart.dish_id = pos_dish.id";

        // WHERE pos_orders.status = 'Pending' AND pos_orders.table_id = 1";



        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getguestInfo($table, $condition = null)
    {
        $sql = "SELECT reservation_appointments.invoice_id, cdm_guest.first_name, cdm_guest.last_name, cms_rooms.room_number
        FROM reservation_appointments
        JOIN cdm_guest ON reservation_appointments.guest_id = cdm_guest.id
        JOIN cms_rooms ON reservation_appointments.room_id = cms_rooms.id
        WHERE reservation_appointments.status='CHECKED-IN'";


        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }
}