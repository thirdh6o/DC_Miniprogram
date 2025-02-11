<?php
// 设置上传目录
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);

// 检查上传的文件是否是图片
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if ($check === false) {
        echo json_encode(["error" => "文件不是图片。"]);
        exit;
    }
}

// 尝试移动上传的文件
if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    // 调用 Python 脚本处理图像
    $output_path = "processed/" . basename($_FILES["file"]["name"]);
    $info_dir = "info/";

    // 确保 info 目录存在
    if (!file_exists($info_dir)) {
        mkdir($info_dir, 0777, true);
    }

    // 调用 Python 脚本
    $command = escapeshellcmd("python3 process_image.py $target_file $output_path $info_dir");
    $output = shell_exec($command);

    // 检查处理结果
    if (strpos($output, '图像处理成功') !== false) {
        echo json_encode(["message" => "文件上传成功", "file_path" => $output_path]);
    } else {
        echo json_encode(["error" => "图像处理失败: " . $output]);
    }
} else {
    echo json_encode(["error" => "上传文件失败。"]);
}
?> 