<?php

function getData(){
    $connect = mysqli_connect("localhost","root","root","FarmShare_db");
    $query = "SELECT * FROM tbl_posts";
    $result = mysqli_query($connect,$query);
    $posts_data = array();
    while($row = mysqli_fetch_array($result)){
        $posts_data[] = array(
            'title' => $row["title"],
            'quantity' => $row["quantity"],
            'instructions' => $row["instructions"],
            'date' => $row["date"],
            'address' => $row["address"],
            'city' => $row["city"],
            'state' => $row["state"]
        );
    }

    return json_encode($posts_data);
}

// echo '<pre>';
// print_r(getData());
// echo'</pre>';

$file_name = date('d-m-Y').'.json';
if(file_put_contents($file_name, getData())){
echo $file_name.'file created';
}
else
{
    echo 'There is some error';
}

?>